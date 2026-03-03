"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchPosts } from "@/hooks/query/use-posts";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { PostCard } from "@/components/features/posts/post-card";
import { EmptyState } from "@/components/features/search/empty-state";
import { Spinner } from "@/components/ui/spinner";
import { PostCardSkeleton } from "@/components/features/posts/post-card-skeleton";
import { SearchBar } from "@/components/shared/search-bar";

import { Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchPosts(query);

  const posts = data?.pages.flatMap((page) => page.data) || [];

  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="md:hidden mb-6">
        <SearchBar initialQuery={query} />
      </div>

      {/* Header */}
      {query && (
        <div className="mb-6 hidden md:block">
          <h1 className="text-xl md:text-2xl font-bold">
            Result for &quot;{query}&quot;
          </h1>
        </div>
      )}

      {/* Initial Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Data State */}
      {!isLoading && !isError && (
        <>
          {posts.length > 0 ? (
            <div className="flex flex-col gap-2">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}

              {/* Infinite Scroll Loader */}
              <div ref={targetRef} className="py-4 flex justify-center h-20">
                {isFetchingNextPage && <Spinner />}
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </>
      )}

      {/* Error State */}
      {isError && (
        <EmptyState
          title="Something went wrong"
          description="We couldn't search for posts at this time. Please try again later."
        />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <Spinner />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
