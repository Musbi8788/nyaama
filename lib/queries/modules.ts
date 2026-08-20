import "server-only";
import { createClient } from "@/lib/supabase/server";
import { buildStages, getPathModules } from "@/lib/queries/progress";
import { getPathProject } from "@/lib/queries/projects";
import type {
  CareerPath,
  LearningModule,
  ModuleProgress,
  Profile,
} from "@/lib/types/database";

/** Where "Mark as complete" sends them next. */
export type NextStep =
  | { kind: "module"; id: string; title: string }
  | { kind: "project"; id: string; title: string };

export type ModuleAccess =
  | { ok: false; reason: "not_found" | "wrong_path" | "locked" }
  | {
      ok: true;
      module: LearningModule;
      path: CareerPath;
      completed: boolean;
      next: NextStep | null;
    };

/**
 * Resolves a lesson for a learner, and decides whether they may read it.
 *
 * The roadmap already hides locked stages, but hiding a link is not access
 * control — the URL is guessable and a learner who lands on stage 4 before
 * stage 1 gets a bad first experience of the product. The check lives here
 * so every entry point inherits it.
 */
export async function getModuleAccess(
  profile: Profile,
  moduleId: string,
): Promise<ModuleAccess> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("learning_modules")
    .select("*")
    .eq("id", moduleId)
    .maybeSingle();

  // Not named `module`: that identifier is reserved in this scope.
  const lesson = data as LearningModule | null;
  if (!lesson) return { ok: false, reason: "not_found" };

  // A lesson from a path they are not on is not theirs to read yet. Sending
  // them to their own roadmap beats a 404 they cannot act on.
  if (!profile.current_path || lesson.path_id !== profile.current_path) {
    return { ok: false, reason: "wrong_path" };
  }

  const [{ data: pathData }, modules, { data: progressRows }] = await Promise.all([
    supabase.from("career_paths").select("*").eq("id", lesson.path_id).maybeSingle(),
    getPathModules(lesson.path_id),
    supabase.from("module_progress").select("*").eq("user_id", profile.id),
  ]);

  const path = pathData as CareerPath | null;
  if (!path) return { ok: false, reason: "not_found" };

  const moduleProgress = (progressRows ?? []) as ModuleProgress[];
  const stages = buildStages(path, modules, moduleProgress);
  const stage = stages.find((s) => s.n === lesson.stage);

  if (stage?.status === "locked") return { ok: false, reason: "locked" };

  const completed = moduleProgress.some(
    (p) => p.module_id === lesson.id && p.status === "completed",
  );

  // Modules arrive ordered by stage then sort, so "next" is simply the one
  // after this. Running out of modules means the path's project is next.
  const here = modules.findIndex((m) => m.id === lesson.id);
  const following = here >= 0 ? modules[here + 1] : undefined;

  let next: NextStep | null;
  if (following) {
    next = { kind: "module", id: following.id, title: following.title };
  } else {
    // Last lesson on the path: the project is what everything was for.
    const project = await getPathProject(lesson.path_id);
    next = project ? { kind: "project", id: project.id, title: project.title } : null;
  }

  return { ok: true, module: lesson, path, completed, next };
}
