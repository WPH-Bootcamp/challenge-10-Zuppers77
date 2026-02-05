import { Skeleton } from "@/components/ui/skeleton";

export function ProfileHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 md:p-6 bg-card border rounded-xl">
      <div className="flex items-center gap-4">
        {/* Avatar Skeleton */}
        <Skeleton className="h-16 w-16 md:h-20 md:w-20 rounded-full" />
        <div className="space-y-2">
          {/* Name Skeleton */}
          <Skeleton className="h-6 w-32 md:h-8 md:w-48" />
          {/* Headline Skeleton */}
          <Skeleton className="h-4 w-48 md:w-64" />
        </div>
      </div>

      {/* Edit Button Placeholder */}
      <Skeleton className="h-9 w-24" />
    </div>
  );
}
