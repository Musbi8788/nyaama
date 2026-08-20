"use client";

import { useOptimistic, useState, useTransition } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ProjectRequirement } from "@/lib/types/database";
import { saveChecklist } from "./actions";

/**
 * Ticks save on click. The optimistic state is what makes it feel like a
 * checklist rather than a form — the box fills instantly and the write
 * happens behind it.
 */
export function Checklist({
  projectId,
  requirements,
  initial,
}: {
  projectId: string;
  requirements: ProjectRequirement[];
  initial: Record<string, boolean>;
}) {
  const [saved, setSaved] = useState(initial);
  const [checklist, setOptimistic] = useOptimistic(saved);
  const [, startTransition] = useTransition();

  function toggle(id: string) {
    const next = { ...checklist, [id]: !checklist[id] };
    startTransition(async () => {
      setOptimistic(next);
      setSaved(next);
      await saveChecklist(projectId, next);
    });
  }

  const done = requirements.filter((r) => checklist[r.id]).length;

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-2xl text-text">What you need</h2>
        <p className="text-sm text-muted">
          {done} of {requirements.length} done
        </p>
      </div>

      <ul className="mt-5 space-y-2">
        {requirements.map((requirement) => {
          const ticked = Boolean(checklist[requirement.id]);
          return (
            <li key={requirement.id}>
              <button
                type="button"
                onClick={() => toggle(requirement.id)}
                aria-pressed={ticked}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
                  ticked
                    ? "border-yellow/40 bg-yellow/[0.06]"
                    : "border-line bg-surface hover:bg-surface-2",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors",
                    ticked
                      ? "border-transparent bg-yellow text-navy"
                      : "border-line-strong",
                  )}
                >
                  {ticked && <Check size={14} strokeWidth={3} />}
                </span>
                <span className={ticked ? "text-text" : "text-muted"}>
                  {requirement.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
