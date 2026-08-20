import type { StreakDay } from "@/lib/queries/user";
import { cn } from "@/lib/utils/cn";

/**
 * Motivational, not childish: no flames, no confetti. The encouragement
 * line changes with the streak so it never reads as canned.
 *
 * The dots are the last seven days ending today, each carrying its own
 * weekday letter from the query. They are not a Monday-to-Sunday week —
 * labelling them as one put Thursday's activity under "S".
 */
export function StreakCard({
  days,
  streak,
}: {
  days: StreakDay[];
  streak: number;
}) {
  const message =
    streak === 0
      ? "Every path starts with one day. Today can be it."
      : streak === 1
        ? "You started. That's the hardest part."
        : streak < 5
          ? "Keep showing up. Your future is built in moments like this."
          : "This is what progress actually looks like.";

  return (
    <div className="rounded-[20px] border border-line bg-surface p-5">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
        This week
      </p>
      <p className="mt-2 font-display text-2xl text-text">
        {streak} day{streak === 1 ? "" : "s"}
        {streak > 0 && " streak"}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted">{message}</p>

      <ul className="mt-4 flex justify-between" aria-label="Activity, last seven days">
        {days.map((day, i) => (
          <li key={i} className="flex flex-col items-center gap-1.5">
            <span
              title={`${day.isToday ? "Today" : day.letter} — ${day.done ? "active" : "no activity"}`}
              className={cn(
                "block h-2 w-2 rounded-full",
                day.done ? "bg-yellow" : "bg-white/10",
                day.isToday &&
                  "ring-2 ring-yellow/40 ring-offset-2 ring-offset-surface",
              )}
            />
            <span className="text-[0.625rem] text-muted" aria-hidden>
              {day.letter}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
