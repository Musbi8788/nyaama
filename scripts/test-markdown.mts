/**
 * Checks the lesson markdown renderer against the syntax the seeded lessons
 * actually contain — and against the shapes a language model produces when a
 * translation goes wrong.
 *
 * The renderer is the one place model output reaches the page, so the second
 * half matters as much as the first: nothing here may become executable, and
 * an unclosed fence or a stray asterisk must degrade to plain text rather
 * than swallowing the rest of the lesson.
 *
 *   npx tsx --tsconfig scripts/tsconfig.test.json scripts/test-markdown.mts
 */
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import pg from "pg";
import { Markdown } from "../lib/content/markdown.js";

// createElement rather than JSX so this stays a plain .mts script.
const render = (md: string) =>
  renderToStaticMarkup(createElement(Markdown, null, md));

let failures = 0;
const check = (name: string, ok: boolean, detail?: string) => {
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}`);
  if (!ok) {
    failures++;
    if (detail) console.log(`        ${detail}`);
  }
};

console.log("syntax:");

check("bold renders as <strong>", render("a **b** c").includes("<strong"));
check("italic renders as <em>", render("a *b* c").includes("<em"));
check(
  "bold is not mistaken for italic",
  !render("a **b** c").includes("<em"),
  render("a **b** c"),
);
check(
  "italic keeps its text and drops the asterisks",
  (() => {
    const out = render("the *cheapest* thing");
    return out.includes(">cheapest</em>") && !out.includes("*");
  })(),
  render("the *cheapest* thing"),
);
check("inline code renders as <code>", render("use `npm run dev`").includes("<code"));
check("fences render as <pre>", render("```js\nconst a = 1;\n```").includes("<pre"));
check("headings render as <h2>", render("# Title").includes("<h2"));
check("bullets render as <ul>", render("- one\n- two").includes("<ul"));
check("numbered lists render as <ol>", render("1. one\n2. two").includes("<ol"));

console.log("\nmodel-output safety:");

check(
  "html in the source is escaped, never live",
  (() => {
    const out = render('<img src=x onerror="alert(1)">');
    return !out.includes("<img") && out.includes("&lt;img");
  })(),
);
check(
  "a script tag cannot escape the text",
  !render("<script>alert(1)</script>").includes("<script>"),
);
check(
  "an unclosed fence does not swallow the lesson",
  render("intro\n\n```js\nconst a = 1;").includes("<pre"),
);
check(
  "a lone asterisk stays literal",
  render("2 * 3 = 6").includes("2 * 3 = 6"),
  render("2 * 3 = 6"),
);
check(
  "an unclosed bold marker stays literal",
  render("this is **not closed").includes("**not closed"),
  render("this is **not closed"),
);
check("empty input renders nothing but the wrapper", !render("").includes("<p"));

console.log("\nevery seeded lesson:");

const url = readFileSync(".env.local", "utf8").match(/^DATABASE_URL=(.*)$/m)![1].trim();
const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();
const { rows } = await client.query<{
  id: string;
  body: string;
  simple_body: string | null;
}>("select id, body, simple_body from learning_modules order by id");
await client.end();

let stray = 0;
let rendered = 0;
for (const row of rows) {
  for (const field of ["body", "simple_body"] as const) {
    const text = row[field];
    if (!text) continue;
    const out = render(text);
    rendered++;
    // A leftover marker means the lesson shows punctuation the author meant
    // as formatting. Fences legitimately contain asterisks, so ignore those.
    const outsideCode = out.replace(/<pre[\s\S]*?<\/pre>/g, "");
    if (/\*\*/.test(outsideCode)) {
      console.log(`  STRAY  ${row.id}.${field}`);
      stray++;
    }
  }
}
check(`${rendered} lesson fields render with no leftover markers`, stray === 0);

console.log(`\n${failures === 0 ? "all checks passed" : `${failures} failing`}`);
process.exit(failures === 0 ? 0 : 1);
