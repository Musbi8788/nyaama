import { redirect } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { PATH_NAMES } from "@/lib/data/scoring";
import type { CareerAssessment, CareerPath, PathId } from "@/lib/types/database";

export const metadata = { title: "Your path" };

export default async function ResultPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("career_assessments")
    .select("*")
    .eq("user_id", user.id)
    .eq("completed", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const assessment = data as CareerAssessment | null;
  if (!assessment?.recommendation) redirect("/app/discover");

  const { data: pathData } = await supabase
    .from("career_paths")
    .select("*")
    .eq("id", assessment.recommendation)
    .maybeSingle();

  const path = pathData as CareerPath | null;
  const confidence = Math.round((assessment.confidence ?? 0.7) * 100);

  return (
    <div className="mx-auto max-w-2xl space-y-12">
      <header className="reveal space-y-6">
        <p className="inline-flex items-center gap-2 rounded-pill border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-yellow">
          <Sparkles size={13} aria-hidden />
          We found your path
        </p>

        <h1 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-[1.08] text-text">
          {path?.name ?? PATH_NAMES[assessment.recommendation]}
        </h1>

        <p className="text-lg leading-relaxed text-muted">
          Based on what you told us, {(path?.name ?? "this path").toLowerCase()}{" "}
          is a strong place to start.
        </p>

        <div className="max-w-xs">
          <div className="flex justify-between text-xs text-muted">
            <span>How sure we are</span>
            <span>{confidence}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={confidence}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Confidence in this recommendation"
            className="mt-2 h-1.5 overflow-hidden rounded-pill bg-white/10"
          >
            <div
              className="h-full rounded-pill bg-yellow transition-[width] duration-700 ease-out"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
          Why this path
        </h2>
        <ul className="space-y-3">
          {assessment.reasons.map((reason) => (
            <li key={reason} className="flex gap-3 text-text">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow" />
              <span className="leading-relaxed">{reason}</span>
            </li>
          ))}
        </ul>
      </section>

      {assessment.alternatives.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Other paths you might explore later
          </h2>
          {/* Secondary on purpose: one direction, not a new menu. */}
          <div className="flex flex-wrap gap-2.5">
            {assessment.alternatives.map((id) => (
              <span
                key={id}
                className="rounded-pill border border-line px-4 py-2 text-sm text-muted"
              >
                {PATH_NAMES[id as PathId]}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="border-t border-line pt-8">
        <ButtonLink href="/app/roadmap" size="lg">
          See my roadmap
          <ArrowRight size={18} aria-hidden />
        </ButtonLink>
      </div>
    </div>
  );
}
