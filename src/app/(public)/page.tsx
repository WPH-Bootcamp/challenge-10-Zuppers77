"use client";

import { useState } from "react";
import { PostCard } from "@/components/features/posts/post-card";
import { MostLikedCard } from "@/components/features/posts/most-liked-card";
import {
  useMostLikedPosts,
  useRecommendedPosts,
} from "@/hooks/query/use-posts";
import { PaginationButton } from "@/components/shared/pagination-button";
import { PostCardSkeleton } from "@/components/features/posts/post-card-skeleton";
import { MostLikedCardSkeleton } from "@/components/features/posts/most-liked-card-skeleton";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data: recommendedData, isLoading: isRecommendedLoading } =
    useRecommendedPosts(page, 5);
  const { data: mostLikedData, isLoading: isMostLikedLoading } =
    useMostLikedPosts(1, 3);

  const posts = recommendedData?.data || [];
  const totalPages = recommendedData?.lastPage || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 flex flex-col order-1">
          <h2 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">
            Recommend For You
          </h2>

          {isRecommendedLoading ? (
            <div className="flex flex-col space-y-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col [&>*:not(:last-child)]:border-b">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}

              {posts.length === 0 && (
                <div className="text-center text-muted-foreground py-6">
                  No posts found.
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8">
            <PaginationButton
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        {/* Sidebar (Most Liked) */}
        <div className="lg:col-span-4 flex flex-col order-3 lg:order-2 lg:mt-0 border-t-6 lg:border-t-0 lg:border-l lg:px-8">
          <h2 className="text-xl lg:text-2xl font-bold mb-2 mt-8 lg:mt-0 lg:mb-4">
            Most Liked
          </h2>

          {isMostLikedLoading ? (
            <div className="flex flex-col space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <MostLikedCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col [&>*:not(:last-child)]:border-b">
              {mostLikedData?.data.map((post) => (
                <MostLikedCard key={post.id} post={post} />
              ))}
              {!mostLikedData?.data.length && (
                <div className="text-muted-foreground text-sm">
                  No popular posts yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
