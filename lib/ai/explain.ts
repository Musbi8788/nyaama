import "server-only";
import { createClient } from "@/lib/supabase/server";
import { translateBody } from "@/lib/ai/translate";
import type { LanguageOption } from "@/lib/data/languages";
import type { LearningModule } from "@/lib/types/database";

export type Explanation = {
  content: string;
  /** Where it came from — drives whether we show the AI-assisted note. */
  source: "authored" | "cache" | "ai";
};

/**
 * "Explain simply" is not an AI feature.
 *
 * Every module ships a hand-written simple_body, so the button is instant,
 * free, and works with the network off. That matters more than it sounds:
 * simplification is the control a struggling learner reaches for first, and
 * it is the one that must never spin.
 *
 * Translation genuinely needs the model, so it is the only path that can
 * fail — and when it does, the caller keeps the learner on English rather
 * than showing them nothing. Running scripts/prewarm.mts before a demo
 * turns that path into a cache read too.
 */
export async function explain(
  module: LearningModule,
  option: LanguageOption,
): Promise<Explanation | null> {
  if (option.mode === "simple") {
    return { content: module.simple_body, source: "authored" };
  }

  const supabase = await createClient();

  const { data: cached } = await supabase
    .from("explanation_cache")
    .select("content")
    .eq("module_id", module.id)
    .eq("mode", option.mode)
    .eq("lang", option.lang)
    .maybeSingle();

  if (cached?.content) return { content: cached.content, source: "cache" };

  const content = await translateBody(module, option);
  if (!content) return null;

  // Cache on the way out. A duplicate row is possible if two learners ask at
  // the same instant, so let the unique constraint settle it and ignore the
  // loser — a failed cache write must never fail the request.
  await supabase
    .from("explanation_cache")
    .upsert(
      { module_id: module.id, mode: option.mode, lang: option.lang, content },
      { onConflict: "module_id,mode,lang", ignoreDuplicates: true },
    );

  return { content, source: "ai" };
}
