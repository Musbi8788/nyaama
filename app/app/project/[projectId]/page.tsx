import { redirect } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Check, ExternalLink } from "lucide-react";
import { Markdown } from "@/lib/content/markdown";
import { getProjectAccess } from "@/lib/queries/projects";
import { getProfile } from "@/lib/queries/user";
import type { ProjectFeedback } from "@/lib/types/database";
import { Checklist } from "./Checklist";
import { SubmissionPanel } from "./SubmissionPanel";

export const metadata = { title: "Your Project" };

const DIFFICULTY: Record<string, string> = {
  starter: "Starter project",
  core: "Core project",
  "real-world": "Real-world project",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const profile = await getProfile();
  if (!profile) redirect("/login");

  const access = await getProjectAccess(profile, projectId);
  if (!access.ok) redirect("/app/roadmap");

  const { project, submission } = access;
  const feedback = submission?.feedback as ProjectFeedback | null;

  return (
    <div className="max-w-[680px]">
      <Link
        href="/app/roadmap"
        className="inline-flex items-center gap-2 rounded-lg text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
      >
        <ArrowLeft size={15} aria-hidden />
        Back to roadmap
      </Link>

      <header className="mt-6 space-y-3">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
          {DIFFICULTY[project.difficulty] ?? "Project"}
        </p>
        <h1 className="font-display text-[clamp(2rem,5vw,2.75rem)] leading-tight text-text">
          {project.title}
        </h1>
      </header>

      <section className="mt-8">
        <h2 className="font-display text-2xl text-text">
          What you&rsquo;re building
        </h2>
        <div className="mt-4">
          <Markdown>{project.brief}</Markdown>
        </div>
      </section>

      <Checklist
        projectId={project.id}
        requirements={project.requirements}
        initial={submission?.checklist ?? {}}
      />

      <section className="mt-12">
        <h2 className="font-display text-2xl text-text">
          What you&rsquo;ll practise
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.practices.map((skill) => (
            <span
              key={skill}
              className="rounded-pill border border-line px-3 py-1.5 text-sm text-muted"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {feedback && <Feedback feedback={feedback} url={submission?.url ?? null} />}

      <SubmissionPanel
        projectId={project.id}
        url={submission?.url ?? null}
        notes={submission?.notes ?? null}
        reviewed={submission?.status === "reviewed"}
      />
    </div>
  );
}

/** Coaching, never a score — no number appears anywhere in this block. */
function Feedback({
  feedback,
  url,
}: {
  feedback: ProjectFeedback;
  url: string | null;
}) {
  return (
    <section className="mt-12 space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-2xl text-text">Your review</h2>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            View what you submitted
            <ExternalLink size={13} aria-hidden />
          </a>
        )}
      </div>

      <div className="rounded-[20px] border border-line bg-surface p-6 sm:p-7">
        <h3 className="font-display text-xl text-text">What you did well</h3>
        <ul className="mt-4 space-y-3">
          {feedback.didWell.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-muted">
              <Check size={17} className="mt-1 shrink-0 text-yellow" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[20px] border border-line bg-surface p-6 sm:p-7">
        <h3 className="font-display text-xl text-text">Improve this</h3>
        <ul className="mt-4 space-y-3">
          {feedback.improve.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-muted">
              <AlertCircle
                size={17}
                className="mt-1 shrink-0 text-muted"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {feedback.skillsDemonstrated.length > 0 && (
        <div className="rounded-[20px] border border-line bg-surface p-6 sm:p-7">
          <h3 className="font-display text-xl text-text">Skills demonstrated</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {feedback.skillsDemonstrated.map((skill) => (
              <span
                key={skill}
                className="rounded-pill bg-yellow px-3 py-1.5 text-sm font-medium text-navy"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
