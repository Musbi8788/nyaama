import Image from "next/image";
import mark from "@/public/nyaama.svg";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  /** Pixel size of the mark itself. */
  size?: number;
  withWordmark?: boolean;
  withTagline?: boolean;
  className?: string;
};

/**
 * The Nyaama mark, from public/nyaama.svg — the same artwork the browser
 * tab and the home-screen icon use, so the brand is one thing everywhere.
 *
 * The artwork carries its own light ground, so it is clipped to the rounded
 * square the rest of the interface uses rather than being floated on the
 * navy.
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
        "inline-flex shrink-0 overflow-hidden rounded-[28%]",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image
        src={mark}
        alt=""
        width={size}
        height={size}
        priority
        className="h-full w-full object-cover"
      />
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
