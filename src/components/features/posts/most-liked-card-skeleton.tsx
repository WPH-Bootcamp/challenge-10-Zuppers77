import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MostLikedCardSkeleton() {
  return (
    <Card className="flex flex-col py-6 gap-2 border-none shadow-none">
      <CardHeader className="p-0 mb-2">
        <Skeleton className="h-6 w-full mb-1" />
        <Skeleton className="h-6 w-2/3" />
      </CardHeader>

      <CardContent className="p-0">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </CardContent>

      <CardFooter className="p-0 mt-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-12" />
        </div>
      </CardFooter>
    </Card>
  );
}
