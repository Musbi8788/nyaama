import "server-only";
import { createClient } from "@/lib/supabase/server";
import type {
  CareerPath,
  ModuleProgress,
  Profile,
  Progress,
} from "@/lib/types/database";

export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return data as Profile | null;
}

export async function getCurrentPath(
  pathId: string | null,
): Promise<CareerPath | null> {
  if (!pathId) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("career_paths")
    .select("*")
    .eq("id", pathId)
    .maybeSingle();
  return data as CareerPath | null;
}

export async function getProgress(
  pathId: string | null,
): Promise<Progress | null> {
  if (!pathId) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("path_id", pathId)
    .maybeSingle();
  return data as Progress | null;
}

export async function getModuleProgress(): Promise<ModuleProgress[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("module_progress")
    .select("*")
    .eq("user_id", user.id);
  return (data ?? []) as ModuleProgress[];
}

/** One dot on the streak card. */
export type StreakDay = { letter: string; done: boolean; isToday: boolean };

const LETTERS = ["S", "M", "T", "W", "T", "F", "S"];

/** Seven empty dots ending today, for signed-out or error states. */
function blankWeek(): StreakDay[] {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return { letter: LETTERS[d.getDay()], done: false, isToday: i === 6 };
  });
}

/**
 * The seven days ending today, and the current streak.
 *
 * Computed here rather than in SQL: it is a handful of rows, and date
 * arithmetic is far easier to reason about (and test) in one place.
 * A streak survives until the end of the following day, so someone who
 * studies late on Monday has all of Tuesday to keep it.
 *
 * Each day carries its own weekday letter. The window rolls — today is
 * always the last dot — so the card cannot label a fixed Monday-to-Sunday
 * week over data that does not run Monday to Sunday.
 */
export async function getStreak(): Promise<{ days: StreakDay[]; streak: number }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { days: blankWeek(), streak: 0 };

  const { data } = await supabase
    .from("activity_log")
    .select("day")
    .eq("user_id", user.id)
    .order("day", { ascending: false })
    .limit(60);

  const active = new Set((data ?? []).map((r) => r.day as string));
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const today = new Date();

  const days: StreakDay[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push({
      letter: LETTERS[d.getDay()],
      done: active.has(iso(d)),
      isToday: i === 0,
    });
  }

  let streak = 0;
  const cursor = new Date(today);
  if (!active.has(iso(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (active.has(iso(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return { days, streak };
}

/** Records that the learner did something today. Safe to call repeatedly. */
export async function logActivity() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const today = new Date().toISOString().slice(0, 10);
  const { data: existing } = await supabase
    .from("activity_log")
    .select("id, events")
    .eq("user_id", user.id)
    .eq("day", today)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("activity_log")
      .update({ events: existing.events + 1 })
      .eq("id", existing.id);
  } else {
    await supabase
      .from("activity_log")
      .insert({ user_id: user.id, day: today, events: 1 });
  }
}
