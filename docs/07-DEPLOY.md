# 07 — Deploy

Nyaama is a stock Next.js 16 App Router app. Vercel needs no `vercel.json`,
no build overrides and no adapter — the defaults are correct.

## Environment variables

Set these in the Vercel project (Settings → Environment Variables), for
**Production, Preview and Development**:

| Variable | Value | Why |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://rxsqaloivzgemwhakwlv.supabase.co` | Database and auth |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | the `sb_publishable_…` key | Publishable; safe in the browser |
| `OPENAI_API_KEY` | the `sk-proj-…` key | Server-only. Never prefixed `NEXT_PUBLIC_` |

### Do not set `NEXT_PUBLIC_SITE_URL`

`lib/utils/site-url.ts` resolves the origin in this order:

```
NEXT_PUBLIC_SITE_URL
  → NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  → NEXT_PUBLIC_VERCEL_URL
  → VERCEL_PROJECT_PRODUCTION_URL
  → VERCEL_URL
  → http://localhost:3000
```

Vercel injects the `VERCEL_*` values automatically. `.env.local` sets
`NEXT_PUBLIC_SITE_URL=http://localhost:3000` for local development —
copying that value into Vercel would point `metadataBase` at localhost on
the live site, which breaks every Open Graph and canonical URL. Leave it
unset in Vercel and the fallback does the right thing.

### `DATABASE_URL` does not belong in Vercel

Nothing the app serves reads it. It is only used by `scripts/db.mjs` for
migrations, which run from a developer machine.

## Deploying

```bash
npx vercel login          # interactive — run this yourself
npx vercel link           # connect this directory to a Vercel project
npx vercel --prod         # deploy
```

Or connect the GitHub repo in the Vercel dashboard and every push to
`main` deploys itself.

## After the first deploy

1. **Visit the live URL and click through it.** The build passing is not
   the same as the app working; the deploy is only done once someone has
   used it.
2. **Check Supabase Auth → URL Configuration.** Password sign-in with
   email confirmation off uses no redirects, so nothing is required today.
   If confirmation is ever switched on, the site URL must be added there
   *and* an `/auth/confirm` route must exist — it does not yet, so the
   emailed link would go nowhere.
3. **Re-run the pre-warm** if the cache was cleared:
   `npm run prewarm -- --status` reports coverage without spending money.

## Known gaps

- `DATABASE_URL` in `.env.local` currently points at
  `db.<ref>.supabase.co`, the direct connection, which is IPv6-only and
  does not resolve from every network. `npm run db:*` fails against it.
  Replace it with the **Session pooler** URI from Supabase → Connect
  (`aws-0-<region>.pooler.supabase.com`).
- No `/auth/confirm` route. Safe while email confirmation is off.
