"use client";

import { ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/query/use-auth";
import { useLikePost, usePostLikes } from "@/hooks/query/use-posts";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  postId: number;
  initialLikes: number;
  className?: string;
  iconSize?: number;
}

export function LikeButton({
  postId,
  initialLikes,
  className,
  iconSize = 5,
}: LikeButtonProps) {
  const { data: likesArg } = usePostLikes(postId);
  const { mutate: likePost } = useLikePost();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Check if current user liked the post
  const isLiked =
    isAuthenticated && likesArg
      ? likesArg.some((liker) => liker.id === user?.id)
      : false;

  const likeCount = likesArg ? likesArg.length : initialLikes;

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    likePost(postId);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 transition-colors cursor-pointer hover:text-foreground",
        isLiked
          ? "text-brand-300 hover:text-brand-300/80"
          : "text-muted-foreground",
        className,
      )}
      onClick={handleLike}
    >
      <ThumbsUp
        className={cn(
          `h-${iconSize} w-${iconSize}`,
          isLiked ? "fill-current" : "",
        )}
      />
      <span>{likeCount}</span>
    </div>
  );
}
