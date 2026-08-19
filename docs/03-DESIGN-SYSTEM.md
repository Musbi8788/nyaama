# Nyaama — Design System

The product is **dark-first**. Deep navy is the ground, warm yellow is the single accent,
and typography does most of the work. Calm, editorial, confident. Not a SaaS template.

## 1. Tokens

Tailwind v4, CSS-first. In `app/globals.css`:

```css
@theme {
  --color-navy:        #1C2142;   /* ground: sidebar, hero, page background */
  --color-surface:     #252B4C;   /* cards, panels, inputs on dark */
  --color-surface-2:   #2E3559;   /* hover, raised, active input */
  --color-yellow:      #F6C447;   /* THE accent — primary CTA, active nav, progress */
  --color-yellow-dim:  #D9A92F;   /* hover on yellow */
  --color-text:        #F4F0E6;   /* warm off-white — never pure white */
  --color-muted:       #A7A9B8;   /* secondary copy, metadata */
  --color-line:        rgb(255 255 255 / 0.08);
  --color-line-strong: rgb(255 255 255 / 0.14);

  --color-success:     #6FCF97;
  --color-warning:     #F2994A;
  --color-danger:      #EB5757;

  --font-display: "DM Serif Display", Georgia, serif;
  --font-sans:    "Inter", system-ui, sans-serif;

  --radius-card: 20px;
  --radius-pill: 999px;
}
```

**Rules**
- Never hardcode a hex outside this block.
- Yellow is scarce. One yellow element per viewport is the target; two is the ceiling.
  Yellow means *"this is your next action."* If everything is yellow, nothing is.
- No pure white (`#FFF`) and no pure black anywhere.
- Light mode is **not** built. The product is dark by design; `color-scheme: dark`.

## 2. Typography

| Role | Font | Size / weight | Use |
|---|---|---|---|
| Display XL | DM Serif Display | `clamp(2.75rem, 7vw, 5rem)`, 400, `leading-[1.05]`, `tracking-[-0.02em]` | Landing hero, "We found your path." |
| Display L | DM Serif Display | `clamp(2rem, 4vw, 3rem)` | Section headlines, page titles |
| Display M | DM Serif Display | 1.75rem | Card headline, career name |
| Body L | Inter | 1.125rem / 400 / `leading-relaxed` | Hero support copy, lesson body |
| Body | Inter | 1rem / 400 | Default |
| Small | Inter | 0.875rem | Metadata, nav |
| Eyebrow | Inter | 0.75rem / 600 / `tracking-[0.14em]` / uppercase | "THE PROBLEM", "STAGE 02", "THIS WEEK" |

The wordmark is **lowercase serif**: `nyaama`, with `FIND YOUR WAY` as a muted eyebrow beneath.

Never bold everything. Emphasis comes from size and the serif/sans contrast, not weight.

## 3. Logo

Rounded square (`radius 12px`), `--color-yellow` fill, navy glyph: a single circle with a
small dot offset inside it — a compass reading, not a literal compass. Sizes: 28px sidebar,
32px auth pages, 40px landing header, favicon 32/180.

Component: `components/brand/Logo.tsx` — props `{ size, withWordmark, withTagline }`.

## 4. Spacing & layout

- 4px base scale, prefer `4 / 6 / 8 / 12 / 16 / 24` steps.
- Content max width `1120px`; lesson reader max width `680px` (reading measure matters).
- Section vertical rhythm: `py-24` desktop, `py-16` mobile.
- Sidebar `264px` fixed on `lg+`; collapses to bottom nav below `md`.
- Cards: `rounded-[20px] bg-surface border border-line p-6`. Shadow is nearly invisible —
  `shadow-[0_1px_2px_rgb(0_0_0/0.3)]`. Depth comes from surface tone, not shadow.

## 5. Components

### Button
| Variant | Style |
|---|---|
| `primary` | `bg-yellow text-navy font-medium rounded-xl px-6 h-12`, hover `bg-yellow-dim`, active scale 0.99 |
| `secondary` | `bg-surface text-text border border-line`, hover `bg-surface-2` |
| `ghost` | transparent, `text-muted`, hover `text-text` |
| `link` | underline offset 4, yellow on hover |

All buttons: `focus-visible:ring-2 ring-yellow ring-offset-2 ring-offset-navy`. Minimum
touch target 44px. Loading state swaps the label for a spinner **and keeps the width**.

### Nav item
Active: `bg-yellow text-navy rounded-pill px-4 h-11` + right-aligned `ChevronRight` 16px.
Inactive: `text-muted`, hover `text-text bg-white/[0.03]`.

### Streak card
Sits at the sidebar bottom. Eyebrow `THIS WEEK`, then `3 day streak` in Display M, then the
encouragement line in `text-muted text-sm`, then 7 dots — 8px circles, `bg-yellow` for
active days, `bg-white/10` for inactive, today ringed.

### Progress bar
Height 6px, `rounded-pill`, track `bg-white/10`, fill `bg-yellow`, width animates
`transition-[width] duration-700 ease-out` on mount.

### Chip (interview answers, tags, filters)
`rounded-pill border border-line px-4 h-10 text-sm`, selected → `bg-yellow text-navy border-transparent`.
Multi-select chips show a small `Check` when selected.

### Input
`bg-surface border border-line rounded-xl h-12 px-4`, focus → `border-yellow/60` + ring.
Labels always visible above the field — no placeholder-only fields.

## 6. Motion

- Durations: 150ms (hover), 250ms (enter), 700ms (progress fill).
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Page/section entrance: fade + 12px rise, staggered 60ms. One reveal per section, once.
- The interview transitions by cross-fading the question, never sliding a chat log.
- `@media (prefers-reduced-motion: reduce)` → all of it becomes an instant opacity change.
- No parallax, no bounce, no confetti.

## 7. Loading states (these are brand moments)

The recommendation wait is the longest in the product. It shows the wordmark's compass
glyph rotating slowly with a rotating caption line:
*"Reading your answers…" → "Weighing five directions…" → "Finding your path…"*

Everywhere else: skeletons in `bg-white/[0.04]` matching the real layout — never a spinner
in the middle of an empty page.

## 8. Accessibility (non-negotiable)

- Contrast: yellow `#F6C447` on navy `#1C2142` = 9.4:1 ✓; muted `#A7A9B8` on navy = 6.8:1 ✓;
  **navy text on yellow** for buttons = 9.4:1 ✓. Never yellow text on surface for body copy.
- Every interactive element reachable and operable by keyboard, in visual order.
- Visible focus ring everywhere, never `outline: none` without a replacement.
- Landmarks: `<header> <nav> <main> <footer>`; one `<h1>` per page.
- Interview chips are real `<button role="checkbox|radio">` with `aria-checked`.
- Progress bars carry `role="progressbar"` + `aria-valuenow`.
- Language buttons announce the language in English for screen readers
  (`aria-label="Explain in Wolof"`).
- All imagery decorative or captioned; no meaning conveyed by colour alone (streak dots also
  carry a `title`).

## 9. Responsive breakpoints

| Range | Behaviour |
|---|---|
| `< 768px` | Bottom nav (4 icons + labels), single column, roadmap vertical, sticky primary CTA on lesson/project pages |
| `768–1023px` | Icon-only rail sidebar, two-column cards |
| `≥ 1024px` | Full 264px sidebar with streak card |

Test at 360px width. That is a real Gambian phone, and it is the width that breaks things.
