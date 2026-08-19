import { cn } from "@/lib/utils/cn";

type LogoProps = {
  /** Pixel size of the mark itself. */
  size?: number;
  withWordmark?: boolean;
  withTagline?: boolean;
  className?: string;
};

/**
 * The Nyaama mark: a yellow rounded square holding a navy compass reading —
 * a ring with an offset dot. Not a literal compass, and deliberately simple
 * so it survives being rendered at 16px as a favicon.
 */
export function LogoMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[28%] bg-yellow",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 24 24"
        fill="none"
        className="text-navy"
      >
        <circle
          cx="12"
          cy="12"
          r="8.25"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="15" cy="9" r="2.5" fill="currentColor" />
      </svg>
    </span>
  );
}

export function Logo({
  size = 32,
  withWordmark = true,
  withTagline = false,
  className,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark size={size} />
      {withWordmark && (
        <span className="flex flex-col justify-center leading-none">
          <span
            className="font-display lowercase text-text"
            style={{ fontSize: size * 0.72 }}
          >
            nyaama
          </span>
          {withTagline && (
            <span className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-muted">
              Find Your Way
            </span>
          )}
        </span>
      )}
      <span className="sr-only">Nyaama — Find Your Way</span>
    </span>
  );
}
