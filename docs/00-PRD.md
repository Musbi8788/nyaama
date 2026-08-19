# Nyaama — Product Requirements (Hackathon MVP)

**Hack4Gambia 2026 · Build window: 2 days · Status: spec locked**

Source of truth for scope. Derived from `NYAAMA_Project.md`; where the two differ, this
document wins because it records decisions made after that document was written.

---

## 1. The one sentence

Nyaama takes a young Gambian from *"I don't know what technology career to choose"* to
*"I know my path, my roadmap, and what I'm building this week"* — in one sitting.

## 2. The problem (this is the thing we lead with)

Not a shortage of opportunity. A shortage of **direction**.

| The reality | What it causes |
|---|---|
| Seven-plus tech careers, no way to tell which fits | Paralysis — nothing is started |
| Infinite free tutorials, no sequence | Ten courses begun, zero finished |
| School teaches theory, employers want evidence | Certificates without proof |
| No one to ask | Wrong turns take years to discover |

**Design consequence:** the problem is not a marketing section, it is the product's
opening argument. See `04-SCREENS.md §1` — the landing page states the problem *above the
fold*, before it says what we built, and the problem framing follows the user into the app.

## 3. The core hypothesis being tested

> Given an AI-guided career interview, one confident recommendation with reasons, a
> concrete roadmap, and a real project brief — does a learner move from uncertainty to action?

Everything in the MVP exists to make that testable in a 4-minute demo.

## 4. Locked decisions

| Decision | Choice | Rationale |
|---|---|---|
| AI provider | **OpenAI** (`gpt-4o-mini` default, `gpt-4o` for recommendation) | Per original spec; key held by team |
| Structured output | JSON Schema via `response_format` | Never parse prose |
| Backend | **Supabase** cloud (Postgres + Auth + RLS) | Per spec; user provisions project |
| Local languages | **Wolof, Mandinka, Fula — text only** | Honest. No `Listen` button in MVP; no fake TTS voices |
| Demo safety | **Full deterministic fallback on every AI call** | Stage failure is unacceptable |
| Deployment | Vercel + GitHub | Per spec |
| Mobile | Responsive, bottom nav under `md` | Users are phone-first |

## 5. In scope (Definition of Done)

A brand-new user can, without help:

1. Land on `/`, understand the problem and the promise in under 15 seconds
2. Sign up with name / email / password
3. Complete a 6-step AI career interview that feels like a conversation
4. Receive **one** primary career recommendation with 3–4 personal reasons and 2 alternates
5. See a 5-stage roadmap for that career
6. Open a real learning module and read it
7. Ask for it *simply*, or in *Wolof / Mandinka / Fula*, and get a real answer
8. Open a project brief and start it
9. Submit the project (link + notes) and receive structured AI coaching
10. See progress: overall %, skill bars, project status, day streak

And it must read as **one product**, not eleven screens.

## 6. Explicitly out of scope

Job marketplace · payments · human mentors · learner chat · full LMS · course catalogue ·
certificates · vector DB / RAG · Python backend · native apps · analytics dashboards ·
audio lessons · Google/Apple/phone auth.

If a feature does not serve **Discover → Choose → Learn → Build → Prove**, it waits.

## 7. The five career paths (fixed)

`software_engineering` · `artificial_intelligence` · `data_analytics` · `cybersecurity` ·
`graphic_design`

The AI selects among these. It never invents a career. Full roadmap + modules + project are
authored for **software_engineering** (the demo path); the other four ship with a complete
roadmap and a project brief, with one authored module each.

## 8. Success criteria for the demo

- Cold start to career recommendation: **under 3 minutes**
- Zero visible errors, zero raw stack traces, zero loading state longer than 8 seconds
- Every AI wait has a purposeful, on-brand loading state
- Works on a phone held by a judge
