"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { reviewProject } from "@/lib/ai/review";
import { getProjectAccess } from "@/lib/queries/projects";
import { recomputeProgress } from "@/lib/queries/progress";
import { getProfile, logActivity } from "@/lib/queries/user";

/** Only ids the project actually defines, and only booleans. */
function sanitiseChecklist(
  raw: unknown,
  allowed: { id: string }[],
): Record<string, boolean> {
  const clean: Record<string, boolean> = {};
  if (!raw || typeof raw !== "object") return clean;
  for (const { id } of allowed) {
    clean[id] = (raw as Record<string, unknown>)[id] === true;
  }
  return clean;
}

/** Ticking a box saves immediately. Nobody should lose progress to a refresh. */
export async function saveChecklist(projectId: string, raw: unknown) {
  const profile = await getProfile();
  if (!profile) redirect("/login");

  const access = await getProjectAccess(profile, projectId);
  if (!access.ok) return;

  const checklist = sanitiseChecklist(raw, access.project.requirements);
  const supabase = await createClient();

  // Never downgrade a reviewed submission back to in_progress — the learner
  // is allowed to keep ticking boxes after feedback arrives.
  const status =
    access.submission?.status === "submitted" ||
    access.submission?.status === "reviewed"
      ? access.submission.status
      : "in_progress";

  await supabase.from("project_submissions").upsert(
    {
      user_id: profile.id,
      project_id: projectId,
      checklist,
      status,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,project_id" },
  );

  revalidatePath(`/app/project/${projectId}`);
}

const submissionSchema = z.object({
  url: z
    .string()
    .trim()
    .url("That doesn't look like a link. It should start with https://")
    .max(500),
  notes: z.string().trim().max(1000).optional(),
});

export type SubmitState = { error?: string } | undefined;

/**
 * Submits the work and reviews it in the same request.
 *
 * Doing both here means the learner never sees a "pending review" state
 * that might never resolve — by the time the page re-renders, the feedback
 * is already there, whether it came from the model or the rubric.
 */
export async function submitForReview(
  projectId: string,
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const profile = await getProfile();
  if (!profile) redirect("/login");

  const access = await getProjectAccess(profile, projectId);
  if (!access.ok) return { error: "We couldn't load this right now." };

  const parsed = submissionSchema.safeParse({
    url: formData.get("url"),
    notes: formData.get("notes") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { url, notes } = parsed.data;
  const checklist = access.submission?.checklist ?? {};

  const { feedback, source } = await reviewProject(
    access.project,
    checklist,
    url,
    notes ?? null,
  );

  const supabase = await createClient();
  await supabase.from("project_submissions").upsert(
    {
      user_id: profile.id,
      project_id: projectId,
      url,
      notes: notes ?? null,
      checklist,
      status: "reviewed",
      feedback,
      feedback_source: source,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,project_id" },
  );

  await recomputeProgress(profile.id, access.project.path_id);
  await logActivity();

  revalidatePath("/app", "layout");
  return undefined;
}
