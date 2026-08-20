"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getModuleAccess } from "@/lib/queries/modules";
import { recomputeProgress } from "@/lib/queries/progress";
import { getProfile, logActivity } from "@/lib/queries/user";

/**
 * Marks a lesson finished, then moves the learner on.
 *
 * The access check runs again here. A server action is a public endpoint
 * wearing a friendly name, and completing a locked lesson would unlock the
 * stage after it.
 */
export async function markComplete(moduleId: string) {
  const profile = await getProfile();
  if (!profile) redirect("/login");

  const access = await getModuleAccess(profile, moduleId);
  if (!access.ok) redirect("/app/roadmap");

  const supabase = await createClient();

  await supabase.from("module_progress").upsert(
    {
      user_id: profile.id,
      module_id: moduleId,
      status: "completed",
      percentage: 100,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_id" },
  );

  await recomputeProgress(profile.id, access.module.path_id);
  await logActivity();

  revalidatePath("/app", "layout");

  // Straight into the next lesson keeps the momentum. When the modules run
  // out, the project is the point of the whole path.
  if (access.next?.kind === "module") redirect(`/app/learn/${access.next.id}`);
  redirect("/app/roadmap");
}
