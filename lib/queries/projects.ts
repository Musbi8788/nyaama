import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Profile, Project, ProjectSubmission } from "@/lib/types/database";

export type ProjectAccess =
  | { ok: false; reason: "not_found" | "wrong_path" }
  | { ok: true; project: Project; submission: ProjectSubmission | null };

/** The project belonging to a learner's current path, if there is one. */
export async function getPathProject(pathId: string | null): Promise<Project | null> {
  if (!pathId) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("path_id", pathId)
    .limit(1)
    .maybeSingle();
  return data as Project | null;
}

/**
 * A project is readable only by learners on its path. Unlike lessons there
 * are no stages to unlock — seeing what you are working towards is the
 * point, so the brief is open from day one.
 */
export async function getProjectAccess(
  profile: Profile,
  projectId: string,
): Promise<ProjectAccess> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .maybeSingle();

  const project = data as Project | null;
  if (!project) return { ok: false, reason: "not_found" };

  if (!profile.current_path || project.path_id !== profile.current_path) {
    return { ok: false, reason: "wrong_path" };
  }

  const { data: submission } = await supabase
    .from("project_submissions")
    .select("*")
    .eq("user_id", profile.id)
    .eq("project_id", projectId)
    .maybeSingle();

  return { ok: true, project, submission: (submission as ProjectSubmission) ?? null };
}
