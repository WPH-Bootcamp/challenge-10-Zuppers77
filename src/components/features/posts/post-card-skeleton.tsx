import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PostCardSkeleton() {
  return (
    <Card className="flex flex-col py-6 lg:py-10 gap-8 md:flex-row overflow-hidden border-none shadow-none">
      {/* Thumbnail Skeleton */}
      <div className="hidden md:block w-full md:w-48 lg:w-64 relative shrink-0 aspect-square">
        <Skeleton className="h-full w-full rounded-md" />
      </div>

      <div className="flex flex-col flex-1 space-y-6">
        <CardHeader className="p-0">
          {/* Title Skeleton */}
          <Skeleton className="h-7 w-3/4 mb-2" />
          <Skeleton className="h-7 w-1/2" />

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2 mt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0">
          {/* Content lines */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>

        <CardFooter className="mt-auto flex flex-col items-start gap-4 p-0">
          {/* Author & Date Skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Stats Skeleton */}
          <div className="mt-2 flex items-center gap-4">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
