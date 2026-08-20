import "server-only";
import { z } from "zod";
import { MODELS, structured } from "./client";
import { describeChecklist, rubricFeedback } from "@/lib/data/rubric";
import type { Project, ProjectFeedback } from "@/lib/types/database";

const FeedbackSchema = z.object({
  didWell: z.array(z.string().min(8)).min(2).max(4),
  improve: z.array(z.string().min(8)).min(2).max(4),
});

const jsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["didWell", "improve"],
  properties: {
    didWell: {
      type: "array",
      items: { type: "string" },
      description: "Two to four specific things the learner did well, addressed as 'You…'.",
    },
    improve: {
      type: "array",
      items: { type: "string" },
      description: "Two to four concrete next actions. Each must be doable this week.",
    },
  },
};

const SYSTEM = `You are a project reviewer inside Nyaama, coaching young people in The Gambia who are building their first real projects.

You are given a project brief, the learner's own checklist of what they completed, the link they submitted, and their notes.

Rules:
- Coach, never grade. No scores, no percentages, no letter grades, no "good job" filler.
- Address the learner directly as "You".
- Be specific to THIS project and THIS checklist. Generic advice is worse than none.
- You cannot see the actual website. Never claim to have looked at their design, colours, code or content. Speak only to what they told you they built.
- Every "improve" item must be one concrete action they could do this week, in plain language.
- Never mention unticked items as if they were done.
- No exclamation marks. Warm, direct, and honest.`;

export type Review = { feedback: ProjectFeedback; source: "ai" | "fallback" };

/**
 * Reviews a submission, falling back to the checklist rubric.
 *
 * The model never sees the learner's site — it cannot fetch a URL — so the
 * prompt forbids it from pretending otherwise. Both paths are working from
 * the same evidence; the model just phrases it better.
 */
export async function reviewProject(
  project: Project,
  checklist: Record<string, boolean>,
  url: string | null,
  notes: string | null,
): Promise<Review> {
  const fallback = rubricFeedback(project, checklist, url);

  const result = await structured({
    model: MODELS.fast,
    system: SYSTEM,
    schemaName: "project_review",
    schema: FeedbackSchema,
    jsonSchema,
    timeoutMs: 15_000,
    temperature: 0.5,
    user: [
      `Project: ${project.title}`,
      `\nBrief:\n${project.brief}`,
      `\nWhat the learner ticked as done:\n${describeChecklist(project.requirements, checklist)}`,
      `\nLink submitted: ${url || "none"}`,
      `\nTheir notes: ${notes?.trim() || "none"}`,
      `\nThe project's practice list: ${project.practices.join(", ")}`,
    ].join("\n"),
  });

  if (!result) return { feedback: fallback, source: "fallback" };

  return {
    feedback: {
      didWell: result.didWell,
      improve: result.improve,
      // Not the model's call. Asked to review five of seven items it
      // credited responsive design to a learner who had just written that
      // the menu looks squashed on a phone. Capping the count was not
      // enough — it simply put the unearned skill first.
      //
      // So the checklist decides the skills outright and the model writes
      // only the prose. A pleasant side effect: the skills a learner sees
      // are identical whether OpenAI answered or not.
      skillsDemonstrated: fallback.skillsDemonstrated,
    },
    source: "ai",
  };
}
