/**
 * Exercises the recommendation both ways: the deterministic scorer alone,
 * and the real AI call. If the two disagree often, the fallback is not a
 * silent substitute and a learner would notice which one they got.
 *
 *   npx tsx scripts/test-recommend.mts
 */
import { readFileSync } from "node:fs";
import { deterministicRecommendation, PATH_NAMES } from "../lib/data/scoring.js";
import type { Answers } from "../lib/data/interview.js";

for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}

const { recommendCareer } = await import("../lib/ai/recommend.js");

const PERSONAS: Record<string, Answers> = {
  "wants to build websites": {
    background: { options: ["ict"] },
    interests: { options: ["making", "puzzles"] },
    workstyle: { options: ["builder"] },
    experience: { options: ["code", "website"] },
    goal: { options: ["build_product"] },
    direction: { options: ["own_business"] },
  },
  "artistic, no code": {
    background: { options: ["arts"] },
    interests: { options: ["visual", "explaining"] },
    workstyle: { options: ["designer"] },
    experience: { options: ["design_tools"] },
    goal: { options: ["earn_freelance"] },
    direction: { options: ["freelance"] },
  },
  "maths, likes patterns": {
    background: { options: ["science_maths"] },
    interests: { options: ["patterns", "puzzles"] },
    workstyle: { options: ["analyst"] },
    experience: { options: ["spreadsheets"] },
    goal: { options: ["make_sense_data"] },
    direction: { options: ["company"] },
  },
  "curious about breaking things": {
    background: { options: ["ict"] },
    interests: { options: ["protecting", "puzzles"] },
    workstyle: { options: ["protector"] },
    experience: { options: ["networks"] },
    goal: { options: ["protect_systems"] },
    direction: { options: ["company"] },
  },
  "total beginner, vague": {
    background: { options: ["not_studying"] },
    interests: { options: ["explaining"] },
    workstyle: { options: ["builder"] },
    experience: { options: ["nothing"] },
    goal: { options: ["get_job"] },
    direction: { options: ["unsure"] },
  },
};

console.log("\n=== DETERMINISTIC FALLBACK (works with no network) ===\n");
const fallbacks: Record<string, string> = {};
for (const [name, answers] of Object.entries(PERSONAS)) {
  const r = deterministicRecommendation(answers);
  fallbacks[name] = r.recommendation;
  console.log(`${name}`);
  console.log(`  -> ${PATH_NAMES[r.recommendation]}  (confidence ${r.confidence})`);
  for (const reason of r.reasons) console.log(`     - ${reason}`);
  console.log();
}

console.log("=== LIVE AI (same answers) ===\n");
let agree = 0;
const total = Object.keys(PERSONAS).length;
for (const [name, answers] of Object.entries(PERSONAS)) {
  const r = await recommendCareer(answers);
  const match = r.recommendation === fallbacks[name];
  if (match) agree++;
  console.log(`${name}`);
  console.log(
    `  -> ${PATH_NAMES[r.recommendation]}  (${r.source}, confidence ${r.confidence}) ${
      match ? "== fallback" : "DIFFERS from fallback: " + fallbacks[name]
    }`,
  );
  for (const reason of r.reasons) console.log(`     - ${reason}`);
  console.log(`     alternatives: ${r.alternatives.join(", ")}`);
  console.log();
}

console.log(`agreement with fallback: ${agree}/${total}`);
