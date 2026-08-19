# Nyaama — 2-Day Build Plan

Total budget: **~16 working hours across 2 days.** Ordered so that a shippable product
exists at the end of every block — if we stop early, we still have something to demo.

---

## Block 0 — Infrastructure (60 min, blocking, no parallelism)

Nothing else starts until this is green.

1. `create-next-app` — TypeScript, App Router, Tailwind v4, ESLint, src-less layout
2. Install: `@supabase/supabase-js @supabase/ssr openai zod lucide-react clsx tailwind-merge`
3. shadcn/ui init + the primitives we actually use: button, input, label, card, dialog,
   progress, badge, skeleton, sonner
4. Design tokens in `globals.css`, fonts via `next/font`, `Logo` component
5. `.env.local` + `.env.example`
6. Supabase: run `0001_init.sql`, run `seed.sql`, verify RLS with a test user
7. `git init`, first commit, push to GitHub, import to Vercel, **deploy the empty shell**

**Gate:** `https://nyaama.vercel.app` serves a navy page with the wordmark, and a Supabase
query works from a server component. We deploy on hour one, not hour fifteen.

---

## Day 1

| Time | Track | Work |
|---|---|---|
| 0:00–1:00 | — | **Block 0** above |
| 1:00–3:30 | **A** | Auth: signup, login, middleware guard, profile trigger, welcome screen |
| 1:00–3:30 | **B** | App shell: sidebar, mobile bottom nav, streak card, home dashboard (both states) |
| 3:30–6:30 | **C** | **Discovery — the heart.** Question bank + weights, interview UI, partial persistence, AI lead-ins with fallback, recommendation call + deterministic scorer, result screen |
| 3:30–6:30 | **D** | Landing page: hero, problem section, how-it-works, paths, projects, language, final CTA |
| 6:30–8:00 | — | **Integration + deploy.** Merge tracks, walk the full flow signup → recommendation on the deployed URL. |

**End of Day 1 = demo-able:** a stranger can sign up, be interviewed, and get a real
recommendation with reasons, on a live URL.

## Day 2

| Time | Track | Work |
|---|---|---|
| 8:00–10:00 | **E** | Roadmap page (stages, rail, statuses) + progress computation |
| 8:00–10:00 | **F** | Learning module reader + language bar + `explanation_cache` + explain/translate routes |
| 10:00–12:00 | **G** | Project brief, checklist, submission, AI review + rubric fallback |
| 10:00–12:00 | **H** | Progress page: overall, skill bars, project cards, streak wiring |
| 12:00–13:30 | — | **Polish pass:** every empty state, every error state, every loading skeleton, 360px sweep, keyboard sweep, contrast check |
| 13:30–15:00 | — | **Demo hardening:** pre-warm translation cache, seed demo user, run the demo script 3× end-to-end on a phone, fix what breaks |
| 15:00–16:00 | — | Buffer. README, screenshots, submission form. |

---

## How the tracks run in parallel

Tracks marked with the same time slot are **independent by file ownership** — this is what
makes parallel agents safe rather than a merge disaster.

| Track | Owns exclusively |
|---|---|
| A Auth | `app/(auth)/**`, `lib/supabase/**`, `middleware.ts` |
| B Shell | `app/(app)/layout.tsx`, `app/(app)/page.tsx`, `components/layout/**` |
| C Discovery | `app/(app)/discover/**`, `app/api/ai/interview`, `app/api/ai/recommend`, `lib/ai/**`, `lib/data/interview.ts`, `lib/data/scoring.ts` |
| D Landing | `app/(marketing)/**`, `components/marketing/**` |
| E Roadmap | `app/(app)/roadmap/**`, `lib/queries/progress.ts` |
| F Learning | `app/(app)/learn/**`, `app/api/ai/explain`, `lib/data/modules.ts` |
| G Project | `app/(app)/project/**`, `app/api/ai/review` |
| H Progress | `app/(app)/progress/**`, `components/app/SkillBar.tsx` |

**Shared files** — `components/ui/**`, `components/brand/**`, `globals.css`,
`lib/supabase/**`, the SQL migration — are written once in Block 0 and then treated as
**frozen**. A track that needs a change to a shared file asks rather than edits.

Rule of thumb: run **at most two tracks concurrently.** More than that and reviewing their
output costs more than the parallelism saves.

## Per-feature loop

Each track runs the same loop until its exit criteria pass:

1. Build the happy path against seeded data
2. Kill the network / force the AI to fail — confirm the fallback is invisible
3. Check at 360px and at 1440px
4. Tab through it with the keyboard
5. Empty state, loading state, error state
6. Commit, push — **Vercel preview deploy is the test environment**

A feature is done when a stranger could use it on a phone with a bad connection.

## Definition of shippable (checked before every push to `main`)

- [ ] `npm run build` passes with zero TypeScript errors
- [ ] No `console.log` left in shipped code
- [ ] No secret reachable from a client component
- [ ] Every new route has loading + error + empty states
- [ ] Works at 360px
- [ ] Deployed preview visited and clicked, not just built

## Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| OpenAI slow or rate-limited on demo day | Medium | Full fallback layer + pre-warmed cache + seeded demo account |
| Supabase email confirmation blocks judge signup | High if unchecked | Turn confirmation **off** in Block 0; verified in the demo rehearsal |
| Translation quality is poor | Medium | Pre-warm, read the output ourselves, keep the honest caption; a native speaker on the team should sanity-check the demo module |
| Scope creep into the earn/mentor layers | High | `00-PRD.md §6` is the answer. Anything not on the Discover→Prove line waits |
| Time lost to design bikeshedding | Medium | Tokens are frozen after Block 0 |
| Venue wifi | Medium | Rehearse on a phone hotspot; cache pre-warmed; demo account ready offline-ish |

## Demo script (4 minutes) — rehearse it three times

1. **10s** — Land on `/`. Read the problem headline aloud. *"This is the problem."*
2. **20s** — Sign up, live.
3. **60s** — Discovery interview, answer honestly, 6 questions.
4. **40s** — The recommendation. Read the reasons aloud — they quote the answers just given.
5. **30s** — Roadmap. Five stages, one direction.
6. **50s** — Open the lesson. Tap **Explain in Wolof**. Let it land.
7. **40s** — Open the project. Submit. Show the coaching feedback and skills demonstrated.
8. **20s** — Close: *"Nyaama doesn't just tell you what to learn. It helps you find your path
   and start building it."*
