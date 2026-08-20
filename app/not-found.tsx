import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <Logo size={36} withWordmark={false} />
      <h1 className="mt-8 max-w-lg font-display text-[clamp(2rem,6vw,3rem)] leading-tight text-text">
        This page took a wrong turn.
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted">
        The link may be old, or the page may have moved. Nothing you did is
        broken.
      </p>
      <ButtonLink href="/app" size="lg" className="mt-8">
        Back to your path
      </ButtonLink>
    </div>
  );
}
