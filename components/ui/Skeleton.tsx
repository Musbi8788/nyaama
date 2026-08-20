import { cn } from "@/lib/utils/cn";

/**
 * A placeholder block. Shaped like the content it stands in for, so the
 * page does not jump when the real thing arrives.
 *
 * The pulse is dropped for anyone who has asked for reduced motion — a
 * loading indicator is not worth triggering someone's vestibular disorder.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-pulse rounded-xl bg-white/[0.06] motion-reduce:animate-none",
        className,
      )}
    />
  );
}
