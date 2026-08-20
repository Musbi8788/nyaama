import "server-only";
import { createClient } from "@/lib/supabase/server";
import type {
  CareerPath,
  LearningModule,
  ModuleProgress,
  ProjectSubmission,
  RoadmapStage,
} from "@/lib/types/database";

export type StageStatus = "completed" | "in_progress" | "available" | "locked";

export type StageView = RoadmapStage & {
  status: StageStatus;
  completedCount: number;
  totalCount: number;
  nextModuleId: string | null;
};

export async function getPathModules(
  pathId: string,
): Promise<LearningModule[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("learning_modules")
    .select("*")
    .eq("path_id", pathId)
    .order("stage")
    .order("sort");
  return (data ?? []) as LearningModule[];
}

/**
 * Stage status, resolved against what the learner has actually completed.
 *
 * Stage 1 is always open. A later stage unlocks once every stage before it
 * is done — except that stages carrying no modules yet never block the ones
 * after them, since a learner cannot complete something we have not written.
 */
export function buildStages(
  path: CareerPath,
  modules: LearningModule[],
  moduleProgress: ModuleProgress[],
): StageView[] {
  const completed = new Set(
    moduleProgress.filter((p) => p.status === "completed").map((p) => p.module_id),
  );

  let previousStagesDone = true;

  return path.stages.map((stage) => {
    const stageModules = modules.filter((m) => m.stage === stage.n);
    const totalCount = stageModules.length;
    const completedCount = stageModules.filter((m) => completed.has(m.id)).length;
    const allDone = totalCount > 0 && completedCount === totalCount;

    let status: StageStatus;
    if (allDone) status = "completed";
    else if (stage.n === 1 || previousStagesDone)
      status = completedCount > 0 ? "in_progress" : "available";
    else status = "locked";

    if (totalCount > 0 && !allDone) previousStagesDone = false;

    return {
      ...stage,
      status,
      completedCount,
      totalCount,
      // Null while locked. A locked stage has no "next lesson" in any
      // meaningful sense, and exposing one invites a caller to link into
      // content the learner has not unlocked.
      nextModuleId:
        status === "locked"
          ? null
          : (stageModules.find((m) => !completed.has(m.id))?.id ?? null),
    };
  });
}

/**
 * Overall progress: modules carry 70%, finished projects the other 30%.
 * Learning matters, but proving it matters nearly as much — which is the
 * whole argument of the product.
 */
export async function recomputeProgress(userId: string, pathId: string) {
  const supabase = await createClient();

  const [{ data: modules }, { data: moduleProgress }, { data: projects }, { data: submissions }] =
    await Promise.all([
      supabase.from("learning_modules").select("id").eq("path_id", pathId),
      supabase.from("module_progress").select("module_id, status").eq("user_id", userId),
      supabase.from("projects").select("id").eq("path_id", pathId),
      supabase.from("project_submissions").select("project_id, status").eq("user_id", userId),
    ]);

  const moduleIds = new Set((modules ?? []).map((m) => m.id));
  const projectIds = new Set((projects ?? []).map((p) => p.id));

  const doneModules = (moduleProgress ?? []).filter(
    (p) => p.status === "completed" && moduleIds.has(p.module_id),
  ).length;

  const doneProjects = ((submissions ?? []) as Pick<ProjectSubmission, "project_id" | "status">[])
    .filter(
      (s) =>
        projectIds.has(s.project_id) &&
        (s.status === "submitted" || s.status === "reviewed"),
    ).length;

  const modulePart = moduleIds.size ? (doneModules / moduleIds.size) * 70 : 0;
  const projectPart = projectIds.size ? (doneProjects / projectIds.size) * 30 : 0;
  const percentage = Math.round(modulePart + projectPart);

  await supabase.from("progress").upsert(
    {
      user_id: userId,
      path_id: pathId,
      percentage,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,path_id" },
  );

  return percentage;
}

/** Per-skill completion, for the progress page bars. */
export function skillBreakdown(
  path: CareerPath,
  modules: LearningModule[],
  moduleProgress: ModuleProgress[],
): { skill: string; percentage: number }[] {
  const completed = new Set(
    moduleProgress.filter((p) => p.status === "completed").map((p) => p.module_id),
  );

  return path.skills
    .map((skill) => {
      const carrying = modules.filter((m) => m.skills.includes(skill));
      if (carrying.length === 0) return { skill, percentage: 0 };
      const done = carrying.filter((m) => completed.has(m.id)).length;
      return {
        skill,
        percentage: Math.round((done / carrying.length) * 100),
      };
    })
    .sort((a, b) => b.percentage - a.percentage);
}
