"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { usePostDetail, useAnotherPost } from "@/hooks/query/use-posts";
import { PostHeader } from "@/components/features/post/post-header";
import { PostContent } from "@/components/features/post/post-content";
import { CommentSection } from "@/components/features/post/comment-section";
import { PostCard } from "@/components/features/posts/post-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const postId = parseInt(resolvedParams.id);
  const router = useRouter();

  const { data: post, isLoading, isError } = usePostDetail(postId);
  const { data: anotherPosts } = useAnotherPost(postId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8 animate-pulse">
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
        <Skeleton className="aspect-video w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-6">
          The post you are looking for does not exist or has been removed.
        </p>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <PostHeader post={post} />
        <PostContent post={post} />
      </article>

      <CommentSection postId={post.id} />

      <section className="mt-6 mb-24">
        <h2 className="text-2xl font-bold">Another Post</h2>
        <div className="flex flex-col gap-4">
          {anotherPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
