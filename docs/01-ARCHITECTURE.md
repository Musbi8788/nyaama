# Nyaama — Architecture

## 1. Shape

A single Next.js 15 App Router application. No separate backend, no microservices.

```
Browser (RSC + client islands)
   ↓  server action / route handler   ← the ONLY place secrets live
Next.js server
   ├→ OpenAI  (structured JSON, always with a deterministic fallback)
   └→ Supabase (Postgres, Auth, RLS)
   ↓
UI
```

**Hard rule:** `OPENAI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are never imported into any
file that could reach the client. All AI work happens in `lib/ai/*`, which is marked
`import "server-only"`.

## 2. Stack

| Layer | Choice | Version pin |
|---|---|---|
| Framework | Next.js App Router | 15.x |
| Language | TypeScript, `strict: true` | 5.x |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) | 4.x |
| Components | shadcn/ui, heavily restyled | latest |
| Icons | lucide-react | latest |
| Fonts | `next/font`: DM Serif Display + Inter | — |
| DB / Auth | `@supabase/ssr` + `@supabase/supabase-js` | latest |
| AI | `openai` SDK | latest |
| Validation | `zod` | 3.x |
| Deploy | Vercel | — |

Package manager: **npm** (already installed; no pnpm on this machine).

## 3. Directory layout

```
app/
  (marketing)/
    page.tsx                    landing — problem-first
    how-it-works/page.tsx
  (auth)/
    login/page.tsx
    signup/page.tsx
  (app)/
    layout.tsx                  sidebar + mobile bottom nav, auth-guarded
    welcome/page.tsx
    page.tsx                    /app  home dashboard
    discover/page.tsx           intro to the coach
    discover/session/page.tsx   the interview
    discover/result/page.tsx    the recommendation
    roadmap/page.tsx
    learn/[moduleId]/page.tsx
    project/[projectId]/page.tsx
    progress/page.tsx
  api/
    ai/interview/route.ts       next question
    ai/recommend/route.ts       final recommendation
    ai/explain/route.ts         simplify / translate
    ai/review/route.ts          project feedback
components/
  brand/      Logo, Wordmark, ProblemBadge
  ui/         shadcn primitives (restyled)
  layout/     Sidebar, MobileNav, StreakCard, AppShell
  marketing/  Hero, ProblemSection, HowItWorks, PathGrid, ProjectShowcase, LanguageSection, FinalCta
  app/        RecommendationCard, RoadmapStage, ModuleReader, LanguageBar, ProjectBrief, SkillBar, StreakDots
lib/
  ai/         client.ts, interview.ts, recommend.ts, explain.ts, review.ts, fallbacks.ts, schemas.ts
  supabase/   client.ts (browser), server.ts (RSC), admin.ts (service role), middleware.ts
  data/       paths.ts, modules.ts, projects.ts, scoring.ts   ← authored content + deterministic scoring
  queries/    profile.ts, progress.ts, activity.ts
  utils/      cn.ts, dates.ts, format.ts
supabase/
  migrations/0001_init.sql
  seed.sql
docs/         these specs
```

## 4. The AI layer — the part that must not fail

Every AI function follows one shape:

```ts
export async function recommendCareer(input: Answers): Promise<Recommendation> {
  try {
    const raw = await withTimeout(openaiCall(input), 12_000);   // hard 12s ceiling
    return RecommendationSchema.parse(raw);                      // zod validates
  } catch (e) {
    logServer("ai.recommend.fallback", e);
    return deterministicRecommendation(input);                   // lib/data/scoring.ts
  }
}
```

Four rules, no exceptions:

1. **Timeout** — 12s for recommendation and review, 8s for interview and explain.
2. **Schema-validate** — `response_format: { type: "json_schema", strict: true }`, then
   parse with zod. A schema miss is treated exactly like an outage.
3. **Fallback is real, not an error message** — the deterministic path produces a genuinely
   good answer (see §5). The learner cannot tell which one they got.
4. **One retry**, then fall back. Never spin.

### Fallback sources

| Call | Fallback |
|---|---|
| Interview next question | Static question bank in `lib/data/interview.ts` (the AI only *rephrases*; the slots are fixed) |
| Recommendation | Weighted scoring over the answer options → path + templated reasons built from the user's actual selections |
| Explain simply | Pre-authored simplified version stored with the module |
| Translate to Wolof / Mandinka / Fula | `explanation_cache` table, pre-warmed for demo modules during setup |
| Project review | Rubric-driven feedback derived from checklist items the learner ticked |

**Pre-warming is part of deployment**, not an afterthought: a seed script calls the
translate endpoint once per (demo module × 3 languages) and writes results to
`explanation_cache`. On stage, those responses are instant *and* offline-proof.

### Model routing

| Purpose | Model | Why |
|---|---|---|
| Interview phrasing | `gpt-4o-mini` | cheap, fast, low stakes |
| Recommendation | `gpt-4o` | the one answer that must feel smart |
| Explain / translate | `gpt-4o` | translation quality matters more than cost |
| Project review | `gpt-4o-mini` | structured, forgiving |

## 5. The interview: server-driven state machine, not a chatbot

Six fixed **slots**, in order:

| # | Slot | Answer type |
|---|---|---|
| 1 | Background — what you study / studied | chips + free text |
| 2 | Interests — what you enjoy doing | multi-select chips |
| 3 | Working style — build / analyse / design / protect / solve | single-select |
| 4 | Experience — what you've already tried | multi-select chips |
| 5 | Goal — what you want to be able to do in a year | chips + free text |
| 6 | Direction — company / freelance / own business / unsure | single-select |

Each chip carries **weights toward the five paths** (`lib/data/scoring.ts`). The AI's only
job during the interview is to write a warm, personal one-line lead-in for the next slot
based on what was just said. If it fails, the static lead-in is used. **The interview
therefore cannot break.**

At the end, the full answer set goes to the recommendation call. The AI receives the
computed weight table as context and must pick from the five paths, justifying with the
learner's own words. If it fails, the top-weighted path wins.

Answers are held in React state and persisted to `career_assessments` in one write at the
end (plus a partial write on each step so a refresh never loses work).

## 6. Auth & routing

- `@supabase/ssr` cookie session; `middleware.ts` protects `/app/*` and `/welcome`.
- Unauthenticated hit on `/app/*` → redirect to `/login?next=…`.
- Authenticated hit on `/login` or `/signup` → redirect to `/app`.
- Sign-up creates the `profiles` row via a Postgres trigger on `auth.users` (not client code).
- Email confirmation is **disabled** in the Supabase dashboard for the hackathon — a judge
  must not have to open an inbox. This is written down in `06-SETUP.md`.

## 7. Rendering strategy

- Marketing pages: static, no client JS beyond a scroll reveal.
- App pages: React Server Components read from Supabase; only genuinely interactive pieces
  (interview, language bar, project form) are client components.
- No global state library. Server data + `useState` is enough at this size.

## 8. Error handling contract

- No raw error text ever reaches the learner. `error.tsx` per route group renders the
  on-brand messages from `NYAAMA_Project.md §44`.
- Server logs the real error with a short code; the UI shows the human message plus a
  **Try again** action.
- Every list and panel has an authored empty state (§45).

## 9. Performance targets

- Landing LCP < 2.0s on 4G
- Interview step transition < 300ms perceived (optimistic advance; AI lead-in streams in)
- No layout shift on font load (`next/font` with `display: swap` + size-adjust)
