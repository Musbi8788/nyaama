/**
 * Applies the schema and seed to Supabase Postgres.
 *
 *   node scripts/db.mjs migrate   -- schema only
 *   node scripts/db.mjs seed      -- content only
 *   node scripts/db.mjs all       -- both, then verify
 *   node scripts/db.mjs verify    -- report what is actually in the database
 *
 * Needs DATABASE_URL in .env.local (Supabase dashboard -> Connect -> URI).
 * Both files are idempotent, so re-running is safe.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pg from "pg";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv() {
  const raw = readFileSync(join(root, ".env.local"), "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

async function run(client, file) {
  const sql = readFileSync(join(root, "supabase", file), "utf8");
  process.stdout.write(`  applying ${file} … `);
  await client.query(sql);
  console.log("ok");
}

async function verify(client) {
  const tables = await client.query(`
    select c.relname as table,
           c.relrowsecurity as rls,
           (select count(*) from pg_policies p
             where p.schemaname = 'public' and p.tablename = c.relname) as policies
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relkind = 'r'
    order by c.relname
  `);

  console.log("\n  table                  rls    policies");
  console.log("  " + "-".repeat(42));
  let unprotected = [];
  for (const r of tables.rows) {
    const rls = r.rls ? "on " : "OFF";
    console.log(
      `  ${r.table.padEnd(22)} ${rls}    ${r.policies}`,
    );
    if (!r.rls) unprotected.push(r.table);
  }

  const counts = await client.query(`
    select 'career_paths' t, count(*) n from public.career_paths
    union all select 'learning_modules', count(*) from public.learning_modules
    union all select 'projects', count(*) from public.projects
  `);
  console.log("\n  seeded content:");
  for (const r of counts.rows) console.log(`    ${r.t.padEnd(20)} ${r.n}`);

  const trig = await client.query(`
    select count(*)::int n from pg_trigger
    where tgname = 'on_auth_user_created' and not tgisinternal
  `);
  console.log(
    `\n  signup trigger:        ${trig.rows[0].n === 1 ? "installed" : "MISSING"}`,
  );

  if (unprotected.length) {
    console.log(`\n  WARNING: RLS off for: ${unprotected.join(", ")}`);
    process.exitCode = 1;
  } else {
    console.log("  RLS:                   enabled on every table");
  }
}

const cmd = process.argv[2] ?? "all";
loadEnv();

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    "\nDATABASE_URL is not set in .env.local.\n\n" +
      "Supabase dashboard -> Connect -> Connection string -> URI.\n" +
      "Use the Session pooler string and put your database password in it.\n",
  );
  process.exit(1);
}

const client = new pg.Client({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  const who = await client.query("select current_database() db, version()");
  console.log(`\nconnected to ${who.rows[0].db}`);

  if (cmd === "migrate" || cmd === "all") await run(client, "migrations/0001_init.sql");
  if (cmd === "seed" || cmd === "all") await run(client, "seed.sql");
  if (cmd === "verify" || cmd === "all") await verify(client);

  console.log("");
} catch (err) {
  console.error("\nFAILED:", err.message);
  if (err.position) console.error("  at character", err.position);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
