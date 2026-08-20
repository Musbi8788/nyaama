import { Skeleton } from "@/components/ui/Skeleton";

/**
 * The landing page reads career paths and projects from the database, so
 * it can be waiting on the network. This holds the shape of the hero
 * rather than flashing an empty navy screen.
 */
export default function Loading() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 py-20">
      <span className="sr-only" role="status">
        Loading
      </span>

      <Skeleton className="h-7 w-56 rounded-pill" />
      <div className="mt-8 space-y-4">
        <Skeleton className="h-14 w-full max-w-xl" />
        <Skeleton className="h-14 w-full max-w-lg" />
      </div>
      <div className="mt-10 space-y-3">
        <Skeleton className="h-4 w-full max-w-lg" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <Skeleton className="mt-10 h-13 w-48" />
    </div>
  );
}
