"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commentSchema,
  CommentFormValues,
} from "@/lib/validations/comment-schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateComment } from "@/hooks/query/use-comments";
import { useAuth } from "@/hooks/query/use-auth";
import { useRouter } from "next/navigation";
import { Author } from "@/components/shared/author";

interface CommentFormProps {
  postId: number;
  open: boolean;
}

export function CommentForm({ postId, open }: CommentFormProps) {
  const { mutate: createComment, isPending } = useCreateComment(postId);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = (data: CommentFormValues) => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/post/" + postId);
      return;
    }

    createComment(data.content, {
      onSuccess: () => {
        reset();
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-muted/50 p-4 rounded-lg text-center text-sm">
        <p className="text-muted-foreground mb-2">
          Please login to write a comment.
        </p>
        <Button
          size="sm"
          onClick={() => router.push(`/login?redirect=/post/${postId}`)}
        >
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!open && (
        <div className="flex items-center gap-3">
          {user && <Author author={user} />}
        </div>
      )}
      <h4 className="text-sm font-semibold">Give your Comments</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Textarea
            placeholder="Give your comments"
            className="min-h-[150px] resize-none"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-sm text-destructive mt-1">
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            variant="primary"
            type="submit"
            disabled={isPending}
            className="px-14"
          >
            {isPending ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
}
