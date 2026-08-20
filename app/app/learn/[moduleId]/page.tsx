import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { getModuleAccess } from "@/lib/queries/modules";
import { getProfile } from "@/lib/queries/user";
import { Reader } from "./Reader";

export const metadata = { title: "Lesson" };

export default async function LearnPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;

  const profile = await getProfile();
  if (!profile) redirect("/login");

  const access = await getModuleAccess(profile, moduleId);

  // Locked, missing, or from another path — all of them mean "this is not
  // your next step", and the roadmap is where the next step lives.
  if (!access.ok) redirect("/app/roadmap");

  const { module: lesson, path, completed, next } = access;

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
          {path.name} · Stage {String(lesson.stage).padStart(2, "0")}
        </p>
        <h1 className="font-display text-[clamp(2rem,5vw,2.75rem)] leading-tight text-text">
          {lesson.title}
        </h1>
        <p className="leading-relaxed text-muted">{lesson.summary}</p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} aria-hidden />
            {lesson.minutes} min
          </span>
          {lesson.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-pill border border-line px-3 py-1 text-xs text-muted"
            >
              {skill}
            </span>
          ))}
        </div>
      </header>

      <Reader
        moduleId={lesson.id}
        body={lesson.body}
        practice={lesson.practice}
        completed={completed}
        nextLabel={
          next?.kind === "module" ? next.title : "Your project"
        }
      />
    </div>
  );
}
