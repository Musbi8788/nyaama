import { Skeleton } from "@/components/ui/Skeleton";

/** Shaped like a lesson: title, then a column of prose at reading measure. */
export default function Loading() {
  return (
    <div className="max-w-[680px]">
      <span className="sr-only" role="status">
        Loading lesson
      </span>

      <Skeleton className="h-4 w-32" />
      <div className="mt-8 space-y-3">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-11 w-3/4" />
        <Skeleton className="h-4 w-full max-w-sm" />
      </div>

      <div className="mt-10 space-y-3">
        {["w-full", "w-full", "w-11/12", "w-full", "w-4/5", "w-full", "w-2/3"].map(
          (width, i) => (
            <Skeleton key={i} className={`h-4 ${width}`} />
          ),
        )}
      </div>

      {/* The language bar: four pills of roughly the real label widths. */}
      <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
        {["w-32", "w-36", "w-44", "w-36"].map((width, i) => (
          <Skeleton key={i} className={`h-11 rounded-pill ${width}`} />
        ))}
      </div>
    </div>
  );
}
