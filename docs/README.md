# Nyaama — Specification Index

Hack4Gambia 2026. Read in order.

| Doc | What it settles |
|---|---|
| [`00-PRD.md`](00-PRD.md) | The problem, the hypothesis, locked decisions, scope in and out, Definition of Done |
| [`01-ARCHITECTURE.md`](01-ARCHITECTURE.md) | Next.js structure, the AI layer and its fallbacks, auth, error contract |
| [`02-DATA-MODEL.md`](02-DATA-MODEL.md) | Ten Supabase tables, RLS, derived values, seed and pre-warm plan |
| [`03-DESIGN-SYSTEM.md`](03-DESIGN-SYSTEM.md) | Tokens, typography, components, motion, accessibility, breakpoints |
| [`04-SCREENS.md`](04-SCREENS.md) | Screen-by-screen spec, copy included — landing page leads with the problem |
| [`05-BUILD-PLAN.md`](05-BUILD-PLAN.md) | 2-day schedule, parallel tracks and file ownership, risk register, demo script |
| [`06-SETUP.md`](06-SETUP.md) | **What the team must provide** — Supabase, OpenAI, GitHub, Vercel |

`../NYAAMA_Project.md` is the original vision document. Where it and `00-PRD.md` disagree,
`00-PRD.md` wins — it records decisions made after the vision doc was written.

## The four locked decisions

1. **OpenAI** for all AI, structured JSON output only, never prose parsing
2. **Supabase** cloud for Postgres + Auth, RLS from the first migration
3. **Wolof, Mandinka, Fula — text only.** No audio, no fake voices, honest caption
4. **Every AI call has a deterministic fallback.** The demo cannot break on stage.
