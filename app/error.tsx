"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";

/**
 * The last thing standing between a thrown error and a learner.
 *
 * `error.message` is deliberately never rendered. In production Next
 * redacts it anyway, but in development it would put a stack-trace
 * fragment in front of someone who came here to learn HTML. It goes to
 * the console, where it belongs.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[nyaama] unhandled error:", error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <Logo size={36} withWordmark={false} />
      <h1 className="mt-8 max-w-lg font-display text-[clamp(2rem,6vw,3rem)] leading-tight text-text">
        We couldn&rsquo;t load this right now.
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted">
        Something went wrong on our side. Your progress is saved.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" onClick={reset}>
          <RotateCw size={17} aria-hidden />
          Try again
        </Button>
        <ButtonLink href="/app" variant="secondary" size="lg">
          Back to your path
        </ButtonLink>
      </div>

      {/* Support can ask for this; it identifies the error without exposing
          anything about it. */}
      {error.digest && (
        <p className="mt-8 font-mono text-xs text-muted">
          Reference: {error.digest}
        </p>
      )}
    </div>
  );
}
