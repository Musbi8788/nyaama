/**
 * Runs the degeneration detector over every cached translation.
 *
 *   npx tsx --tsconfig scripts/tsconfig.test.json scripts/test-degenerate.mts
 *
 * The three known-bad rows are named explicitly. If a future prompt change
 * fixes them, this test fails and tells you to update the list — which is
 * the outcome we want to be told about.
 */
import { readFileSync } from "node:fs";
import { looksDegenerate } from "../lib/ai/translate.js";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
);

const auth = await (
  await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: { apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY, "content-type": "application/json" },
    body: JSON.stringify({
      email: `nyaama.degen.${Date.now()}@gmail.com`,
      password: `pw-${Math.random().toString(36).slice(2)}`,
      data: { name: "Degen Check" },
    }),
  })
).json();

const rows = (await (
  await fetch(
    `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/explanation_cache?select=module_id,lang,content`,
    {
      headers: {
        apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        authorization: `Bearer ${auth.access_token}`,
      },
    },
  )
).json()) as { module_id: string; lang: string; content: string }[];

console.log(`${rows.length} cached translations\n`);

let flagged = 0;
for (const row of rows) {
  const bad = looksDegenerate(row.content);
  if (bad) flagged++;
  const words = row.content.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean);
  const variety = new Set(words).size / words.length;
  console.log(
    `  ${bad ? "FLAG" : "ok  "}  ${row.module_id.padEnd(22)} ${row.lang.padEnd(4)} variety ${variety.toFixed(3)}`,
  );
}

// Synthetic cases, so the detector is pinned even with an empty cache.
const checks: [string, boolean][] = [
  ["flags a single repeated word", looksDegenerate("laŋo ".repeat(60))],
  ["flags a repeated sentence", looksDegenerate("Ko ɗum ena heɓi e nder ɓuri. ".repeat(20))],
  [
    "passes ordinary prose",
    !looksDegenerate(
      "An API is a way for one program to ask another program for something. Think of a restaurant: you tell the waiter what you want, and food comes back. You never see the kitchen, and you do not need to. The waiter is the agreed way of asking, so the kitchen can change entirely without you having to learn anything new about ordering lunch there.",
    ),
  ],
  ["ignores anything under forty words", !looksDegenerate("yes yes yes yes yes")],
];

console.log("\nchecks:");
let failed = 0;
for (const [name, ok] of checks) {
  if (!ok) failed++;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}`);
}

console.log(`\n${flagged} of ${rows.length} cached rows flagged as degenerate`);
console.log(`${checks.length - failed}/${checks.length} checks passed`);
process.exit(failed ? 1 : 0);
