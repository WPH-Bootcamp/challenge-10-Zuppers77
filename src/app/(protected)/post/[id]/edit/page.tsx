"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PostForm } from "@/components/features/post/post-form";
import { usePostDetail } from "@/hooks/query/use-posts";
import { useAuth } from "@/hooks/query/use-auth";
import { Spinner } from "@/components/ui/spinner";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoadingUser: isAuthLoading } = useAuth();

  const id = Number(params?.id);

  const { data: post, isLoading: isPostLoading, error } = usePostDetail(id);

  useEffect(() => {
    if (!isAuthLoading && !isPostLoading && post && user) {
      if (post.author.email !== user.email) {
        router.push("/");
      }
    }
  }, [post, user, isAuthLoading, isPostLoading, router]);

  if (isAuthLoading || isPostLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="text-muted-foreground mt-2">
          The post you are trying to edit does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <PostForm initialData={post} isEditing />
    </div>
  );
}
