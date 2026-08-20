import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

/**
 * The problem is stated above the fold, before we say what we built.
 * That ordering is deliberate: the problem is the argument, and the
 * product is only the evidence for it.
 */
export function Hero() {
  return (
    <section className="mx-auto grid max-w-[1120px] items-center gap-16 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-24">
      <div className="reveal">
        <p className="inline-flex items-center gap-2 rounded-pill border border-line px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-yellow">
          The problem we&rsquo;re solving
        </p>

        <h1 className="mt-7 font-display text-[clamp(2.75rem,7vw,5rem)] leading-[1.04] tracking-[-0.02em] text-text">
          Too many paths.
          <br />
          No clear direction.
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-text/90">
          Young Gambians don&rsquo;t lack ambition or opportunity — they lack a
          way to choose. Seven tech careers, a thousand tutorials, and no one to
          say &ldquo;start here.&rdquo;
        </p>

        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          <span className="text-text">Nyaama</span> is an AI career coach that
          gives you one direction, a roadmap, and something real to build.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href="/signup" size="lg">
            Find Your Way
            <ArrowRight size={18} aria-hidden />
          </ButtonLink>
          <ButtonLink href="#the-problem" variant="secondary" size="lg">
            See the problem
            <ArrowDown size={16} aria-hidden />
          </ButtonLink>
        </div>
      </div>

      <HeroPreview />
    </section>
  );
}

/**
 * The product itself is the hero image — a faithful mock of the real
 * recommendation screen. No device frame, no gradient blobs.
 */
function HeroPreview() {
  return (
    <div className="relative" aria-hidden>
      {/* Roadmap stages peeking out behind, hinting at what comes next */}
      <div className="absolute -right-2 -top-6 hidden w-[85%] rounded-[20px] border border-line bg-surface/60 p-5 lg:block">
        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-muted">
          Stage 02
        </p>
        <p className="mt-1 font-display text-lg text-text/70">Web Fundamentals</p>
      </div>

      <div className="relative rounded-[20px] border border-line bg-surface p-6 shadow-[0_1px_2px_rgb(0_0_0/0.3)] sm:p-7 lg:mt-10">
        <p className="inline-flex items-center gap-1.5 rounded-pill border border-line px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-yellow">
          <Sparkles size={11} />
          We found your path
        </p>

        <p className="mt-4 font-display text-3xl text-text">
          Software Engineering
        </p>

        <div className="mt-4 max-w-[200px]">
          <div className="flex justify-between text-[0.625rem] text-muted">
            <span>How sure we are</span>
            <span>85%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-pill bg-white/10">
            <div className="h-full w-[85%] rounded-pill bg-yellow" />
          </div>
        </div>

        <p className="mt-6 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-muted">
          Why this path
        </p>
        <ul className="mt-3 space-y-2.5 text-sm text-text">
          {[
            "You enjoy building things people can use",
            "You've already tried a little programming",
            "You want to make a real product within a year",
          ].map((reason) => (
            <li key={reason} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow" />
              <span className="leading-snug">{reason}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 inline-flex h-10 items-center rounded-xl bg-yellow px-4 text-sm font-medium text-navy">
          See my roadmap
        </div>
      </div>
    </div>
  );
}
