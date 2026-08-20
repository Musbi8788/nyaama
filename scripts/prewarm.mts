/**
 * Fills explanation_cache with every lesson translation ahead of a demo.
 *
 *   npm run prewarm              # the demo path only
 *   npm run prewarm -- --all     # every path
 *   npm run prewarm -- --status  # report coverage, translate nothing
 *
 * Why this exists: on demo day the network is a conference hotspot and
 * OpenAI is somebody else's uptime. A cached translation is a database
 * read. Run this the night before and "Explain in Wolof" is instant and
 * cannot fail.
 *
 * It is idempotent — rows already present are skipped — so it is safe to
 * re-run right before walking on stage.
 */
import { readFileSync } from "node:fs";
import { LANGUAGE_OPTIONS } from "../lib/data/languages.js";
import { translateBody } from "../lib/ai/translate.js";
import type { LearningModule } from "../lib/types/database.js";

const DEMO_PATH = "software_engineering";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
);
process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;

const URL_ = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const args = process.argv.slice(2);
const everyPath = args.includes("--all");
const statusOnly = args.includes("--status");

/**
 * Both the lessons and the cache are behind RLS — anon reads of
 * learning_modules come back as an empty array, not an error — so
 * everything here needs a real session.
 *
 * Set PREWARM_EMAIL and PREWARM_PASSWORD in .env.local to reuse one
 * account. Without them the script signs up a throwaway, which works but
 * leaves a row in auth.users behind every run.
 *
 * Deliberately not a service-role key: this only ever needs the rights a
 * signed-in learner already has.
 */
async function session(): Promise<string> {
  const auth = async (path: string, body: unknown) => {
    const response = await fetch(`${URL_}/auth/v1/${path}`, {
      method: "POST",
      headers: { apikey: KEY, "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    return response.json();
  };

  if (env.PREWARM_EMAIL && env.PREWARM_PASSWORD) {
    const credentials = {
      email: env.PREWARM_EMAIL,
      password: env.PREWARM_PASSWORD,
    };
    const signedIn = await auth("token?grant_type=password", credentials);
    if (signedIn.access_token) return signedIn.access_token;

    const signedUp = await auth("signup", {
      ...credentials,
      data: { name: "Prewarm" },
    });
    if (signedUp.access_token) return signedUp.access_token;
    throw new Error(
      `PREWARM_EMAIL/PREWARM_PASSWORD did not work: ${signedIn.error_description ?? signedIn.msg ?? ""}`,
    );
  }

  console.log(
    "note: PREWARM_EMAIL/PREWARM_PASSWORD not set — using a throwaway account,\n" +
      "      which leaves one row in auth.users. Set them to reuse one account.\n",
  );
  const json = await auth("signup", {
    email: `nyaama.prewarm.${Date.now()}@gmail.com`,
    password: `pw-${Math.random().toString(36).slice(2)}-${Date.now()}`,
    data: { name: "Prewarm" },
  });
  if (!json.access_token) {
    throw new Error(`could not obtain a session: ${JSON.stringify(json)}`);
  }
  return json.access_token;
}

const rest = (path: string, token?: string, init: RequestInit = {}) =>
  fetch(`${URL_}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: KEY,
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...(init.headers ?? {}),
    },
  });

const translations = LANGUAGE_OPTIONS.filter((o) => o.mode === "translate");

const token = await session();

const filter = everyPath ? "" : `&path_id=eq.${DEMO_PATH}`;
const modules = (await (
  await rest(`learning_modules?select=*${filter}&order=path_id,stage,sort`, token)
).json()) as LearningModule[];

if (!Array.isArray(modules) || modules.length === 0) {
  console.log("No lessons came back. Has the seed been applied?");
  process.exit(1);
}

const existing = (await (
  await rest("explanation_cache?select=module_id,lang", token)
).json()) as { module_id: string; lang: string }[];
const have = new Set(existing.map((r) => `${r.module_id}:${r.lang}`));

const wanted = modules.flatMap((m) => translations.map((o) => ({ module: m, option: o })));
const missing = wanted.filter((w) => !have.has(`${w.module.id}:${w.option.lang}`));

console.log(
  `${modules.length} lesson${modules.length === 1 ? "" : "s"} × ${translations.length} languages = ${wanted.length} translations`,
);
console.log(`  cached:  ${wanted.length - missing.length}`);
console.log(`  missing: ${missing.length}\n`);

if (statusOnly || missing.length === 0) {
  if (missing.length > 0) {
    for (const { module, option } of missing) {
      console.log(`  missing  ${module.id.padEnd(24)} ${option.label}`);
    }
  } else {
    console.log("Everything is cached. Nothing to do.");
  }
  process.exit(0);
}

let written = 0;
let failed = 0;

for (const [i, { module, option }] of missing.entries()) {
  const label = `[${i + 1}/${missing.length}] ${module.id} -> ${option.language}`;
  const started = Date.now();

  const content = await translateBody(module, option);
  if (!content) {
    failed++;
    console.log(`  FAIL  ${label} (model returned nothing)`);
    continue;
  }

  const response = await rest("explanation_cache", token, {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates" },
    body: JSON.stringify({
      module_id: module.id,
      mode: option.mode,
      lang: option.lang,
      content,
    }),
  });

  if (!response.ok) {
    failed++;
    console.log(`  FAIL  ${label} (cache write ${response.status}: ${await response.text()})`);
    continue;
  }

  written++;
  console.log(
    `  ok    ${label}  ${Date.now() - started}ms, ${content.length} chars`,
  );
}

console.log(`\nwrote ${written}, failed ${failed}`);
if (failed > 0) {
  console.log("Re-run to retry the failures — cached rows are skipped.");
}
process.exit(failed > 0 ? 1 : 0);
