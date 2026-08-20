import { MODELS, text } from "@/lib/ai/client";
import type { LanguageOption } from "@/lib/data/languages";
import type { LearningModule } from "@/lib/types/database";

/**
 * Produces a translated lesson body. No database, no caching.
 *
 * Split out from explain() so the pre-warm script can call the exact
 * prompt the app uses. A pre-warmed cache written by a second, drifting
 * copy of this prompt would be worse than no pre-warming at all: it would
 * serve learners text the app never would have produced, and we would only
 * notice by reading every row.
 *
 * Note the absence of "server-only" here. This module touches no request
 * state and no secrets beyond the OpenAI key the client already reads, and
 * the pre-warm script runs outside Next entirely.
 */
export async function translateBody(
  module: Pick<LearningModule, "title" | "simple_body">,
  option: LanguageOption,
): Promise<string | null> {
  // Two attempts, because degeneration is a dice roll rather than a
  // permanent failure — the same lesson and language often comes back
  // clean the second time.
  for (let attempt = 0; attempt < 2; attempt++) {
    const candidate = await attemptTranslation(module, option);
    if (candidate && !looksDegenerate(candidate)) return candidate;
    if (candidate) {
      console.error(
        `[ai] ${option.language} translation of ${module.title} degenerated${attempt === 0 ? ", retrying" : ", giving up"}`,
      );
    }
  }
  return null;
}

async function attemptTranslation(
  module: Pick<LearningModule, "title" | "simple_body">,
  option: LanguageOption,
): Promise<string | null> {
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

  return written ? stripLeadingHeading(written) : null;
}

/**
 * Catches the model looping instead of translating.
 *
 * Wolof, Mandinka and Fula are low-resource languages, and on them gpt-4o
 * sometimes falls into repetition — one pre-warm run produced a Mandinka
 * "translation" that was the word "laŋo" twenty-five times, and a Fula one
 * that repeated a single sentence to fill the response.
 *
 * Thresholds are calibrated against real output rather than guessed. Across
 * eighteen cached translations the healthy ones ranged from 0.38 to 0.76
 * unique words per word, and every degenerate one sat at 0.13 or below, so
 * 0.25 separates them with room on both sides.
 *
 * A learner who cannot read the source language has no way to tell this
 * from a real translation, which is exactly why the check cannot be left
 * to them.
 */
export function looksDegenerate(body: string): boolean {
  const words = body
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);

  // Too short to judge. A two-line answer legitimately repeats words.
  if (words.length < 40) return false;

  const counts = new Map<string, number>();
  let longestRun = 1;
  let run = 1;

  for (const [i, word] of words.entries()) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
    if (i > 0 && word === words[i - 1]) {
      run++;
      longestRun = Math.max(longestRun, run);
    } else {
      run = 1;
    }
  }

  const variety = counts.size / words.length;
  const commonest = Math.max(...counts.values()) / words.length;

  return variety < 0.25 || commonest > 0.2 || longestRun >= 5;
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
export function stripLeadingHeading(body: string): string {
  return body.replace(/^\s*#{1,6}[^\n]*\n+/, "").trim();
}
