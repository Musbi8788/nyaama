/**
 * Checks stage unlocking against the real seeded roadmap.
 *
 *   npx tsx --tsconfig scripts/tsconfig.test.json scripts/test-roadmap.mts
 */
import { readFileSync } from "node:fs";
import pg from "pg";
import { buildStages } from "../lib/queries/progress.js";
import type {
  CareerPath,
  LearningModule,
  ModuleProgress,
} from "../lib/types/database.js";

const url = readFileSync(".env.local", "utf8").match(/^DATABASE_URL=(.*)$/m)![1].trim();
const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();

const path = (await client.query("select * from career_paths where id='software_engineering'"))
  .rows[0] as CareerPath;
const modules = (
  await client.query(
    "select * from learning_modules where path_id='software_engineering' order by stage, sort",
  )
).rows as LearningModule[];
await client.end();

const done = (...ids: string[]): ModuleProgress[] =>
  ids.map((id) => ({ module_id: id, status: "completed" }) as ModuleProgress);

const show = (label: string, progress: ModuleProgress[]) => {
  console.log(`\n${label}`);
  for (const s of buildStages(path, modules, progress)) {
    console.log(
      `  ${s.n}. ${s.title.padEnd(18)} ${s.status.padEnd(12)} ${s.completedCount}/${s.totalCount}` +
        (s.nextModuleId ? `  next: ${s.nextModuleId}` : ""),
    );
  }
};

console.log(`path: ${path.name} — ${modules.length} modules across ${path.stages.length} stages`);

show("A) brand new learner", []);
show("B) finished stage 1", done("se-how-web-works"));
show("C) stage 1 done, half of stage 2", done("se-how-web-works", "se-html-basics"));
show(
  "D) stages 1-3 done",
  done(
    "se-how-web-works",
    "se-html-basics",
    "se-css-basics",
    "se-javascript-basics",
    "se-what-is-an-api",
  ),
);
show("E) everything done", done(...modules.map((m) => m.id)));

console.log("\nchecks:");
const fresh = buildStages(path, modules, []);
const assert = (name: string, ok: boolean) =>
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}`);

assert("stage 1 open for a new learner", fresh[0].status === "available");
assert("stage 2 locked for a new learner", fresh[1].status === "locked");
assert("stage 1 offers a first lesson", Boolean(fresh[0].nextModuleId));

const afterOne = buildStages(path, modules, done("se-how-web-works"));
assert("stage 1 completes", afterOne[0].status === "completed");
assert("stage 2 unlocks after stage 1", afterOne[1].status === "available");
assert("stage 3 still locked", afterOne[2].status === "locked");

const all = buildStages(path, modules, done(...modules.map((m) => m.id)));
assert(
  "content-free final stage never blocks",
  all[4].status !== "locked",
);
assert("no stage offers a lesson it has none of", all.every((s) => s.totalCount > 0 || !s.nextModuleId));
