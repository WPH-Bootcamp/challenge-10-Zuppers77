export const queryKeys = {
  auth: {
    me: ["auth", "me"],
  },
  posts: {
    all: ["posts"],
    lists: () => [...queryKeys.posts.all, "list"],
    recommended: (page: number, limit: number) => [
      ...queryKeys.posts.lists(),
      "recommended",
      { page, limit },
    ],
    mostLiked: (page: number, limit: number) => [
      ...queryKeys.posts.lists(),
      "mostLiked",
      { page, limit },
    ],
    search: (query: string, page: number, limit: number) => [
      ...queryKeys.posts.lists(),
      "search",
      { query, page, limit },
    ],
    detail: (id: number) => [...queryKeys.posts.all, "detail", id],
    myPosts: (page: number, limit: number) => [
      ...queryKeys.posts.lists(),
      "myPosts",
      { page, limit },
    ],
    likes: (id: number) => [...queryKeys.posts.detail(id), "likes"],
  },
  comments: {
    byPost: (postId: number) => ["comments", "post", postId],
  },
  users: {
    byUsername: (username: string) => ["users", "username", username],
  },
};
