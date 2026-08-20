import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Discover Your Skills" };

export default function DiscoverPage() {
  return (
    <div className="max-w-2xl space-y-10">
      <header className="space-y-3">
        <h1 className="font-display text-4xl text-text">Discover Your Skills</h1>
        <p className="text-lg text-muted">Let&rsquo;s figure out where you could go.</p>
      </header>

      <section className="rounded-[20px] border border-line bg-surface p-7">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-[28%] bg-yellow text-navy">
          <MessageCircle size={20} strokeWidth={1.75} aria-hidden />
        </span>

        <h2 className="mt-5 font-display text-2xl text-text">
          Meet your Career Coach
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          I&rsquo;ll ask you a few questions about what you enjoy, what
          you&rsquo;ve tried, and what you want to achieve. There are no wrong
          answers, and starting from zero is completely fine.
        </p>

        {/* Saying "six" and "two minutes" up front is what makes people finish. */}
        <ul className="mt-6 space-y-2 text-sm text-muted">
          <li>· Six short questions</li>
          <li>· About two minutes</li>
          <li>· One clear direction at the end</li>
        </ul>

        <ButtonLink href="/app/discover/session" size="lg" className="mt-8">
          Start Conversation
          <ArrowRight size={18} aria-hidden />
        </ButtonLink>
      </section>
    </div>
  );
}
