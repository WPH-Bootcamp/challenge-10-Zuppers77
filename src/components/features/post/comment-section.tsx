"use client";

import { useState } from "react";
import { useComments } from "@/hooks/query/use-comments";
import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";
import { CommentDialog } from "./comment-dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface CommentSectionProps {
  postId: number;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { data: comments = [], isLoading } = useComments(postId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="py-6 space-y-4 border-y">
      <h3 className="text-xl font-bold">Comments ({comments.length})</h3>

      <CommentForm postId={postId} open={false} />

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <CommentList
          comments={comments}
          onSeeAll={() => setIsDialogOpen(true)}
          open={false}
        />
      )}

      <CommentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        comments={comments}
        postId={postId}
      />
    </div>
  );
}
