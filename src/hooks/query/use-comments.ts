/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { commentService } from "@/services/comment-service";
import { queryKeys } from "./keys";
import { toast } from "sonner";

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: queryKeys.comments.byPost(postId),
    queryFn: () => commentService.getComments(postId),
    enabled: !!postId,
    select: (data) => {
      // Sort by createdAt descending (newest first)
      return [...data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    },
  });
};

export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      commentService.createComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.byPost(postId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.detail(postId),
      });
      toast.success("Comment posted!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to post comment");
    },
  });
};
