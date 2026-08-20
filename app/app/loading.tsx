import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Covers every route under /app that does not ship its own. The shell —
 * sidebar, streak card — is already painted by the layout, so this only
 * stands in for the page body.
 */
export default function Loading() {
  return (
    <div className="max-w-3xl space-y-10">
      <span className="sr-only" role="status">
        Loading
      </span>

      <div className="space-y-3">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-40 w-full rounded-[20px]" />
        ))}
      </div>
    </div>
  );
}
