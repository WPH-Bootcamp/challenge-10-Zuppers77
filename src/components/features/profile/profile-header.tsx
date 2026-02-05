"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/query/use-auth";
import { Author } from "@/components/shared/author";
import { ProfileHeaderSkeleton } from "./profile-header-skeleton";
import { EditProfileDialog } from "./edit-profile-dialog";

export function ProfileHeader() {
  const { user, isLoadingUser } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoadingUser) {
    return <ProfileHeaderSkeleton />;
  }

  if (!user) return null;

  return (
    <div className="flex items-center justify-between p-4 md:p-6 bg-card border rounded-xl">
      <div className="flex items-center gap-4">
        <Author
          author={user}
          avatarClassName="h-16 w-16 md:h-20 md:w-20"
          showName={false}
        />
        <div>
          <h1 className="text-lg md:text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {user.headline}
          </p>
        </div>
      </div>

      <Button
        variant="link"
        className="text-brand-300 hover:text-brand-300/80 p-0"
        onClick={() => setIsDialogOpen(true)}
      >
        Edit Profile
      </Button>

      <EditProfileDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
