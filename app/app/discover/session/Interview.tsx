"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SLOTS, type Answers } from "@/lib/data/interview";
import { completeInterview } from "../actions";
import { cn } from "@/lib/utils/cn";

const STORAGE_KEY = "nyaama.interview";

export function Interview() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [line, setLine] = useState(SLOTS[0].coachLine);
  const [fading, setFading] = useState(false);
  const [pending, startTransition] = useTransition();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const slot = SLOTS[index];
  const answer = answers[slot.id] ?? { options: [] };
  const answered = answer.options.length > 0 || Boolean(answer.text?.trim());
  const last = index === SLOTS.length - 1;

  // A refresh mid-interview should not cost the learner their answers.
  //
  // This has to be an effect: sessionStorage does not exist during SSR, so a
  // lazy useState initialiser would return different values on server and
  // client and desynchronise hydration. Restoring after mount is correct here.
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const { index: i, answers: a } = JSON.parse(saved);
      /* eslint-disable react-hooks/set-state-in-effect */
      if (typeof i === "number" && i < SLOTS.length) setIndex(i);
      if (a && typeof a === "object") setAnswers(a);
      /* eslint-enable react-hooks/set-state-in-effect */
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ index, answers }));
  }, [index, answers]);

  // Personalised lead-in. The static line is already showing, so a slow or
  // failed request simply leaves it in place.
  useEffect(() => {
    if (index === 0) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/ai/interview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slotIndex: index, answers }),
        });
        const data = await res.json();
        if (!cancelled && data.line) setLine(data.line);
      } catch {
        /* static line stands */
      }
    })();

    return () => {
      cancelled = true;
    };
    // Deliberately keyed on index only: we want one call per question.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Move focus to the new question so screen readers and keyboard users
  // are not left at the bottom of the previous one.
  useEffect(() => {
    headingRef.current?.focus();
  }, [index]);

  function toggle(optionId: string) {
    setAnswers((prev) => {
      const current = prev[slot.id]?.options ?? [];
      const options =
        slot.type === "single"
          ? [optionId]
          : current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId];
      return { ...prev, [slot.id]: { ...prev[slot.id], options } };
    });
  }

  function setText(text: string) {
    setAnswers((prev) => ({
      ...prev,
      [slot.id]: { options: prev[slot.id]?.options ?? [], text },
    }));
  }

  function go(next: number) {
    setFading(true);
    setTimeout(() => {
      if (next < index) setLine(SLOTS[next].coachLine);
      setIndex(next);
      setFading(false);
    }, 160);
  }

  function submit() {
    sessionStorage.removeItem(STORAGE_KEY);
    startTransition(() => {
      void completeInterview(answers);
    });
  }

  if (pending) return <Thinking />;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>
            Question {index + 1} of {SLOTS.length}
          </span>
          <span>{Math.round((index / SLOTS.length) * 100)}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={SLOTS.length}
          aria-label="Interview progress"
          className="mt-2 h-1 overflow-hidden rounded-pill bg-white/10"
        >
          <div
            className="h-full rounded-pill bg-yellow transition-[width] duration-500 ease-out"
            style={{ width: `${((index + 1) / SLOTS.length) * 100}%` }}
          />
        </div>
      </div>

      <div
        className={cn(
          "transition-opacity duration-150",
          fading ? "opacity-0" : "opacity-100",
        )}
      >
        <p className="text-sm text-yellow">{line}</p>

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 font-display text-3xl leading-snug text-text outline-none sm:text-4xl"
        >
          {slot.question}
        </h1>

        <div
          role={slot.type === "single" ? "radiogroup" : "group"}
          aria-label={slot.question}
          className="mt-8 flex flex-wrap gap-2.5"
        >
          {slot.options.map((option) => {
            const selected = answer.options.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                role={slot.type === "single" ? "radio" : "checkbox"}
                aria-checked={selected}
                onClick={() => toggle(option.id)}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-pill border px-4 py-2 text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
                  selected
                    ? "border-transparent bg-yellow font-medium text-navy"
                    : "border-line text-muted hover:border-line-strong hover:text-text",
                )}
              >
                {selected && slot.type === "multi" && (
                  <Check size={14} aria-hidden />
                )}
                {option.label}
              </button>
            );
          })}
        </div>

        {slot.freeText && (
          <div className="mt-6">
            <label
              htmlFor="freetext"
              className="mb-2 block text-sm text-muted"
            >
              {slot.freeText}
            </label>
            <input
              id="freetext"
              value={answer.text ?? ""}
              onChange={(e) => setText(e.target.value)}
              maxLength={200}
              className="h-12 w-full rounded-xl border border-line bg-surface px-4 text-text focus:border-yellow/60 focus:outline-none focus:ring-2 focus:ring-yellow/60"
            />
          </div>
        )}
      </div>

      <div className="mt-12 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => go(index - 1)}
          disabled={index === 0}
        >
          <ArrowLeft size={16} aria-hidden />
          Back
        </Button>

        <Button
          size="lg"
          disabled={!answered}
          onClick={() => (last ? submit() : go(index + 1))}
        >
          {last ? "See my path" : "Continue"}
          <ArrowRight size={18} aria-hidden />
        </Button>
      </div>
    </div>
  );
}

/** The longest wait in the product, so it carries the brand rather than a spinner. */
function Thinking() {
  const messages = [
    "Reading your answers…",
    "Weighing five directions…",
    "Finding your path…",
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => Math.min(n + 1, messages.length - 1)), 2200);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center"
      role="status"
      aria-live="polite"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-[28%] bg-yellow motion-safe:animate-[spin_3.5s_linear_infinite]">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-navy" aria-hidden>
          <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="2" />
          <circle cx="15" cy="9" r="2.5" fill="currentColor" />
        </svg>
      </span>
      <p className="font-display text-2xl text-text">{messages[i]}</p>
    </div>
  );
}
