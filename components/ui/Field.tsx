import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Label is always visible above the input — never placeholder-only, which
 * disappears the moment someone starts typing and is unusable for anyone
 * relying on a screen reader.
 */
export function Field({
  label,
  id,
  hint,
  error,
  className,
  ...props
}: ComponentProps<"input"> & {
  label: string;
  id: string;
  hint?: string;
  error?: string;
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-text">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        className={cn(
          "h-12 w-full rounded-xl border bg-surface px-4 text-text",
          "placeholder:text-muted/60 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-yellow/60 focus:border-yellow/60",
          error ? "border-danger" : "border-line",
          className,
        )}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
