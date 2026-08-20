"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react";
import { ArrowRight, Check, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/brand/Logo";
import { SLOTS, type Answers, type Slot } from "@/lib/data/interview";
import { completeInterview } from "../actions";
import { cn } from "@/lib/utils/cn";

const STORAGE_KEY = "nyaama.interview";

/**
 * How long the coach appears to be composing before the next question lands.
 *
 * The AI lead-in usually returns faster than this, and a line that appears
 * instantly reads as a form advancing rather than someone answering. The
 * floor buys the pause that makes it feel like a reply; the ceiling means a
 * slow or dead request never holds the learner up, because the static line
 * is always ready to stand in.
 */
const COMPOSING_MIN_MS = 700;
const COMPOSING_MAX_MS = 2600;

const noop = () => () => {};

/**
 * Whether React has taken over the server-rendered markup.
 *
 * The answers are real buttons in the HTML before any JavaScript runs, so
 * they invite a tap they cannot yet handle — the click lands on nothing and
 * the conversation appears frozen. That window is a blink on a laptop and
 * considerably longer on a cheap phone over a slow connection, which is who
 * this is for. Showing them as not-yet-ready is honest; silently eating the
 * tap is not.
 *
 * useSyncExternalStore rather than an effect: it is the one hook whose
 * server and client snapshots are allowed to differ, so this cannot cause a
 * hydration mismatch.
 */
function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** What the learner said, in their own words, for their side of the transcript. */
function replyText(slot: Slot, answer: Answers[string] | undefined): string {
  if (!answer) return "";
  const labels = slot.options
    .filter((o) => answer.options.includes(o.id))
    .map((o) => o.label);
  const typed = answer.text?.trim();
  if (typed) labels.push(typed);
  return labels.join(" · ");
}

export function Interview() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  /** Lead-in actually shown for each slot, so the transcript stays truthful. */
  const [lines, setLines] = useState<Record<number, string>>({
    0: SLOTS[0].coachLine,
  });
  const [pending, startTransition] = useTransition();
  const hydrated = useHydrated();

  const askedRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  const restored = useRef(false);

  // Derived, not stored: the coach is composing exactly while the current
  // slot has no line yet. Holding it as state would be a second source of
  // truth for one fact, and a way for the dots to outlive the answer.
  const composing = !lines[index];

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
    restored.current = true;
    if (!saved) return;
    try {
      const { index: i, answers: a, lines: l } = JSON.parse(saved);
      /* eslint-disable react-hooks/set-state-in-effect */
      if (typeof i === "number" && i < SLOTS.length) setIndex(i);
      if (a && typeof a === "object") setAnswers(a);
      if (l && typeof l === "object") setLines((prev) => ({ ...prev, ...l }));
      /* eslint-enable react-hooks/set-state-in-effect */
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!restored.current) return;
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ index, answers, lines }),
    );
  }, [index, answers, lines]);

  // The coach answers what the learner just said. The static line is already
  // written, so a slow, failed or rate-limited request costs nothing but the
  // personalisation — the conversation never stalls on it.
  useEffect(() => {
    if (index === 0 || lines[index]) return;

    let cancelled = false;
    const started = Date.now();

    const settle = (line: string) => {
      if (cancelled) return;
      const waited = Date.now() - started;
      const hold = prefersReducedMotion()
        ? 0
        : Math.max(0, COMPOSING_MIN_MS - waited);
      setTimeout(() => {
        if (cancelled) return;
        setLines((prev) => ({ ...prev, [index]: line }));
      }, hold);
    };

    const giveUp = setTimeout(
      () => settle(SLOTS[index].coachLine),
      COMPOSING_MAX_MS,
    );

    (async () => {
      try {
        const res = await fetch("/api/ai/interview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slotIndex: index, answers }),
        });
        const data = await res.json();
        clearTimeout(giveUp);
        settle(data.line || SLOTS[index].coachLine);
      } catch {
        clearTimeout(giveUp);
        settle(SLOTS[index].coachLine);
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(giveUp);
    };
    // Keyed on index only: one call per question, never one per keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Bring the newest question to the top of the screen rather than the
  // bottom. Scrolling to the very end would park it under the sticky
  // composer; putting it at the top leaves the question and the answers to
  // it visible at the same time, which is the pair that has to be readable.
  useEffect(() => {
    askedRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }, [index, composing]);

  // Once the question has landed, put focus on the answers so a keyboard or
  // screen-reader user is at the live end of the conversation, not the top.
  useEffect(() => {
    if (composing) return;
    composerRef.current?.focus();
  }, [index, composing]);

  function advance(from: number) {
    if (from === SLOTS.length - 1) {
      sessionStorage.removeItem(STORAGE_KEY);
      startTransition(() => {
        void completeInterview(answers);
      });
      return;
    }
    setIndex(from + 1);
  }

  function choose(optionId: string) {
    const current = answers[slot.id]?.options ?? [];

    if (slot.type === "multi") {
      const options = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      setAnswers((prev) => ({
        ...prev,
        [slot.id]: { ...prev[slot.id], options },
      }));
      return;
    }

    // Single choice sends the turn straight away. Asking someone to pick an
    // answer and then press Continue is the survey feeling we are removing.
    //
    // A free-text box does not change that: on these slots it is an
    // *alternative* to the options ("Something else — tell us briefly"), not
    // an addition, so picking an option means they are done. The one case to
    // respect is text already typed — then they chose to answer that way and
    // we must not send it out from under them.
    const typed = Boolean(answers[slot.id]?.text?.trim());
    setAnswers((prev) => ({
      ...prev,
      [slot.id]: { ...prev[slot.id], options: [optionId] },
    }));
    if (!typed) advance(index);
  }

  function setText(text: string) {
    setAnswers((prev) => ({
      ...prev,
      [slot.id]: { options: prev[slot.id]?.options ?? [], text },
    }));
  }

  /** Take back the last thing you said, and let the coach ask again. */
  function undo() {
    const target = index - 1;
    setLines((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
    setIndex(target);
  }

  if (pending) return <Thinking />;

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-8rem)] max-w-2xl flex-col">
      <Progress index={index} />

      {/* The transcript. Polite, so each new coach turn is announced once
          rather than the whole conversation being re-read. */}
      <div
        className="flex-1 space-y-6 pb-10 pt-8"
        aria-live="polite"
        aria-atomic="false"
      >
        {SLOTS.slice(0, index + 1).map((s, i) => {
          const line = lines[i];
          const said = replyText(s, answers[s.id]);
          const isCurrent = i === index;

          return (
            <div
              key={s.id}
              // scroll-mt clears the sticky progress bar above.
              ref={isCurrent ? askedRef : undefined}
              className="space-y-6 scroll-mt-20"
            >
              {line ? (
                <Coach>
                  <p className="text-yellow">{line}</p>
                  <p
                    className={cn(
                      "mt-2 font-display leading-snug text-text",
                      isCurrent ? "text-2xl sm:text-3xl" : "text-lg",
                    )}
                  >
                    {s.question}
                  </p>
                </Coach>
              ) : null}

              {said && !isCurrent && <Said>{said}</Said>}
            </div>
          );
        })}

        {composing && <Composing />}
      </div>

      {/* The composer: what you can say next. */}
      {!composing && (
        <div className="sticky bottom-0 -mx-6 border-t border-line bg-navy/95 px-6 pb-6 pt-5 backdrop-blur supports-[backdrop-filter]:bg-navy/80">
          <div
            ref={composerRef}
            tabIndex={-1}
            role={slot.type === "single" ? "radiogroup" : "group"}
            aria-label={slot.question}
            className="flex flex-wrap gap-2.5 outline-none"
          >
            {slot.options.map((option) => {
              const selected = answer.options.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  role={slot.type === "single" ? "radio" : "checkbox"}
                  aria-checked={selected}
                  disabled={!hydrated}
                  onClick={() => choose(option.id)}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-pill border px-4 py-2 text-sm",
                    "transition-[colors,transform] active:scale-[0.97] motion-reduce:active:scale-100",
                    "disabled:cursor-progress disabled:opacity-50",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
                    // Weight stays constant across states: bolding the
                    // selected chip changes its width, which reflows the row
                    // and makes the answers jump under the cursor.
                    selected
                      ? "border-transparent bg-yellow text-navy"
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
            <div className="mt-3">
              <label htmlFor="freetext" className="sr-only">
                {slot.freeText}
              </label>
              <input
                id="freetext"
                value={answer.text ?? ""}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && answered && hydrated) advance(index);
                }}
                placeholder={slot.freeText}
                maxLength={200}
                className="h-12 w-full rounded-xl border border-line bg-surface px-4 text-text placeholder:text-muted focus:border-yellow/60 focus:outline-none focus:ring-2 focus:ring-yellow/60"
              />
            </div>
          )}

          <div className="mt-4 flex items-center justify-between gap-4">
            {index > 0 ? (
              <button
                type="button"
                onClick={undo}
                className="inline-flex items-center gap-1.5 rounded-lg text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
              >
                <Undo2 size={14} aria-hidden />
                Change my last answer
              </button>
            ) : (
              <span />
            )}

            {/* Multi-select and free text need a send: we cannot know when
                someone has finished choosing. A single choice sends itself. */}
            {(slot.type === "multi" || slot.freeText) && (
              <Button size="md" disabled={!answered} onClick={() => advance(index)}>
                {last ? "See my path" : "Send"}
                <ArrowRight size={16} aria-hidden />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Progress({ index }: { index: number }) {
  return (
    <div className="sticky top-0 z-10 -mx-6 bg-navy/95 px-6 pb-3 pt-4 backdrop-blur supports-[backdrop-filter]:bg-navy/80">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>Your career coach</span>
        <span>
          {index + 1} of {SLOTS.length}
        </span>
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
  );
}

/** The coach's turn: avatar, then what they said. */
function Coach({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 motion-safe:animate-[nyaama-rise_260ms_var(--ease-nyaama)]">
      <LogoMark size={32} className="mt-0.5" />
      <div className="min-w-0 flex-1 rounded-[20px] rounded-tl-md border border-line bg-surface px-5 py-4">
        {children}
      </div>
    </div>
  );
}

/** The learner's turn, on their own side. */
function Said({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end motion-safe:animate-[nyaama-rise_260ms_var(--ease-nyaama)]">
      <p className="max-w-[85%] rounded-[20px] rounded-br-md bg-yellow px-5 py-3 text-right text-sm font-medium text-navy">
        {children}
      </p>
    </div>
  );
}

/** Three dots, because someone is answering you. */
function Composing() {
  return (
    <div className="flex gap-3">
      <LogoMark size={32} className="mt-0.5" />
      <div
        className="flex items-center gap-1.5 rounded-[20px] rounded-tl-md border border-line bg-surface px-5 py-4"
        role="status"
      >
        <span className="sr-only">Your coach is typing</span>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-muted motion-safe:animate-[nyaama-typing_1.2s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 160}ms` }}
          />
        ))}
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
