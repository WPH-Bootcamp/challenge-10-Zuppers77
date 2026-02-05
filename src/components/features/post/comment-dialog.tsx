"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CommentList } from "./comment-list";
import { Comment } from "@/types/post-types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommentForm } from "./comment-form";

interface CommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comments: Comment[];
  postId: number;
}

export function CommentDialog({
  open,
  onOpenChange,
  comments,
  postId,
}: CommentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-xl w-[95%] md:w-full h-[85vh] flex flex-col p-6 gap-0">
        <DialogHeader className="pb-4 shrink-0">
          <DialogTitle>Comments ({comments.length})</DialogTitle>
        </DialogHeader>

        <div className="py-2 shrink-0 mb-2">
          <CommentForm open={open} postId={postId} />
        </div>

        <div className="flex-1 overflow-hidden py-2 -mr-3 pr-3">
          <ScrollArea className="h-full">
            <CommentList open={open} comments={comments} inDialog />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
