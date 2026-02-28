export const JobCardSkeleton = () => {
  return (
    <div className="flex items-start gap-5 p-6 border border-border rounded-xl bg-card animate-pulse">
      {/* Logo skeleton */}
      <div className="w-12 h-12 rounded-full bg-muted shrink-0" />

      <div className="flex-1 space-y-3">
        {/* Title + badge */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-40 bg-muted rounded" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>

        {/* Company line */}
        <div className="h-3 w-48 bg-muted rounded" />

        {/* Description */}
        <div className="h-3 w-full bg-muted rounded" />

        {/* Tags */}
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-muted rounded-full" />
          <div className="h-5 w-20 bg-muted rounded-full" />
          <div className="h-5 w-14 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  );
};
