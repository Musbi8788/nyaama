import { NextResponse } from "next/server";
import { explain } from "@/lib/ai/explain";
import { findOption } from "@/lib/data/languages";
import { getModuleAccess } from "@/lib/queries/modules";
import { getProfile } from "@/lib/queries/user";

/**
 * Returns a lesson body in the requested language.
 *
 * Access is re-checked here rather than trusted from the page: this endpoint
 * would otherwise be a way to read any lesson body, locked or not, by
 * posting its id.
 */
export async function POST(request: Request) {
  const profile = await getProfile();
  if (!profile) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }

  let moduleId: string;
  let optionId: string;
  try {
    const body = await request.json();
    moduleId = String(body.moduleId ?? "");
    optionId = String(body.option ?? "");
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const option = findOption(optionId);
  if (!option || !moduleId) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const access = await getModuleAccess(profile, moduleId);
  if (!access.ok) {
    return NextResponse.json(
      { error: access.reason },
      { status: access.reason === "not_found" ? 404 : 403 },
    );
  }

  const result = await explain(access.module, option);

  // The learner asked for a translation and we could not produce one. Say so
  // in the shape the UI expects, so it can keep them on English instead of
  // emptying the page.
  if (!result) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  return NextResponse.json(result);
}
