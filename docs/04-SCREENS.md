# Nyaama — Screen Specification

Every screen below lists: purpose, content, states, and what "done" means.

---

## 1. Landing `/` — **problem-first**

> Explicit instruction from the product owner: a visitor must know *what problem we are
> solving* before they know what we built. The problem is the argument; the product is the
> evidence.

### 1.1 Header
Logo + wordmark left. Right: `How it works` · `Log in` · **`Find Your Way`** (primary).
Transparent over the hero, gains `bg-navy/80 backdrop-blur border-b border-line` on scroll.

### 1.2 Hero — the problem is stated above the fold

```
    [ eyebrow pill ]  THE PROBLEM WE'RE SOLVING

    Too many paths.
    No clear direction.

    Young Gambians don't lack ambition or opportunity — they lack a
    way to choose. Seven tech careers, a thousand tutorials, and no
    one to say "start here."

    Nyaama is an AI career coach that gives you one direction,
    a roadmap, and something real to build.

    [ Find Your Way ]   [ See the problem → ]
```

- Headline is Display XL serif. The problem sentence is Body L; the Nyaama sentence sits
  beneath it in `text-muted`, with **Nyaama** in `text-text`.
- The eyebrow pill is `border-line text-yellow` — the only yellow above the fold besides the CTA.
- Right side (`lg+`): the product preview — a screenshot-accurate mock of the recommendation
  card ("Software Engineering", 3 reasons, roadmap stages behind it), floating at a slight
  scale. No device frame, no gradient blobs.
- Mobile: preview moves below the CTAs, cropped to the recommendation card only.

### 1.3 Section — The cost of not knowing
Eyebrow `WHAT HAPPENS TODAY`. Headline: **"It isn't a shortage of opportunity."**
Four cards, two-up on desktop:

| Card | Line |
|---|---|
| **Ten courses started. None finished.** | Without a sequence, every tutorial feels equally urgent. |
| **A certificate, but no proof.** | Employers ask what you have built. School never asked you to build. |
| **Years spent on the wrong turn.** | Nobody nearby can tell you which path suits you. |
| **Talent that never gets found.** | The ability was always there. The direction wasn't. |

Beneath, one full-width line in Display L: *"The problem is not too few opportunities. It is
too many directions and too little guidance."*

### 1.4 Section — How Nyaama works
Four numbered steps — `01 Discover · 02 Choose · 03 Learn · 04 Build` — each with a one-line
description and a thin yellow connector between them (horizontal desktop, vertical mobile).

### 1.5 Section — Career paths
Five cards: Software Engineering · Artificial Intelligence · Data Analytics · Cybersecurity ·
Graphic Design. Icon, name, tagline. Hover raises to `surface-2`. Caption below the grid:
*"You only need one of these. That's the point."*

### 1.6 Section — Real projects
Headline: **"We don't want you to only learn. We want you to build."**
Five project cards matching the paths, each showing a real brief title
(e.g. *Build a website for a Gambian restaurant*) and the skills it practises.

### 1.7 Section — Learn in a language that makes sense
Headline: **"Learn in a way that makes sense to you."**
Shows a lesson excerpt with the language bar beneath it — `Explain simply` ·
`Explain in Wolof` · `Explain in Mandinka` · `Explain in Fula`. Honest caption:
*"Text explanations in Wolof, Mandinka and Fula. Audio is coming."*
No `Listen` button ships in the MVP.

### 1.8 Final CTA
Display XL: **"Your future needs a direction."** Single primary CTA: `Find Your Way`.
Footer: wordmark, Hack4Gambia 2026, GitHub link.

**Done when:** the problem is legible above the fold at 360px; every CTA routes to `/signup`;
LCP under 2s; scroll reveals respect reduced-motion.

---

## 2. Sign up `/signup` · Log in `/login`
Split layout on `lg+`: left = form on navy; right = a quiet panel with the wordmark and one
line — *"Don't learn everything. Find your path, go deep, and build something real."*
Fields: Name, Email, Password (signup); Email, Password (login). Inline validation in plain
language ("Use at least 8 characters"). Supabase's raw error text is never shown.
Success routes to `/welcome` (signup) or `/app` (login).

## 3. Welcome `/welcome`
One screen. Display XL: **"Let's find your path."** One paragraph, one CTA: `Start Discovery`.
Fades in. This is the tone-setter — keep it almost empty.

---

## 4. App shell `(app)/layout.tsx`
Sidebar (navy, 264px): logo + wordmark + tagline; eyebrow `YOUR SPACE`; nav items
Home · Discover · My Roadmap · Progress; streak card pinned to the bottom.
Below `md`: bottom nav bar, 4 items, active item gets a yellow icon and label.

## 5. Home `/app`
Greeting: *"Good evening, Musa."* + *"Ready to keep building?"* (time-aware).

- **Discovery incomplete** — one hero card: `Find your path` + explanation + `Start Discovery`.
  Nothing competes with it. Below, a muted line restating the problem:
  *"Most people stop because no one told them where to start. Let's fix that first."*
- **Discovery complete** — three cards:
  1. *Your path* — career name in Display M, one line, `Continue Roadmap`
  2. *Continue learning* — current module + progress bar + `Continue`
  3. *Current project* — title, status pill, `Open Project`

## 6. Discover `/app/discover`
Title **Discover Your Skills**. Intro line. A "Meet your Career Coach" panel explaining what
happens (6 short questions, about 2 minutes, one recommendation at the end) and
`Start Conversation`. Setting the expectation of *short* is what makes people finish.

## 7. Interview `/app/discover/session`
- Top: slim progress bar + `Question 3 of 6`. No chat log.
- Centre: the coach's line (AI-personalised, static fallback), then the question in
  Display M, then answer chips. A free-text field appears under the chips where the slot allows.
- Bottom: `Back` (ghost) and `Continue` (primary, disabled until answered).
- Cross-fade between questions. Answers persist per step, so a refresh resumes.
- **Done when:** completable entirely by keyboard, and completable with the network
  disconnected (static lead-ins).

## 8. Recommendation `/app/discover/result`
Loading state first (the compass animation, `03-DESIGN-SYSTEM.md §7`), then:

```
We found your path.

Software Engineering                       [ confidence bar ]

Based on what you told us, software engineering is a strong
place to start.

WHY THIS PATH
 - You said you enjoy building things people can use
 - You have already tried a little programming
 - You want to make a real product within a year

OTHER PATHS YOU MIGHT EXPLORE LATER
 [ Artificial Intelligence ]  [ Data Analytics ]

[ See my roadmap ]
```

Reasons quote the learner's actual answers — that is what makes it land. One primary path
only; alternates are secondary chips, never competing cards.
Writes `profiles.current_path`, creates the `progress` row, logs activity.

## 9. Roadmap `/app/roadmap`
Title **My Roadmap** + career name. Five stages on a vertical spine with a yellow rail: the
completed portion is solid yellow, the rest `white/10`.

Each stage card: eyebrow `STAGE 02`, title, one-line summary, skill chips, estimated effort,
status pill (`Completed` / `In progress` / `Locked`), and a CTA (`Start` / `Continue` / muted
`Coming next`). Stage 1 is always open.

Empty state (no discovery yet): *"Your path starts here."* + `Start Discovery`.

## 10. Learning module `/app/learn/[moduleId]`
Reading measure 680px. Title in Display L, the authored body (markdown), then
**Try it yourself** — the practice exercise in a bordered panel.

Beneath the body, the **language bar**:
`Explain simply` · `Explain in Wolof` · `Explain in Mandinka` · `Explain in Fula`

Selecting one replaces the body with the alternate version, marks the active button, and
shows a `← Back to English` control. Responses come from `explanation_cache` when present
(instant), otherwise the AI writes and caches them. A muted note beneath:
*"Translations are AI-assisted and improving."* — honest, and it protects us.

Bottom: `Mark as complete` → updates `module_progress`, `progress.percentage` and
`activity_log`, then routes to the next module or the project.

## 11. Project `/app/project/[projectId]`
Title in Display L: *Build a website for a Gambian restaurant.*
Sections: **What you're building** (brief) · **What you need** (tickable requirement
checklist, saved) · **What you'll practise** (skill chips).

Submission panel: live URL, notes, `Submit for review`.
After review, feedback renders as three blocks:
`What you did well` (success ticks) · `Improve this` (warning dots) ·
`Skills demonstrated` (yellow chips). Coaching, never a score.

## 12. Progress `/app/progress`
Title **Your Progress**. Career name + overall percentage with an animated bar. Then
**Skills** — one labelled bar per skill in the path. Then **Projects** — status cards. Then
**Real-world proof** — an honest muted placeholder:
*"Soon: the businesses and organisations you've built for."*

Empty state: *"Start building to see your progress."*

---

## 13. Global states

| State | Copy |
|---|---|
| AI unavailable *(only if the fallback also fails)* | **Your coach is taking a moment.** Try again in a few seconds. |
| Network error | **We couldn't load this right now.** |
| No roadmap | **Your path starts here.** Complete your discovery interview to build your roadmap. |
| No projects | **Your first project is waiting.** |
| No progress | **Start building to see your progress.** |
| 404 | **This page took a wrong turn.** [ Back to your path ] |

Raw technical errors never reach a learner. Not once.
