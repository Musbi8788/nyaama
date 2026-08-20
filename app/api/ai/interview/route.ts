import { NextResponse } from "next/server";
import { coachLine } from "@/lib/ai/recommend";
import { SLOTS } from "@/lib/data/interview";
import { createClient } from "@/lib/supabase/server";

/**
 * Returns the coach's lead-in line for a slot. Always 200 with a usable
 * line — the static text is the fallback, so the interview never stalls
 * waiting on this.
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }

  try {
    const { slotIndex, answers } = await request.json();
    const index = Number(slotIndex);

    if (!Number.isInteger(index) || index < 0 || index >= SLOTS.length) {
      return NextResponse.json({ error: "bad slot" }, { status: 400 });
    }

    return NextResponse.json({ line: await coachLine(index, answers ?? {}) });
  } catch {
    return NextResponse.json({ line: "" });
  }
}
