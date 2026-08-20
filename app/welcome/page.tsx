import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { getProfile } from "@/lib/queries/user";

export const metadata = { title: "Welcome" };

export default async function WelcomePage() {
  const profile = await getProfile();
  const firstName = profile?.name?.split(" ")[0];

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="reveal max-w-lg space-y-8">
        <Logo size={36} withWordmark={false} className="mx-auto" />

        <h1 className="font-display text-[clamp(2.5rem,6vw,3.75rem)] leading-[1.08] text-text">
          Let&rsquo;s find your path{firstName ? `, ${firstName}` : ""}.
        </h1>

        <p className="mx-auto max-w-md text-lg leading-relaxed text-muted">
          Your coach will ask a few questions about what you enjoy, what
          you&rsquo;ve tried, and where you want to get to. Then we&rsquo;ll
          point you in one direction — not seven.
        </p>

        <ButtonLink href="/app/discover" size="lg">
          Start Discovery
          <ArrowRight size={18} aria-hidden />
        </ButtonLink>
      </div>
    </main>
  );
}
