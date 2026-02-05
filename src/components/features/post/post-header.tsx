"use client";

import { formatDate } from "@/lib/utils";
import { Post } from "@/types/post-types";
import { MessageCircle } from "lucide-react";
import { LikeButton } from "@/components/features/posts/like-button";
import { Author } from "@/components/shared/author";
import { Tag } from "@/components/shared/tag";
import { Separator } from "@/components/ui/separator";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="space-y-6 pb-6 border-b">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Author author={post.author} />
        <span>•</span>
        <span>{formatDate(post.createdAt)}</span>
      </div>

      <Separator />

      <div className="flex items-center gap-6 text-muted-foreground text-sm md:text-base">
        <LikeButton
          postId={post.id}
          initialLikes={post.likes}
          iconSize={5}
          className="md:scale-110"
        />
        <div className="flex items-center gap-1.5">
          <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
          <span>{post.comments}</span>
        </div>
      </div>
    </div>
  );
}
