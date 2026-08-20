import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { getProfile, getCurrentPath, getProgress } from "@/lib/queries/user";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default async function HomePage() {
  const profile = await getProfile();
  const path = await getCurrentPath(profile?.current_path ?? null);
  const progress = await getProgress(profile?.current_path ?? null);

  const firstName = profile?.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-10">
      <header className="space-y-1">
        <h1 className="font-display text-3xl text-text sm:text-4xl">
          {greeting()}, {firstName}.
        </h1>
        <p className="text-muted">
          {path ? "Ready to keep building?" : "Let's find where you're going."}
        </p>
      </header>

      {!path ? (
        <>
          {/* Nothing competes with this card until discovery is done. */}
          <section className="rounded-[20px] border border-line bg-surface p-7 sm:p-9">
            <h2 className="font-display text-2xl text-text sm:text-3xl">
              Find your path
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">
              Have a short conversation with your AI career coach. Six
              questions, about two minutes, and one clear direction at the end
              of it.
            </p>
            <ButtonLink href="/app/discover" size="lg" className="mt-7">
              Start Discovery
              <ArrowRight size={18} aria-hidden />
            </ButtonLink>
          </section>

          {/* The problem, restated where it matters most: before the first step. */}
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            Most people stop before they start, because nobody told them where
            to begin. That&rsquo;s the part we fix first.
          </p>
        </>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          <section className="rounded-[20px] border border-line bg-surface p-6 sm:col-span-2">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
              Your path
            </p>
            <h2 className="mt-2 font-display text-3xl text-text">
              {path.name}
            </h2>
            <p className="mt-2 max-w-xl text-muted">{path.tagline}</p>

            {progress && (
              <div className="mt-5 max-w-sm">
                <div className="flex justify-between text-xs text-muted">
                  <span>Overall progress</span>
                  <span>{progress.percentage}%</span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={progress.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Overall progress"
                  className="mt-2 h-1.5 overflow-hidden rounded-pill bg-white/10"
                >
                  <div
                    className="h-full rounded-pill bg-yellow transition-[width] duration-700 ease-out"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>
            )}

            <ButtonLink href="/app/roadmap" className="mt-7">
              Continue Roadmap
              <ArrowRight size={16} aria-hidden />
            </ButtonLink>
          </section>
        </div>
      )}
    </div>
  );
}
