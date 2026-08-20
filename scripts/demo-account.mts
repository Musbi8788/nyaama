/**
 * Creates a demo learner already partway through the journey.
 *
 *   npm run demo:account -- you@example.com yourpassword
 *   npm run demo:account -- you@example.com yourpassword --reset
 *
 * The demo script signs up live, which is the better story. This is the
 * parachute: if the venue wifi drops during signup, or a judge wants to
 * see the middle of the product without sitting through the interview,
 * log in as this account instead.
 *
 * It lands the learner on Software Engineering with stage 1 complete, so
 * the roadmap shows real movement, stage 2 is unlocked, and the progress
 * page is not a row of zeroes.
 *
 * --reset wipes the account's progress back to that state, so the same
 * account can be rehearsed with repeatedly.
 */
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
);

const URL_ = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const PATH_ID = "software_engineering";
/** Stage 1 of the seeded Software Engineering path. */
const COMPLETED = ["se-how-web-works"];

const args = process.argv.slice(2);
const reset = args.includes("--reset");
const [email, password] = args.filter((a) => !a.startsWith("--"));

if (!email || !password) {
  console.log(
    "Usage: npm run demo:account -- <email> <password> [--reset]\n\n" +
      "Use an address at a real domain — Supabase rejects addresses whose\n" +
      "domain has no MX record, so example.com and .test will not work.",
  );
  process.exit(1);
}

const auth = async (path: string, body: unknown) => {
  const response = await fetch(`${URL_}/auth/v1/${path}`, {
    method: "POST",
    headers: { apikey: KEY, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
};

// Sign in if the account exists, otherwise create it. Either way we end up
// with a session and a profile row (the database trigger makes the profile).
let account = await auth("token?grant_type=password", { email, password });
let created = false;
if (!account.access_token) {
  account = await auth("signup", { email, password, data: { name: "Demo Learner" } });
  created = true;
}
if (!account.access_token) {
  console.log(`Could not sign in or sign up: ${account.msg ?? account.error_description ?? JSON.stringify(account)}`);
  process.exit(1);
}

const token = account.access_token as string;
const userId = account.user.id as string;
console.log(`${created ? "Created" : "Signed in as"} ${email}\n  id ${userId}`);

const rest = (path: string, init: RequestInit = {}) =>
  fetch(`${URL_}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: KEY,
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      ...(init.headers ?? {}),
    },
  });

if (reset) {
  // Own-row RLS means these only ever touch this account.
  for (const table of ["module_progress", "project_submissions", "progress", "activity_log"]) {
    await rest(`${table}?user_id=eq.${userId}`, { method: "DELETE" });
  }
  console.log("  reset previous progress");
}

const say = async (label: string, response: Response) => {
  const ok = response.ok;
  console.log(`  ${ok ? "ok  " : "FAIL"} ${label}${ok ? "" : ` (${response.status} ${await response.text()})`}`);
  return ok;
};

await say(
  "chose Software Engineering",
  await rest(`profiles?id=eq.${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ current_path: PATH_ID, onboarded: true, name: "Demo Learner" }),
  }),
);

await say(
  "completed stage 1",
  await rest("module_progress", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify(
      COMPLETED.map((module_id) => ({
        user_id: userId,
        module_id,
        status: "completed",
        percentage: 100,
      })),
    ),
  }),
);

// Matches recomputeProgress: modules are 70% of the total, projects 30%.
const modules = (await (
  await rest(`learning_modules?select=id&path_id=eq.${PATH_ID}`)
).json()) as { id: string }[];
const percentage = Math.round((COMPLETED.length / modules.length) * 70);

await say(
  `progress set to ${percentage}%`,
  await rest("progress", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify({
      user_id: userId,
      path_id: PATH_ID,
      current_stage: 2,
      percentage,
    }),
  }),
);

await say(
  "logged activity for today",
  await rest("activity_log", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify({
      user_id: userId,
      day: new Date().toISOString().slice(0, 10),
      events: 1,
    }),
  }),
);

console.log(
  `\nReady. Log in as ${email} to land on a roadmap with stage 1 done and stage 2 open.`,
);
