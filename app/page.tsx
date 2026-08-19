import { Logo } from "@/components/brand/Logo";

/**
 * Block 0 placeholder. Proves tokens, fonts and the mark render correctly.
 * Replaced by the problem-first landing page in Track D (docs/04-SCREENS.md §1).
 */
export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-10 px-6 text-center">
      <Logo size={44} withTagline />

      <div className="reveal max-w-2xl space-y-6">
        <p className="inline-block rounded-pill border border-line px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-yellow">
          The problem we&rsquo;re solving
        </p>
        <h1 className="font-display text-[clamp(2.75rem,7vw,5rem)] leading-[1.05] tracking-[-0.02em] text-text">
          Too many paths.
          <br />
          No clear direction.
        </h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted">
          Young Gambians don&rsquo;t lack ambition or opportunity — they lack a
          way to choose.
        </p>
      </div>

      <p className="text-sm text-muted">
        Infrastructure ready. Building from{" "}
        <code className="rounded bg-surface px-2 py-1 text-text">docs/</code>.
      </p>
    </main>
  );
}
