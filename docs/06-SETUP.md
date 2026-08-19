# Nyaama — Setup: what I need from you

I can do everything else. These are the items only you can provide, in the order I need them.

---

## Now — blocking Block 0

### 1. Supabase project
1. Go to https://supabase.com → **New project**
2. Name `nyaama`, region **West Europe (London or Frankfurt)** — closest to The Gambia
3. Save the database password somewhere safe
4. Once it finishes provisioning, go to **Project Settings → API** and send me:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...        # secret — never commit, never client-side
```

5. **Important:** Authentication → Sign In / Providers → Email → turn **"Confirm email" OFF**.
   A judge must not have to open an inbox mid-demo.

### 2. OpenAI API key
- https://platform.openai.com → API keys → create one for this project
- **Add at least $5 of credit** — a free key with no credit fails on the first call and the
  whole demo runs on fallbacks
- Send me: `OPENAI_API_KEY=sk-...`

### 3. GitHub
- Confirm the repo: public or private, and the name (suggest `nyaama`)
- `gh` CLI is already installed here; if you're logged in I can create and push it myself.
  Check with `! gh auth status` — if it fails, run `! gh auth login`

### 4. Vercel
- https://vercel.com → sign in **with GitHub** (fastest path)
- Then either connect the repo yourself in their dashboard, or install the CLI and log in:
  `! npx vercel login`
- I'll add the environment variables once the project exists

---

## Soon — needed by Day 2 morning

### 5. Language sanity check
Do you (or someone on the team) speak **Wolof, Mandinka or Fula** well enough to read one
paragraph of AI translation and say "yes, that's understandable"? If yes, I'll pre-warm the
cache early so you can check it before the demo. If no, we keep the caption
*"AI-assisted and improving"* and don't claim more.

### 6. Demo identity
The greeting says *"Good evening, Musa."* — confirm the name to use in the demo, and whether
you want a seeded demo account with a specific email/password you'll remember on stage.

### 7. Optional — the visual reference
Section 33 of the project doc mentions a supplied dashboard screenshot. I don't have it. I'm
building from the written colour/type spec, which is detailed enough. If you have that image,
drop it in `docs/reference/` and I'll match it more exactly.

---

## How to hand things over

Paste the keys straight into this chat — I'll write `.env.local`, add `.env*` to
`.gitignore` before the first commit, and push the values to Vercel as environment variables.
They never enter the repo.

---

## What I'll do the moment I have items 1–3

1. Scaffold the Next.js app with tokens, fonts and logo
2. Run the migration and seed against your Supabase project
3. Push to GitHub and deploy to Vercel
4. Send you the live URL — within about an hour

Then we start Day 1's tracks.
