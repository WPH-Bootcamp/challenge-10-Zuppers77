import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { postService } from "@/services/post-service";
import { queryKeys } from "./keys";
import { useAuth } from "@/hooks/query/use-auth";
import { User } from "@/types/user-types";

export const useRecommendedPosts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: queryKeys.posts.recommended(page, limit),
    queryFn: () => postService.getRecommendedPosts(page, limit),
    placeholderData: keepPreviousData,
  });
};

export const useAnotherPost = (currentPostId: number) => {
  const { data: recommendedData, ...rest } = useRecommendedPosts(1, 3);

  const post =
    recommendedData?.data.filter((p) => p.id !== currentPostId).slice(0, 1) ||
    [];

  return { data: post, ...rest };
};

export const useMostLikedPosts = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: queryKeys.posts.mostLiked(page, limit),
    queryFn: () => postService.getMostLikedPosts(page, limit),
  });
};

export const useSearchPosts = (query: string, limit = 10) => {
  return useInfiniteQuery({
    queryKey: queryKeys.posts.search(query, 1, limit),
    queryFn: ({ pageParam = 1 }) =>
      postService.searchPosts({ search: query, page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.lastPage) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!query,
    placeholderData: keepPreviousData,
  });
};

export const usePostDetail = (id: number) => {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => postService.getPostById(id),
  });
};

export const useMyPosts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: queryKeys.posts.myPosts(page, limit),
    queryFn: () => postService.getMyPosts(page, limit),
    placeholderData: keepPreviousData,
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
    },
  });
};

export const usePostLikes = (postId: number) => {
  return useQuery({
    queryKey: queryKeys.posts.likes(postId),
    queryFn: () => postService.getPostLikes(postId),
    enabled: !!postId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      postService.updatePost(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.detail(data.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: postService.likePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.posts.likes(postId),
      });

      const previousLikes = queryClient.getQueryData<User[]>(
        queryKeys.posts.likes(postId),
      );

      if (previousLikes && user) {
        const isLiked = previousLikes.some((u) => u.id === user.id);
        let newLikes: User[];

        if (isLiked) {
          // Unlike: Remove user
          newLikes = previousLikes.filter((u) => u.id !== user.id);
        } else {
          // Like: Add user
          newLikes = [...previousLikes, user];
        }

        queryClient.setQueryData(queryKeys.posts.likes(postId), newLikes);
      }

      return { previousLikes };
    },
    onError: (_err, postId, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(
          queryKeys.posts.likes(postId),
          context.previousLikes,
        );
      }
    },
    onSettled: (updatedPost, error, postId) => {
      // Always refetch after error or success:
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.likes(postId),
      });

      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
      if (updatedPost) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.posts.detail(updatedPost.id),
        });
      }
    },
  });
};
