import { api } from "@/lib/api";
import { PostListResponse, Post, User } from "@/types/post-types";

export const postService = {
  getRecommendedPosts: async (page = 1, limit = 10) => {
    const response = await api.get<PostListResponse>("/posts/recommended", {
      params: { page, limit },
    });
    return response.data;
  },

  getMostLikedPosts: async (page = 1, limit = 5) => {
    const response = await api.get<PostListResponse>("/posts/most-liked", {
      params: { page, limit },
    });
    return response.data;
  },

  searchPosts: async (params: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    const { search, ...rest } = params;
    const response = await api.get<PostListResponse>("/posts/search", {
      params: {
        ...rest,
        query: search,
      },
    });
    return response.data;
  },

  getPostById: async (id: number) => {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },

  getMyPosts: async (page = 1, limit = 10) => {
    const response = await api.get<PostListResponse>("/posts/my-posts", {
      params: { page, limit },
    });
    return response.data;
  },

  deletePost: async (id: number) => {
    const response = await api.delete<{ success: boolean }>(`/posts/${id}`);
    return response.data;
  },

  getPostLikes: async (id: number) => {
    const response = await api.get<User[]>(`/posts/${id}/likes`);
    return response.data;
  },

  createPost: async (data: FormData) => {
    const response = await api.post<Post>("/posts", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updatePost: async (id: number, data: FormData) => {
    const response = await api.patch<Post>(`/posts/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  likePost: async (id: number) => {
    const response = await api.post<Post>(`/posts/${id}/like`);
    return response.data;
  },
};
