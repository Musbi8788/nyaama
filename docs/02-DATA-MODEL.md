# Nyaama — Data Model

Supabase Postgres. Ten tables. RLS on every user-owned table, from the first migration —
not bolted on later.

## Conventions

- `id uuid default gen_random_uuid() primary key`
- `user_id uuid references auth.users(id) on delete cascade`
- `created_at timestamptz default now()`
- Content tables (`career_paths`, `learning_modules`, `projects`) are **seeded, read-only to
  users**, and use stable text slugs as ids so code can reference them literally.

---

## Tables

### `profiles`
Mirrors `auth.users`, created by trigger on signup.

| column | type | note |
|---|---|---|
| id | uuid PK | = `auth.users.id` |
| name | text | from signup |
| email | text | |
| education | text null | filled from interview slot 1 |
| current_path | text null | FK-ish → `career_paths.id`, set at recommendation |
| onboarded | boolean default false | true once discovery completes |
| created_at | timestamptz | |

RLS: select/update where `id = auth.uid()`.

### `career_paths` — seeded, 5 rows
| column | type | note |
|---|---|---|
| id | text PK | `software_engineering` etc. |
| name | text | "Software Engineering" |
| tagline | text | one line for the landing grid |
| description | text | |
| icon | text | lucide icon name |
| stages | jsonb | 5 stages: `{n, title, summary, skills[], effort, moduleIds[]}` |
| skills | text[] | flat list for the progress page |
| sort | int | |

RLS: select to `anon, authenticated`. No write.

### `learning_modules` — seeded
| column | type | note |
|---|---|---|
| id | text PK | `se-html-basics` |
| path_id | text | |
| stage | int | 1–5 |
| title | text | "What is HTML?" |
| summary | text | |
| body | text | markdown, authored |
| simple_body | text | pre-authored plain-language version = fallback for "Explain simply" |
| practice | text | the "Try it yourself" exercise |
| skills | text[] | skills this module advances |
| minutes | int | |
| sort | int | |

RLS: select to all authenticated.

### `projects` — seeded, ≥1 per path
| column | type | note |
|---|---|---|
| id | text PK | `se-restaurant-site` |
| path_id | text | |
| title | text | "Build a website for a Gambian restaurant" |
| brief | text | markdown |
| requirements | jsonb | `[{id,label}]` — checklist the learner ticks |
| practices | text[] | "HTML", "CSS", "Responsive design" |
| difficulty | text | starter / core / real-world |

RLS: select to all authenticated.

---

### `career_assessments`
| column | type | note |
|---|---|---|
| id | uuid PK | |
| user_id | uuid | |
| answers | jsonb | `{slot: value}` for all 6 slots |
| scores | jsonb | computed weight table, all 5 paths |
| recommendation | text | path id |
| confidence | numeric | 0–1 |
| reasons | text[] | 3–4 strings |
| alternatives | text[] | 2 path ids |
| source | text | `ai` \| `fallback` — for our own honesty in debugging |
| completed | boolean default false | partial rows exist mid-interview |
| created_at | timestamptz | |

RLS: all operations where `user_id = auth.uid()`.

### `progress`
One row per user per path.

| column | type | note |
|---|---|---|
| id | uuid PK | |
| user_id | uuid | |
| path_id | text | |
| current_stage | int default 1 | |
| percentage | int default 0 | recomputed on every module/project event |
| updated_at | timestamptz | |

Unique on `(user_id, path_id)`. RLS: own rows.

### `module_progress`
| column | type | note |
|---|---|---|
| id | uuid PK | |
| user_id | uuid | |
| module_id | text | |
| status | text | `not_started` \| `in_progress` \| `completed` |
| percentage | int default 0 | |
| updated_at | timestamptz | |

Unique on `(user_id, module_id)`. RLS: own rows.

### `project_submissions`
| column | type | note |
|---|---|---|
| id | uuid PK | |
| user_id | uuid | |
| project_id | text | |
| status | text | `not_started` \| `in_progress` \| `submitted` \| `reviewed` |
| url | text null | live link or repo |
| notes | text null | |
| checklist | jsonb | `{requirementId: boolean}` |
| feedback | jsonb null | `{didWell[], improve[], skillsDemonstrated[]}` |
| feedback_source | text null | `ai` \| `fallback` |
| created_at / updated_at | timestamptz | |

Unique on `(user_id, project_id)`. RLS: own rows.

### `explanation_cache`
Doubles as the offline fallback for translations. **Not user-scoped** — one learner's
Wolof explanation of "What is an API?" is the right answer for everyone.

| column | type | note |
|---|---|---|
| id | uuid PK | |
| module_id | text | |
| mode | text | `simple` \| `translate` |
| lang | text | `en` \| `wo` \| `mnk` \| `ff` |
| content | text | |
| created_at | timestamptz | |

Unique on `(module_id, mode, lang)`. RLS: select to authenticated; insert via service role
only (server route writes it).

### `activity_log`
Drives the streak card. Day-level, one row per user per day.

| column | type | note |
|---|---|---|
| id | uuid PK | |
| user_id | uuid | |
| day | date | |
| events | int default 1 | incremented |

Unique on `(user_id, day)`. RLS: own rows.

---

## Derived values (computed, never stored twice)

- **Overall progress %** = `(completed modules / total modules in path) * 70 + (reviewed projects / total projects) * 30`, rounded.
- **Skill bars** = for each skill in the path, `% = completed modules carrying that skill / total modules carrying it`.
- **Streak** = consecutive days ending today present in `activity_log`.

## Migration & seed plan

- `0001_init.sql` — extensions, tables, indexes, RLS policies, the `handle_new_user` trigger.
- `seed.sql` — 5 career paths, ~10 learning modules (6 for software engineering, 1 each for
  the rest), 5 project briefs.
- `scripts/prewarm.ts` — logs in with the service role, generates and stores translations
  for the demo modules into `explanation_cache`. Run once after seeding, and again after any
  module text change.

## Demo account

`scripts/seed-demo-user.ts` creates `demo@nyaama.gm` with discovery completed, roadmap at
stage 2, one module done, one project in progress. This is the backup if the live flow
misbehaves on stage — and it's also how we screenshot the product for the landing page.
