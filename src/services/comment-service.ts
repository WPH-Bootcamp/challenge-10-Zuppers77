import { api } from "@/lib/api";
import { Comment } from "@/types/post-types";

export const commentService = {
  getComments: async (postId: number) => {
    const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
    return response.data;
  },

  createComment: async (postId: number, content: string) => {
    const response = await api.post<Comment>(`/comments/${postId}`, {
      content,
    });
    return response.data;
  },
};
