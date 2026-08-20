import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { pathIcon } from "./icons";
import type { CareerPath, Project } from "@/lib/types/database";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
      {children}
    </p>
  );
}

/** The cost of not knowing. Named consequences, not abstractions. */
export function ProblemSection() {
  const costs = [
    {
      title: "Ten courses started. None finished.",
      body: "Without a sequence, every tutorial feels equally urgent — so none of them gets finished.",
    },
    {
      title: "A certificate, but no proof.",
      body: "Employers ask what you have built. School never asked you to build anything.",
    },
    {
      title: "Years spent on the wrong turn.",
      body: "Nobody nearby can tell you which path actually suits you, so you find out slowly.",
    },
    {
      title: "Talent that never gets found.",
      body: "The ability was always there. The direction wasn't.",
    },
  ];

  return (
    <section
      id="the-problem"
      className="scroll-mt-20 border-t border-line bg-surface/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1120px] px-6">
        <Eyebrow>What happens today</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-text">
          It isn&rsquo;t a shortage of opportunity.
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {costs.map((cost) => (
            <div
              key={cost.title}
              className="rounded-[20px] border border-line bg-surface p-6 sm:p-7"
            >
              <h3 className="font-display text-xl text-text">{cost.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{cost.body}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-3xl text-center font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-snug text-text">
          The problem is not too few opportunities. It is too many directions
          and too little guidance.
        </p>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { n: "01", title: "Discover", body: "Meet your AI career coach. Six questions, two minutes." },
    { n: "02", title: "Choose", body: "Get one direction that fits you — not a list of seven." },
    { n: "03", title: "Learn", body: "Follow a focused roadmap, in language that makes sense." },
    { n: "04", title: "Build", body: "Turn what you know into something real people can see." },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-6">
        <Eyebrow>How Nyaama works</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-text">
          From &ldquo;I don&rsquo;t know&rdquo; to &ldquo;I&rsquo;m building
          this.&rdquo;
        </h2>

        <ol className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.n} className="relative">
              {/* Connector, desktop only — the eye follows the sequence */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-11 right-0 top-4 hidden h-px bg-line-strong lg:block"
                />
              )}
              <span className="relative inline-flex h-8 items-center rounded-pill bg-yellow px-3 font-display text-sm text-navy">
                {step.n}
              </span>
              <h3 className="mt-5 font-display text-2xl text-text">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PathGrid({ paths }: { paths: CareerPath[] }) {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-6">
        <Eyebrow>Career paths</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-text">
          Five directions. One of them is yours.
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paths.map((path) => {
            const Icon = pathIcon(path.icon);
            return (
              <div
                key={path.id}
                className="rounded-[20px] border border-line bg-surface p-6 transition-colors hover:bg-surface-2"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-[28%] bg-yellow text-navy">
                  <Icon size={19} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl text-text">
                  {path.name}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">
                  {path.tagline}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-muted">
          You only need one of these. That&rsquo;s the point.
        </p>
      </div>
    </section>
  );
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <section className="border-t border-line bg-surface/30 py-20 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-6">
        <Eyebrow>Real projects</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-text">
          We don&rsquo;t want you to only learn. We want you to build.
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Every path ends in something real — for a business, a school or an
          organisation near you. Work you can point at.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col rounded-[20px] border border-line bg-surface p-6"
            >
              <h3 className="font-display text-xl leading-snug text-text">
                {project.title}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.practices.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-pill border border-line px-3 py-1 text-xs text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LanguageSection() {
  const languages = [
    { label: "Explain simply", active: true },
    { label: "Explain in Wolof", active: false },
    { label: "Explain in Mandinka", active: false },
    { label: "Explain in Fula", active: false },
  ];

  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1120px] items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <Eyebrow>Local learning</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-text">
            Learn in a way that makes sense to you.
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-muted">
            Technology is hard enough without learning it in someone
            else&rsquo;s words. Ask your coach to explain any lesson more
            simply, or in a language you think in.
          </p>
          {/* Honest about what ships. No Listen button until the audio is real. */}
          <p className="mt-5 text-sm text-muted">
            Text explanations in Wolof, Mandinka and Fula. Audio is coming.
          </p>
        </div>

        <div className="rounded-[20px] border border-line bg-surface p-6 sm:p-7" aria-hidden>
          <h3 className="font-display text-2xl text-text">What is an API?</h3>
          <p className="mt-3 leading-relaxed text-muted">
            An API is a way for one program to ask another program for
            something. Think of a restaurant: you tell the waiter what you
            want, and food comes back. You never see the kitchen…
          </p>
          <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-6">
            {languages.map((lang) => (
              <span
                key={lang.label}
                className={
                  lang.active
                    ? "rounded-pill bg-yellow px-3.5 py-1.5 text-xs font-medium text-navy"
                    : "rounded-pill border border-line px-3.5 py-1.5 text-xs text-muted"
                }
              >
                {lang.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1120px] px-6 text-center">
        <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.06] text-text">
          Your future needs a direction.
        </h2>
        <ButtonLink href="/signup" size="lg" className="mt-10">
          Find Your Way
          <ArrowRight size={18} aria-hidden />
        </ButtonLink>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-4 px-6 text-sm text-muted sm:flex-row">
        <p>
          <span className="font-display text-base text-text">nyaama</span> — Find
          Your Way
        </p>
        <p>Built for Hack4Gambia 2026</p>
        <Link
          href="https://github.com/Musbi8788/nyaama"
          className="rounded-lg transition-colors hover:text-text"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
}
