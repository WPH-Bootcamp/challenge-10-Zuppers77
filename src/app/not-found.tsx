import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl text-primary">
          404
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight">
          Page not found
        </h2>
        <p className="text-muted-foreground max-w-[500px]">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been removed, renamed, or doesn&apos;t exist.
        </p>
      </div>

      <Button asChild className="mt-4 px-8!" variant="primary">
        <Link href="/">
          <MoveLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
