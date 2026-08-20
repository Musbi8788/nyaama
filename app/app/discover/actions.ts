"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { recommendCareer } from "@/lib/ai/recommend";
import { scoreAnswers } from "@/lib/data/scoring";
import { SLOTS, type Answers } from "@/lib/data/interview";
import { logActivity } from "@/lib/queries/user";

/** Rejects anything not in the fixed slot/option vocabulary. */
function sanitise(raw: unknown): Answers {
  const answers: Answers = {};
  if (!raw || typeof raw !== "object") return answers;

  for (const slot of SLOTS) {
    const entry = (raw as Record<string, unknown>)[slot.id];
    if (!entry || typeof entry !== "object") continue;

    const { options, text } = entry as { options?: unknown; text?: unknown };
    const valid = Array.isArray(options)
      ? options.filter(
          (id): id is string =>
            typeof id === "string" && slot.options.some((o) => o.id === id),
        )
      : [];

    answers[slot.id] = {
      options: slot.type === "single" ? valid.slice(0, 1) : valid,
      text: typeof text === "string" ? text.slice(0, 400).trim() : undefined,
    };
  }

  return answers;
}

/**
 * Finishes the interview: scores the answers, asks the AI for a
 * recommendation (falling back to the deterministic scorer), then writes
 * the assessment, the chosen path and the progress row.
 */
export async function completeInterview(rawAnswers: unknown) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const answers = sanitise(rawAnswers);
  const result = await recommendCareer(answers);

  await supabase.from("career_assessments").insert({
    user_id: user.id,
    answers,
    scores: scoreAnswers(answers),
    recommendation: result.recommendation,
    confidence: result.confidence,
    reasons: result.reasons,
    alternatives: result.alternatives,
    source: result.source,
    completed: true,
  });

  await supabase
    .from("profiles")
    .update({ current_path: result.recommendation, onboarded: true })
    .eq("id", user.id);

  // Upsert so retaking discovery does not violate the unique constraint.
  await supabase
    .from("progress")
    .upsert(
      {
        user_id: user.id,
        path_id: result.recommendation,
        current_stage: 1,
        percentage: 0,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,path_id" },
    );

  await logActivity();

  revalidatePath("/app", "layout");
  redirect("/app/discover/result");
}
