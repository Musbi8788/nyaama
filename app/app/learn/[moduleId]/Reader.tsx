"use client";

import { useState, useTransition } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Markdown } from "@/lib/content/markdown";
import { LANGUAGE_OPTIONS } from "@/lib/data/languages";
import { cn } from "@/lib/utils/cn";
import { markComplete } from "./actions";

type Props = {
  moduleId: string;
  body: string;
  practice: string;
  completed: boolean;
  nextLabel: string;
};

type View =
  | { kind: "original" }
  | { kind: "alternate"; optionId: string; content: string; authored: boolean };

export function Reader({
  moduleId,
  body,
  practice,
  completed,
  nextLabel,
}: Props) {
  const [view, setView] = useState<View>({ kind: "original" });
  const [pending, setPending] = useState<string | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const [saving, startSaving] = useTransition();

  async function choose(optionId: string) {
    if (pending) return;
    setPending(optionId);
    setFailed(null);

    try {
      const response = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ moduleId, option: optionId }),
      });

      if (!response.ok) throw new Error(String(response.status));
      const data = await response.json();

      setView({
        kind: "alternate",
        optionId,
        content: data.content,
        authored: data.source === "authored",
      });
    } catch {
      // Stay on what they were reading. An empty lesson is worse than an
      // untranslated one.
      setFailed(optionId);
    } finally {
      setPending(null);
    }
  }

  const activeId = view.kind === "alternate" ? view.optionId : null;
  const showsAiNote = view.kind === "alternate" && !view.authored;

  return (
    <>
      <article className="mt-8">
        {view.kind === "original" ? (
          <Markdown>{body}</Markdown>
        ) : (
          <Markdown>{view.content}</Markdown>
        )}
      </article>

      {showsAiNote && (
        <p className="mt-6 text-sm text-muted">
          Translations are AI-assisted and improving.
        </p>
      )}

      {/* Language bar */}
      <div className="mt-10 border-t border-line pt-6">
        <div className="flex flex-wrap gap-2">
          {LANGUAGE_OPTIONS.map((option) => {
            const isActive = activeId === option.id;
            const isPending = pending === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => choose(option.id)}
                disabled={Boolean(pending)}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-pill px-4 text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
                  "disabled:opacity-60",
                  isActive
                    ? "bg-yellow font-medium text-navy"
                    : "border border-line text-muted hover:bg-surface-2 hover:text-text",
                )}
              >
                {isPending && <Loader2 size={14} className="animate-spin" aria-hidden />}
                {option.label}
              </button>
            );
          })}
        </div>

        {view.kind === "alternate" && (
          <button
            type="button"
            onClick={() => {
              setView({ kind: "original" });
              setFailed(null);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <ArrowLeft size={15} aria-hidden />
            Back to English
          </button>
        )}

        {failed && (
          <p role="status" className="mt-4 text-sm text-muted">
            <span className="text-text">Your coach is taking a moment.</span>{" "}
            Try that again in a few seconds.
          </p>
        )}
      </div>

      {/* Practice */}
      <section className="mt-10 rounded-[20px] border border-line bg-surface p-6 sm:p-7">
        <h2 className="font-display text-xl text-text">Try it yourself</h2>
        <div className="mt-3">
          <Markdown>{practice}</Markdown>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-8">
        <Button
          size="lg"
          disabled={saving}
          onClick={() => startSaving(() => void markComplete(moduleId))}
        >
          {saving ? (
            <>
              <Loader2 size={17} className="animate-spin" aria-hidden />
              Saving
            </>
          ) : (
            <>
              {completed ? "Continue" : "Mark as complete"}
              <ArrowRight size={17} aria-hidden />
            </>
          )}
        </Button>

        {completed && (
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <Check size={15} className="text-yellow" aria-hidden />
            Already completed
          </span>
        )}

        <span className="text-sm text-muted">Next: {nextLabel}</span>
      </div>
    </>
  );
}
