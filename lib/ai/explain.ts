import "server-only";
import { MODELS, text } from "@/lib/ai/client";
import { createClient } from "@/lib/supabase/server";
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
 * than showing them nothing.
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

  const written = await text({
    model: MODELS.strong,
    timeoutMs: 20_000,
    maxTokens: 900,
    temperature: 0.3,
    system: [
      `You translate beginner technology lessons into ${option.language}, for young people in The Gambia.`,
      "Rules:",
      `- Write the whole explanation in ${option.language}. Do not include an English version.`,
      "- Keep technical terms (API, HTML, JavaScript, browser, server) in English. Learners must recognise them in the tools they will use. Explain each one in the local language the first time it appears.",
      "- Keep the everyday comparisons from the original. They are what make the lesson land.",
      "- Keep the markdown structure: paragraphs, **bold**, `code`, and ``` fences unchanged.",
      "- Do not add a title or any heading. Start with the first paragraph.",
      "- Never add commentary about the translation itself.",
    ].join("\n"),
    user: `Lesson title: ${module.title}\n\n${module.simple_body}`,
  });

  if (!written) return null;

  const content = stripLeadingHeading(written);

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

/**
 * Drops a heading the model added at the top.
 *
 * Asked for a translation, gpt-4o sometimes opens with the lesson title —
 * occasionally still in English. The page already renders the title above
 * the body, so that reads as a duplicate. The authored bodies contain no
 * headings at all, which is what makes this safe: a leading heading is
 * always the model's invention, never the author's.
 */
function stripLeadingHeading(body: string): string {
  return body.replace(/^\s*#{1,6}[^\n]*\n+/, "").trim();
}
