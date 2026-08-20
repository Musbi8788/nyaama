import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Check, Clock, Lock } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { getProfile, getCurrentPath } from "@/lib/queries/user";
import {
  buildStages,
  getPathModules,
  type StageStatus,
  type StageLesson,
  type StageView,
} from "@/lib/queries/progress";
import type { ModuleProgress } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";

export const metadata = { title: "My Roadmap" };

export default async function RoadmapPage() {
  const profile = await getProfile();
  if (!profile) redirect("/login");

  const path = await getCurrentPath(profile.current_path);
  if (!path) return <EmptyRoadmap />;

  const supabase = await createClient();
  const [modules, { data: progressRows }] = await Promise.all([
    getPathModules(path.id),
    supabase.from("module_progress").select("*").eq("user_id", profile.id),
  ]);

  const stages = buildStages(
    path,
    modules,
    (progressRows ?? []) as ModuleProgress[],
  );

  return (
    <div className="max-w-3xl space-y-10">
      <header className="space-y-2">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
          {path.name}
        </p>
        <h1 className="font-display text-4xl text-text">My Roadmap</h1>
        <p className="max-w-xl leading-relaxed text-muted">
          {path.description}
        </p>
      </header>

      <ol className="relative space-y-4">
        {stages.map((stage, i) => (
          <StageCard key={stage.n} stage={stage} isLast={i === stages.length - 1} />
        ))}
      </ol>
    </div>
  );
}

const STATUS_LABEL: Record<StageStatus, string> = {
  completed: "Completed",
  in_progress: "In progress",
  available: "Ready to start",
  locked: "Coming next",
};

function StageCard({ stage, isLast }: { stage: StageView; isLast: boolean }) {
  const done = stage.status === "completed";
  const locked = stage.status === "locked";
  const open = !locked;

  return (
    <li className="relative pl-12">
      {/* The rail: solid yellow through what's finished, faint beyond it. */}
      {!isLast && (
        <span
          aria-hidden
          className={cn(
            "absolute left-[15px] top-9 h-full w-px",
            done ? "bg-yellow" : "bg-white/10",
          )}
        />
      )}

      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-4 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium",
          done && "border-transparent bg-yellow text-navy",
          !done && open && "border-yellow/50 bg-navy text-yellow",
          locked && "border-line bg-navy text-muted",
        )}
      >
        {done ? <Check size={15} strokeWidth={2.5} /> : locked ? <Lock size={13} /> : stage.n}
      </span>

      <div
        className={cn(
          "rounded-[20px] border p-6",
          locked ? "border-line bg-surface/40" : "border-line bg-surface",
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Stage {String(stage.n).padStart(2, "0")}
          </p>
          <span
            className={cn(
              "rounded-pill px-3 py-1 text-xs",
              done && "bg-yellow/15 text-yellow",
              stage.status === "in_progress" && "bg-white/[0.06] text-text",
              stage.status === "available" && "bg-white/[0.06] text-muted",
              locked && "text-muted",
            )}
          >
            {STATUS_LABEL[stage.status]}
          </span>
        </div>

        <h2
          className={cn(
            "mt-2 font-display text-2xl",
            locked ? "text-text/60" : "text-text",
          )}
        >
          {stage.title}
        </h2>
        <p className="mt-2 leading-relaxed text-muted">{stage.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {stage.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-pill border border-line px-3 py-1 text-xs text-muted"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} aria-hidden />
            {stage.effort}
          </span>
          {stage.totalCount > 0 && (
            <span>
              {stage.completedCount} of {stage.totalCount} lesson
              {stage.totalCount === 1 ? "" : "s"} done
            </span>
          )}
        </div>

        {/* The lessons themselves. A count alone tells a learner how much is
            left but never what it is, so half the curriculum — every
            cross-cutting Core Skill — was invisible until they had clicked
            through to it. Locked stages still list their titles: seeing what
            is coming is the reason to finish the stage you are on. */}
        {stage.lessons.length > 0 && (
          <ul className="mt-5 border-t border-line pt-2">
            {stage.lessons.map((lesson) => (
              <li key={lesson.id}>
                <LessonRow lesson={lesson} locked={locked} />
              </li>
            ))}
          </ul>
        )}

        {open && stage.nextModuleId && (
          <ButtonLink
            href={`/app/learn/${stage.nextModuleId}`}
            variant={stage.status === "available" || stage.status === "in_progress" ? "primary" : "secondary"}
            className="mt-6"
          >
            {stage.completedCount > 0 ? "Continue" : "Start"}
            <ArrowRight size={16} aria-hidden />
          </ButtonLink>
        )}

        {/* Stages we have not written lessons for say so, rather than
            offering a button that goes nowhere. */}
        {open && stage.totalCount === 0 && (
          <p className="mt-6 text-sm text-muted">
            Lessons for this stage are being written.
          </p>
        )}
      </div>
    </li>
  );
}

/**
 * One lesson in a stage. A link when the learner can open it, plain text when
 * the stage is still locked — an unlocked-looking link into a locked lesson
 * would only send them to a wall.
 */
function LessonRow({
  lesson,
  locked,
}: {
  lesson: StageLesson;
  locked: boolean;
}) {
  const body = (
    <>
      <span
        aria-hidden
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
          lesson.completed
            ? "border-transparent bg-yellow text-navy"
            : "border-line-strong",
        )}
      >
        {lesson.completed && <Check size={12} strokeWidth={3} />}
      </span>

      <span
        className={cn(
          "min-w-0 flex-1 truncate",
          locked ? "text-muted" : "text-text",
        )}
      >
        {lesson.title}
      </span>

      {lesson.core && (
        <span className="hidden shrink-0 rounded-pill border border-yellow/30 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-yellow sm:inline">
          Core skill
        </span>
      )}

      <span className="shrink-0 text-xs text-muted">{lesson.minutes} min</span>
    </>
  );

  const className =
    "flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-sm";

  if (locked) {
    return (
      <span className={className}>
        {body}
        <span className="sr-only">— locked until you finish the stages before it</span>
      </span>
    );
  }

  return (
    <Link
      href={`/app/learn/${lesson.id}`}
      className={cn(
        className,
        "transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow",
      )}
    >
      {body}
    </Link>
  );
}

function EmptyRoadmap() {
  return (
    <div className="max-w-lg space-y-6 py-12">
      <h1 className="font-display text-4xl text-text">Your path starts here.</h1>
      <p className="leading-relaxed text-muted">
        Complete your discovery interview and we&rsquo;ll build a roadmap
        around the direction that fits you.
      </p>
      <ButtonLink href="/app/discover" size="lg">
        Start Discovery
        <ArrowRight size={18} aria-hidden />
      </ButtonLink>
    </div>
  );
}
