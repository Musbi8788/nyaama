import type {
  Project,
  ProjectFeedback,
  ProjectRequirement,
} from "@/lib/types/database";

/**
 * Feedback built from the checklist alone, with no model involved.
 *
 * This is the review a learner gets when OpenAI is down, and it has to be
 * good enough that they never find out. It can do that because the
 * checklist is real information: the learner has told us, item by item,
 * what they built. Naming those items back to them specifically is most of
 * what useful feedback is.
 *
 * What it deliberately does not do is judge quality. It has not seen the
 * work. Praising something it cannot see would be the one failure mode
 * worse than saying less.
 */

export function rubricFeedback(
  project: Project,
  checklist: Record<string, boolean>,
  url: string | null,
): ProjectFeedback {
  const done = project.requirements.filter((r) => checklist[r.id]);
  const missing = project.requirements.filter((r) => !checklist[r.id]);

  const didWell: string[] = [];
  const improve: string[] = [];

  if (url) {
    didWell.push(
      "You put it online. A link you can send to someone is worth more than a folder of files.",
    );
  }

  for (const requirement of done.slice(0, 4)) {
    didWell.push(`You covered ${lower(requirement.label)}.`);
  }

  if (done.length === project.requirements.length) {
    didWell.push("You finished every requirement, not just the easy ones.");
  }

  // Nothing ticked at all: say something true rather than something warm.
  if (didWell.length === 0) {
    didWell.push(
      "You submitted it. Putting work in front of someone is the part most people skip.",
    );
  }

  for (const requirement of missing.slice(0, 4)) {
    improve.push(`${sentence(requirement.label)} is still missing — add it next.`);
  }

  if (!url) {
    improve.push(
      "Add a live link. Until someone can open it on their phone, it is hard to show.",
    );
  }

  if (missing.length === 0) {
    improve.push(
      "Hand it to someone who has never seen it and watch them use it on their phone. What they hesitate over is your next task.",
    );
  }

  return {
    didWell,
    improve,
    skillsDemonstrated: project.practices.slice(0, creditedSkillCount(project, checklist)),
  };
}

/**
 * How many skills the checklist actually supports.
 *
 * Scales straight with completion, with no threshold that hands over the
 * full list early. A learner who has not made the page work on a phone has
 * not demonstrated responsive design, and telling them they have is worse
 * than telling them nothing — the claim to have proof is the whole reason
 * anyone would trust this platform.
 *
 * Finishing everything credits everything. Finishing nothing credits
 * nothing, and the review says so in words instead.
 */
export function creditedSkillCount(
  project: Project,
  checklist: Record<string, boolean>,
): number {
  const total = project.requirements.length;
  if (!total) return 0;
  const done = project.requirements.filter((r) => checklist[r.id]).length;
  if (done === total) return project.practices.length;
  return Math.floor(project.practices.length * (done / total));
}

/** "A menu or list of their main dishes" -> "a menu or list of their main dishes" */
function lower(label: string): string {
  return label.charAt(0).toLowerCase() + label.slice(1);
}

function sentence(label: string): string {
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/** Requirements the learner says are done, for the review prompt. */
export function describeChecklist(
  requirements: ProjectRequirement[],
  checklist: Record<string, boolean>,
): string {
  return requirements
    .map((r) => `- [${checklist[r.id] ? "x" : " "}] ${r.label}`)
    .join("\n");
}
