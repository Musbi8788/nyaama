/**
 * Checks project review against the real seeded project.
 *
 *   npx tsx --tsconfig scripts/tsconfig.test.json scripts/test-review.mts
 *
 * The rubric runs offline. The AI path makes a real call, so this costs a
 * few cents — that is the point: the fallback is only trustworthy if we
 * have compared it against the thing it stands in for.
 */
import { readFileSync } from "node:fs";
import { rubricFeedback } from "../lib/data/rubric.js";
import { reviewProject } from "../lib/ai/review.js";
import type { Project } from "../lib/types/database.js";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
);
process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;

const response = await fetch(
  `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects?id=eq.se-restaurant-site&select=*`,
  { headers: { apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY } },
);
const [project] = (await response.json()) as Project[];
console.log(`project: ${project.title} — ${project.requirements.length} requirements\n`);

const ids = project.requirements.map((r) => r.id);
const tick = (n: number): Record<string, boolean> =>
  Object.fromEntries(ids.map((id, i) => [id, i < n]));

const results: [string, boolean][] = [];
const check = (name: string, ok: boolean) => results.push([name, ok]);

// ---------- the rubric, with no model involved ----------
console.log("RUBRIC (offline)\n");
for (const [label, n, url] of [
  ["nothing ticked, no link", 0, null],
  ["half ticked, with link", 4, "https://example.com"],
  ["everything ticked, with link", ids.length, "https://example.com"],
] as [string, number, string | null][]) {
  const f = rubricFeedback(project, tick(n), url);
  console.log(`  ${label}`);
  console.log(`    did well : ${f.didWell.length} — ${f.didWell[0]}`);
  console.log(`    improve  : ${f.improve.length} — ${f.improve[0]}`);
  console.log(`    skills   : ${f.skillsDemonstrated.length}/${project.practices.length}\n`);

  check(`rubric always says something well done (${n} ticked)`, f.didWell.length > 0);
  check(`rubric always gives a next action (${n} ticked)`, f.improve.length > 0);
  check(
    `rubric never invents a skill (${n} ticked)`,
    f.skillsDemonstrated.every((s) => project.practices.includes(s)),
  );
}

const none = rubricFeedback(project, tick(0), null);
check("nothing ticked claims no skills at all", none.skillsDemonstrated.length === 0);
const partial = rubricFeedback(project, tick(5), "https://example.com");
check(
  "five of seven ticked does not credit every skill",
  partial.skillsDemonstrated.length < project.practices.length,
);
const all = rubricFeedback(project, tick(ids.length), "https://example.com");
check("everything ticked claims every skill", all.skillsDemonstrated.length === project.practices.length);
check(
  "everything ticked still suggests a next step",
  all.improve.length > 0,
);
check(
  "a missing link is named as a gap",
  none.improve.some((i) => i.toLowerCase().includes("link")),
);

// ---------- the live model ----------
console.log("AI REVIEW (live call)\n");
const review = await reviewProject(
  project,
  tick(5),
  "https://ndeyes-kitchen.netlify.app",
  "I could not get the WhatsApp link working and the menu looks squashed on my phone.",
);

console.log(`  source: ${review.source}`);
for (const item of review.feedback.didWell) console.log(`    + ${item}`);
for (const item of review.feedback.improve) console.log(`    - ${item}`);
console.log(`    skills: ${review.feedback.skillsDemonstrated.join(", ")}`);

const flat = [...review.feedback.didWell, ...review.feedback.improve].join(" ");
check("review returned something", review.feedback.didWell.length > 0);
check(
  "no score, grade or percentage anywhere",
  !/\b\d+\s*(%|\/\s*\d+|out of)\b/i.test(flat) && !/\bgrade\b/i.test(flat),
);
check(
  "never claims to have seen the site",
  !/\bI (looked|viewed|visited|saw|opened|checked)\b/i.test(flat),
);
check(
  "skills stay inside the practice list",
  review.feedback.skillsDemonstrated.every((s) => project.practices.includes(s)),
);
check("addresses the learner directly", review.feedback.didWell.some((d) => /\byou\b/i.test(d)));
check(
  "credits no more skills than the checklist supports",
  review.feedback.skillsDemonstrated.length <= partial.skillsDemonstrated.length,
);
// The learner left "works properly on a phone screen" unticked and said the
// menu looks squashed. Left unguarded the model credited them responsive
// design anyway, which is the exact claim this product cannot afford to
// get wrong.
check(
  "no responsive design credit while the mobile requirement is unticked",
  !review.feedback.skillsDemonstrated.some((s) => /responsive/i.test(s)),
);

console.log("\nchecks:");
let failed = 0;
for (const [name, ok] of results) {
  if (!ok) failed++;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}`);
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
