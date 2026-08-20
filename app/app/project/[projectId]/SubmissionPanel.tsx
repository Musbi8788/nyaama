"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { submitForReview, type SubmitState } from "./actions";

function SubmitButton({ resubmit }: { resubmit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? (
        <>
          <Loader2 size={17} className="animate-spin" aria-hidden />
          Your coach is reading it
        </>
      ) : (
        <>
          {resubmit ? "Submit again" : "Submit for review"}
          <Send size={16} aria-hidden />
        </>
      )}
    </Button>
  );
}

export function SubmissionPanel({
  projectId,
  url,
  notes,
  reviewed,
}: {
  projectId: string;
  url: string | null;
  notes: string | null;
  reviewed: boolean;
}) {
  const [state, action] = useActionState<SubmitState, FormData>(
    submitForReview.bind(null, projectId),
    undefined,
  );

  return (
    <section className="mt-12 rounded-[20px] border border-line bg-surface p-6 sm:p-7">
      <h2 className="font-display text-2xl text-text">
        {reviewed ? "Updated your work?" : "Ready to show it?"}
      </h2>
      <p className="mt-2 leading-relaxed text-muted">
        Put it online — GitHub Pages, Netlify and Vercel are all free — then
        paste the link here.
      </p>

      <form action={action} className="mt-6 space-y-5">
        <Field
          id="url"
          name="url"
          type="url"
          label="Link to your work"
          placeholder="https://"
          defaultValue={url ?? ""}
          required
          hint="Anything someone can open on their phone."
        />

        <div className="space-y-2">
          <label htmlFor="notes" className="block text-sm font-medium text-text">
            Anything you want your coach to know
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            maxLength={1000}
            defaultValue={notes ?? ""}
            placeholder="What was hard? What are you unsure about?"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-text placeholder:text-muted/60 transition-colors focus:border-yellow/60 focus:outline-none focus:ring-2 focus:ring-yellow/60"
          />
          <p className="text-xs text-muted">Optional.</p>
        </div>

        {state?.error && (
          <p role="alert" className="text-sm text-danger">
            {state.error}
          </p>
        )}

        <SubmitButton resubmit={reviewed} />
      </form>
    </section>
  );
}
