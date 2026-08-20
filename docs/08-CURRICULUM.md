# 08 — Curriculum

How the content is organised, and why the Core Skills layer is shaped the way it is.

## Source

The skills taught here are drawn from `Future_Skills_2026-2035.pdf` — a ranking of the
fifteen skills expected to hold their value through the next decade. Four of those fifteen
map onto career paths Nyaama already had:

| Report skill | Nyaama path |
| --- | --- |
| AI Literacy | Artificial Intelligence |
| Programming & Software Development | Software Engineering |
| Data Literacy | Data Analytics |
| Cybersecurity | Cybersecurity |

Graphic Design is not in the report by name; it stays because it is the fastest route from
skill to income in The Gambia, and because Creative Thinking — which *is* in the report,
at the top — has to live somewhere concrete.

The remaining eleven are durable human skills. They became the **Core Skills layer**.

## Why a layer, not a sixth path

The product promise is *five directions, one of them is yours*. A sixth tile labelled
"Core Skills" would have broken it, and would have sent a learner who chose Cybersecurity
somewhere else to learn communication — which is exactly the split that makes these skills
feel optional.

So the core lessons sit **inside** every path. A cybersecurity learner meets Communication
while learning to write up a finding. A designer meets it while learning to defend a
typeface to a client. Same lesson, met in context, in their own roadmap.

## How it is built

Each core lesson is authored **once** in `supabase/seed.sql`, then cross-joined onto all
five paths. That produces one `learning_modules` row per path, with a path-prefixed id:

```
se-core-communication   ai-core-communication   da-core-communication
cy-core-communication   gd-core-communication
```

This is duplication on purpose. The alternative — a `core` flag and a module that belongs
to no path — would have meant special cases in `buildStages`, `getModuleAccess`,
`recomputeProgress` and `skillBreakdown`, all of which key off `path_id`. As written, a
core lesson is an ordinary module of the learner's own path: it sits in a real stage, it
locks and unlocks like any other, and it counts toward progress without a single branch
anywhere in the query layer.

Editing the lesson once in the seed changes it in all five paths. Core lessons carry
`sort` values from 20 up, so they always follow a path's own lessons within a stage.

## Where each core skill lands

| Stage | Core lessons |
| --- | --- |
| 1 · Foundations | Analytical Thinking · Adaptability & Lifelong Learning |
| 2 | Communication · Creative Thinking |
| 3 | Systems Thinking · Emotional Intelligence |
| 4 · Build | Entrepreneurship · Digital Marketing & Personal Branding |
| 5 · Real-World Work | Leadership · Financial Literacy · Domain Expertise |

The progression is deliberate: think clearly and keep learning → express and imagine →
see connections and see people → make and sell → lead, handle money, go deep.

Every core skill name is also added to `career_paths.skills`, which is what
`skillBreakdown` reads. That means the progress page shows a bar per core skill, filling
as the learner completes the lessons that carry it.

## Side effect: no dead ends

Before this, only Software Engineering had lessons past stage 1; the other four paths
showed *"Lessons for this stage are being written"* from stage 2 onward. `buildStages`
deliberately lets an empty stage fall through rather than block, so those roadmaps were
open but hollow.

Every stage of every path now carries lessons, so all five paths are walkable end to end
and stage gating is live everywhere. The empty-stage rule is still real logic and is still
covered — `scripts/test-roadmap.mts` proves it against a synthetic path with a hollow
stage, since the live data no longer exercises it.

## Software Engineering, updated

The report is explicit that programming is changing rather than disappearing: future
developers *build AI-powered applications, integrate APIs, and focus more on solving
business problems than writing every line manually.* The path previously stopped at
HTML/CSS/JS.

- Stage 4 is now **Build with AI**
- New lesson `se-ai-powered-apps` — calling a model rather than training one, keeping the
  key server-side, designing for latency and failure, and choosing a problem worth solving
- `AI-assisted development` added to the path's skills
- The path description leads with the change rather than the tooling

## Authoring rules

Every lesson carries three things, and all three are hand-written — none are generated:

- **`body`** — the full lesson.
- **`simple_body`** — a plain-language version. This is what "Explain simply" serves, with
  no model call at all, which is why it is instant and always available. Short sentences,
  common words, no idiom that would not survive translation.
- **`practice`** — one concrete action, doable offline, with what is near the learner.

The lesson renderer (`lib/content/markdown.tsx`) supports paragraphs, `#` headings,
` ``` ` fences, `` `inline code` ``, `**bold**`, `*italic*`, and `-` / `1.` lists. It
produces React nodes, never HTML strings, because translated bodies come back from a
language model. `npm run test:markdown` checks both the syntax and that model output
cannot become executable.

## Running it

```bash
npm run db:seed         # apply content changes (idempotent)
npm run db:verify       # counts per table
npm run test:roadmap    # stage locking against real data
npm run test:markdown   # renderer, plus every seeded lesson
```
