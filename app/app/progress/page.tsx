import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Clock, FileText } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { getPathModules, skillBreakdown } from "@/lib/queries/progress";
import { getCurrentPath, getProfile } from "@/lib/queries/user";
import type {
  ModuleProgress,
  Project,
  ProjectSubmission,
} from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";

export const metadata = { title: "Your Progress" };

export default async function ProgressPage() {
  const profile = await getProfile();
  if (!profile) redirect("/login");

  const path = await getCurrentPath(profile.current_path);
  if (!path) return <EmptyProgress />;

  const supabase = await createClient();
  const [modules, { data: moduleRows }, { data: projectRows }, { data: submissionRows }, { data: progressRow }] =
    await Promise.all([
      getPathModules(path.id),
      supabase.from("module_progress").select("*").eq("user_id", profile.id),
      supabase.from("projects").select("*").eq("path_id", path.id),
      supabase.from("project_submissions").select("*").eq("user_id", profile.id),
      supabase
        .from("progress")
        .select("percentage")
        .eq("user_id", profile.id)
        .eq("path_id", path.id)
        .maybeSingle(),
    ]);

  const moduleProgress = (moduleRows ?? []) as ModuleProgress[];
  const projects = (projectRows ?? []) as Project[];
  const submissions = (submissionRows ?? []) as ProjectSubmission[];

  const percentage = progressRow?.percentage ?? 0;
  const skills = skillBreakdown(path, modules, moduleProgress);
  const lessonsDone = moduleProgress.filter(
    (p) => p.status === "completed" && modules.some((m) => m.id === p.module_id),
  ).length;

  return (
    <div className="max-w-3xl space-y-14">
      <header className="space-y-2">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
          {path.name}
        </p>
        <h1 className="font-display text-4xl text-text">Your Progress</h1>
      </header>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="text-muted">Overall</p>
          <p className="font-display text-5xl leading-none text-text">
            {percentage}
            <span className="text-2xl text-muted">%</span>
          </p>
        </div>

        <Bar value={percentage} className="mt-4 h-3" />

        <p className="mt-4 text-sm text-muted">
          {lessonsDone} of {modules.length} lesson
          {modules.length === 1 ? "" : "s"} finished. Lessons count for 70%,
          projects for the other 30% — because building it is most of the
          proof.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-text">Skills</h2>
        {skills.length === 0 ? (
          <p className="mt-4 text-muted">
            Your skills will appear here as you work through the roadmap.
          </p>
        ) : (
          <ul className="mt-6 space-y-5">
            {skills.map((skill) => (
              <li key={skill.skill}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-text">{skill.skill}</span>
                  <span className="text-sm text-muted">{skill.percentage}%</span>
                </div>
                <Bar value={skill.percentage} className="mt-2 h-2" />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-display text-2xl text-text">Projects</h2>
        {projects.length === 0 ? (
          <p className="mt-4 text-muted">Your first project is waiting.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                submission={submissions.find((s) => s.project_id === project.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Named as the thing it is not yet. The whole product argues for real
          proof, so a fake wall of logos here would undercut it. */}
      <section className="rounded-[20px] border border-dashed border-line-strong p-6 sm:p-7">
        <h2 className="font-display text-2xl text-text">Real-world proof</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Soon: the businesses and organisations you&rsquo;ve built for.
        </p>
      </section>
    </div>
  );
}

function Bar({ value, className }: { value: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("w-full overflow-hidden rounded-pill bg-white/[0.06]", className)}
    >
      {/* Width animates from wherever the browser painted it, so the bar
          grows on load rather than snapping into place. */}
      <div
        className="h-full rounded-pill bg-yellow transition-[width] duration-700 ease-out motion-reduce:transition-none"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

const PROJECT_STATUS: Record<
  ProjectSubmission["status"],
  { label: string; tone: string }
> = {
  not_started: { label: "Not started", tone: "text-muted" },
  in_progress: { label: "In progress", tone: "text-text" },
  submitted: { label: "Submitted", tone: "text-text" },
  reviewed: { label: "Reviewed", tone: "text-yellow" },
};

function ProjectCard({
  project,
  submission,
}: {
  project: Project;
  submission?: ProjectSubmission;
}) {
  const status = submission?.status ?? "not_started";
  const { label, tone } = PROJECT_STATUS[status];
  const ticked = submission
    ? project.requirements.filter((r) => submission.checklist?.[r.id]).length
    : 0;

  return (
    <Link
      href={`/app/project/${project.id}`}
      className="block rounded-[20px] border border-line bg-surface p-6 transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl leading-snug text-text">
          {project.title}
        </h3>
        <span className={cn("inline-flex items-center gap-1.5 text-xs", tone)}>
          {status === "reviewed" ? (
            <Check size={13} aria-hidden />
          ) : status === "not_started" ? (
            <FileText size={13} aria-hidden />
          ) : (
            <Clock size={13} aria-hidden />
          )}
          {label}
        </span>
      </div>

      <p className="mt-3 text-sm text-muted">
        {ticked} of {project.requirements.length} requirements ticked
      </p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
        {status === "not_started" ? "Open the brief" : "Open your project"}
        <ArrowRight size={14} aria-hidden />
      </span>
    </Link>
  );
}

function EmptyProgress() {
  return (
    <div className="max-w-lg space-y-6 py-12">
      <h1 className="font-display text-4xl text-text">
        Start building to see your progress.
      </h1>
      <p className="leading-relaxed text-muted">
        Once you have a path, this page tracks every lesson you finish and
        every project you ship.
      </p>
      <ButtonLink href="/app/discover" size="lg">
        Start Discovery
        <ArrowRight size={18} aria-hidden />
      </ButtonLink>
    </div>
  );
}
