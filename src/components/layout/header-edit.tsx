"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProfileMenu } from "../shared/profile-menu";

export function HeaderEdit() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container px-4 lg:px-8 mx-auto flex h-18 items-center justify-between">
        {/* Left: Back button */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="flex gap-2 hover:bg-transparent hover:text-brand-300"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Write Post</span>
          </Button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <ProfileMenu showName={true} />
        </div>
      </div>
    </header>
  );
}
