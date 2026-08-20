import type { PathId } from "@/lib/types/database";
import { SLOTS, optionById, type Answers } from "./interview";

export const PATH_IDS: PathId[] = [
  "software_engineering",
  "artificial_intelligence",
  "data_analytics",
  "cybersecurity",
  "graphic_design",
];

export const PATH_NAMES: Record<PathId, string> = {
  software_engineering: "Software Engineering",
  artificial_intelligence: "Artificial Intelligence",
  data_analytics: "Data Analytics",
  cybersecurity: "Cybersecurity",
  graphic_design: "Graphic Design",
};

export type Scores = Record<PathId, number>;

export type Recommendation = {
  recommendation: PathId;
  confidence: number;
  reasons: string[];
  alternatives: PathId[];
  source: "ai" | "fallback";
};

/** Sums the weights carried by every option the learner selected. */
export function scoreAnswers(answers: Answers): Scores {
  const scores = Object.fromEntries(PATH_IDS.map((p) => [p, 0])) as Scores;

  for (const slot of SLOTS) {
    for (const optionId of answers[slot.id]?.options ?? []) {
      const option = optionById(slot.id, optionId);
      if (!option) continue;
      for (const [path, weight] of Object.entries(option.weights)) {
        scores[path as PathId] += weight ?? 0;
      }
    }
  }

  return scores;
}

export function rankPaths(scores: Scores): PathId[] {
  return [...PATH_IDS].sort((a, b) => scores[b] - scores[a]);
}

/**
 * Confidence measures how *decisive* the answers were: the winner's margin
 * over the runner-up, not its share of the total. Share saturates — with
 * five paths, any winner takes ~40% and everything reads as 0.92, which
 * would tell a hesitant learner we are certain about them when we are not.
 *
 * A near-tie lands near 0.55; a runaway winner approaches 0.92.
 */
export function confidenceFrom(scores: Scores, winner: PathId): number {
  const top = scores[winner];
  if (top <= 0) return 0.5;

  const runnerUp = Math.max(
    ...PATH_IDS.filter((p) => p !== winner).map((p) => scores[p]),
    0,
  );

  const margin = (top - runnerUp) / top;
  return Math.max(0.55, Math.min(0.92, 0.55 + margin * 0.45));
}

/**
 * The deterministic recommendation. This runs whenever the AI is unavailable,
 * too slow, or returns something that fails validation — and it must be good
 * enough that the learner cannot tell which one they got.
 */
export function deterministicRecommendation(answers: Answers): Recommendation {
  const scores = scoreAnswers(answers);
  const ranked = rankPaths(scores);
  const winner = ranked[0];

  // Reasons are the learner's own selections, most decisive first: an option
  // that pushed hard toward the winning path says more than one that did not.
  const reasons: string[] = [];
  const seen = new Set<string>();

  const weighted = SLOTS.flatMap((slot) =>
    (answers[slot.id]?.options ?? [])
      .map((id) => optionById(slot.id, id))
      .filter((o): o is NonNullable<typeof o> => Boolean(o))
      .map((o) => ({ option: o, pull: o.weights[winner] ?? 0 })),
  ).sort((a, b) => b.pull - a.pull);

  for (const { option, pull } of weighted) {
    if (reasons.length >= 4) break;
    if (pull <= 0 || !option.reason || seen.has(option.reason)) continue;
    seen.add(option.reason);
    reasons.push(option.reason);
  }

  // Someone who selected only neutral options still deserves an answer.
  if (reasons.length === 0) {
    reasons.push(
      "Your answers point to a broad, practical starting point",
      "This path opens the most doors while you decide what you love",
    );
  }

  return {
    recommendation: winner,
    confidence: Number(confidenceFrom(scores, winner).toFixed(2)),
    reasons,
    alternatives: ranked.slice(1, 3),
    source: "fallback",
  };
}

/** Readable summary of the learner's answers, for the AI prompt. */
export function summariseAnswers(answers: Answers): string {
  return SLOTS.map((slot) => {
    const answer = answers[slot.id];
    if (!answer) return null;
    const labels = answer.options
      .map((id) => optionById(slot.id, id)?.label)
      .filter(Boolean);
    const extra = answer.text?.trim();
    const value = [...labels, extra].filter(Boolean).join("; ");
    return value ? `${slot.question}\n  -> ${value}` : null;
  })
    .filter(Boolean)
    .join("\n");
}
