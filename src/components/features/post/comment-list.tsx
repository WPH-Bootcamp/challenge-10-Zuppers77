"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Comment } from "@/types/post-types";
import { Author } from "@/components/shared/author";

interface CommentListProps {
  comments: Comment[];
  onSeeAll?: () => void;
  inDialog?: boolean;
  open: boolean;
}

export function CommentList({
  comments,
  onSeeAll,
  inDialog = false,
  open,
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-muted-foreground text-sm italic py-4">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  const displayedComments = inDialog ? comments : comments.slice(0, 3);

  return (
    <div className="[&>*:not(:last-child)]:pb-4 border-t">
      {displayedComments.map((comment) => (
        <div
          key={comment.id}
          className={`flex flex-col gap-4 text-sm max-w-full py-4 border-b ${!open ? "nth-3:border-b-0" : ""}`}
        >
          <div className="flex items-start gap-3">
            <Author author={comment.author} showName={false} />
            <div className="flex flex-col">
              <Link
                href={`/user/${comment.author.username}`}
                className="text-sm font-semibold hover:underline"
              >
                {comment.author.name}
              </Link>
              <span className="text-xs text-muted-foreground">
                {formatDate(comment.createdAt)}
              </span>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {comment.content}
          </p>
        </div>
      ))}

      {!inDialog && comments.length > 3 && (
        <Button variant="link" className="px-0 pt-4 h-auto" onClick={onSeeAll}>
          See All Comments
        </Button>
      )}
    </div>
  );
}
