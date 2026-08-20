import "server-only";
import { z } from "zod";
import { MODELS, structured, text } from "./client";
import {
  PATH_IDS,
  PATH_NAMES,
  confidenceFrom,
  deterministicRecommendation,
  scoreAnswers,
  summariseAnswers,
  type Recommendation,
} from "@/lib/data/scoring";
import { SLOTS, type Answers } from "@/lib/data/interview";
import type { PathId } from "@/lib/types/database";

const RecommendationSchema = z.object({
  recommendation: z.enum([
    "software_engineering",
    "artificial_intelligence",
    "data_analytics",
    "cybersecurity",
    "graphic_design",
  ]),
  confidence: z.number().min(0).max(1),
  reasons: z.array(z.string().min(8)).min(3).max(4),
  alternatives: z.array(
    z.enum([
      "software_engineering",
      "artificial_intelligence",
      "data_analytics",
      "cybersecurity",
      "graphic_design",
    ]),
  ).length(2),
});

const jsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["recommendation", "confidence", "reasons", "alternatives"],
  properties: {
    recommendation: { type: "string", enum: PATH_IDS },
    confidence: { type: "number" },
    reasons: {
      type: "array",
      items: { type: "string" },
      description:
        "Three or four reasons, each addressed to the learner as 'You…', quoting what they actually said.",
    },
    alternatives: {
      type: "array",
      items: { type: "string", enum: PATH_IDS },
      description: "Exactly two other paths, neither equal to the recommendation.",
    },
  },
};

const SYSTEM = `You are the career coach inside Nyaama, a platform helping young people in The Gambia find a technology career direction.

You are given a learner's answers and a weighted score for each of five career paths, computed from those answers.

Your job is to choose ONE primary path and explain why, in the learner's own terms.

Rules:
- Choose only from the five given path ids. Never invent a career.
- Strongly prefer the highest-scoring path. Only choose a different one if the learner's free-text answers clearly contradict the scores, and never choose a path scoring below the top one by more than 4 points.
- Each reason must start with "You" and refer to something the learner actually said. Never invent experience they did not claim.
- Keep each reason under 15 words. Plain English, no jargon, no flattery.
- Alternatives must be the next two strongest paths, and must not include the recommendation.
- Confidence between 0.55 and 0.92. Be honest: a learner who answered vaguely gets a lower number.`;

export async function recommendCareer(answers: Answers): Promise<Recommendation> {
  const scores = scoreAnswers(answers);
  const fallback = deterministicRecommendation(answers);

  const scoreLines = PATH_IDS.map(
    (p) => `  ${PATH_NAMES[p]} (${p}): ${scores[p]}`,
  ).join("\n");

  const result = await structured({
    model: MODELS.strong,
    system: SYSTEM,
    schemaName: "career_recommendation",
    schema: RecommendationSchema,
    jsonSchema,
    timeoutMs: 12_000,
    temperature: 0.4,
    user: `The learner's answers:\n\n${summariseAnswers(answers)}\n\nComputed scores:\n${scoreLines}\n\nHighest scoring path: ${fallback.recommendation}`,
  });

  if (!result) return fallback;

  // Guard against the model returning the recommendation inside its own
  // alternatives, which strict schemas do not prevent.
  const alternatives = result.alternatives.filter(
    (a) => a !== result.recommendation,
  );
  while (alternatives.length < 2) {
    const next = fallback.alternatives.find(
      (a) => a !== result.recommendation && !alternatives.includes(a),
    );
    if (!next) break;
    alternatives.push(next);
  }

  return {
    recommendation: result.recommendation as PathId,
    // Computed, not taken from the model. Confidence is a property of how
    // decisive the answers were, and the model reliably overstates it.
    confidence: Number(
      confidenceFrom(scores, result.recommendation as PathId).toFixed(2),
    ),
    reasons: result.reasons,
    alternatives: alternatives.slice(0, 2) as PathId[],
    source: "ai",
  };
}

/**
 * A one-line lead-in for the next question, personalised to the last answer.
 * Purely decorative: the static line in SLOTS is used whenever this fails,
 * which is why the interview works with the network disconnected.
 */
export async function coachLine(
  slotIndex: number,
  answers: Answers,
): Promise<string> {
  const slot = SLOTS[slotIndex];
  if (!slot) return "";
  if (slotIndex === 0) return slot.coachLine;

  const previous = SLOTS[slotIndex - 1];
  const answer = answers[previous.id];
  if (!answer?.options.length) return slot.coachLine;

  const said = answer.options
    .map((id) => previous.options.find((o) => o.id === id)?.label)
    .filter(Boolean)
    .join(", ");

  const line = await text({
    model: MODELS.fast,
    timeoutMs: 6_000,
    maxTokens: 60,
    system: `You are a warm, plain-spoken career coach for young people in The Gambia.
Write ONE short sentence (under 14 words) reacting to what the learner just told you.
React only. The next question is shown to them directly underneath your sentence, so
do NOT ask it, repeat it, hint at it, or end with a question of any kind.
No greetings, no emoji, no flattery, no exclamation marks, no question marks.`,
    user: `They just answered "${previous.question}" with: ${said}${answer.text ? ` (they added: "${answer.text}")` : ""}.`,
  });

  return line && usable(line, slot.question) ? line : slot.coachLine;
}

/**
 * Whether a generated lead-in is worth showing.
 *
 * The model is told to react and not to ask, and mostly obeys — but when it
 * slips it appends the next question, which then appears twice in a row: once
 * as the coach's line and again as the heading below it. Cheaper to detect
 * than to keep re-prompting, and the static line is always ready to stand in.
 */
function usable(line: string, nextQuestion: string): boolean {
  if (!line) return false;
  if (line.includes("?")) return false;

  // Echoing a distinctive run of the question counts as asking it.
  const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  const question = normalise(nextQuestion);
  const words = normalise(line);
  for (let i = 0; i + 4 <= question.length; i++) {
    if (words.join(" ").includes(question.slice(i, i + 4).join(" "))) return false;
  }
  return true;
}
