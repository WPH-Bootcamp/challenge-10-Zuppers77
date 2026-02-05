import { PaginatedResponse } from "./api-types";
import { User } from "./user-types";
export type { User };

// Base Post Interface
export interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  author: User;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  comments: number;
}

// Response for List (Pagination)
export type PostListResponse = PaginatedResponse<Post>;

// Params for Get Posts
export interface GetPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
}
// Comment Interface
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: User;
  post?: {
    id: number;
  };
}
