const DEV_FALLBACK = "http://localhost:3000";

/** Trims a value and treats blank strings as absent — an env var set to "" is not a value. */
function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Ensures a bare host like "nyaama.vercel.app" becomes an absolute URL. */
function withProtocol(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

/**
 * Absolute origin for the running deployment.
 *
 * Order: explicit NEXT_PUBLIC_SITE_URL, then the stable production domain Vercel
 * injects, then the per-deployment URL, then localhost for dev.
 */
export function getSiteUrl(): string {
  const resolved =
    clean(process.env.NEXT_PUBLIC_SITE_URL) ??
    clean(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ??
    clean(process.env.NEXT_PUBLIC_VERCEL_URL) ??
    clean(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    clean(process.env.VERCEL_URL);

  return resolved ? withProtocol(resolved) : DEV_FALLBACK;
}
