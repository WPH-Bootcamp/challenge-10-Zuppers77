"use client";

import { use } from "react";
import { useUserPublicProfile } from "@/hooks/query/use-users";
import { PostCard } from "@/components/features/posts/post-card";
import { Author } from "@/components/shared/author";
import { EmptyState } from "@/components/features/search/empty-state";
import { ProfileHeaderSkeleton } from "@/components/features/profile/profile-header-skeleton";
import { PostCardSkeleton } from "@/components/features/posts/post-card-skeleton";
import { Separator } from "@/components/ui/separator";

export default function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const resolvedParams = use(params);
  const username = resolvedParams.username;

  const { data, isLoading, isError } = useUserPublicProfile(username);
  const user = data;
  const posts = data?.posts?.data || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        <ProfileHeaderSkeleton />
        <Separator />
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="container mx-auto px-4 py-24">
        <EmptyState
          title="User not found"
          description="The user you are looking for does not exist."
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Author
          author={user}
          showName={false}
          avatarClassName="h-16 w-16 md:h-20 md:w-20 border-2 border-background shadow-sm"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">
            {user.headline || "No headline"}
          </p>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Posts */}
      <div>
        <h2 className="text-xl font-bold mb-6">{posts.length} Post</h2>

        {posts.length > 0 ? (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-12">
            <EmptyState
              title="No posts from this user yet"
              description="Stay tuned for future posts"
              actionLabel=""
              onAction={undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
}
