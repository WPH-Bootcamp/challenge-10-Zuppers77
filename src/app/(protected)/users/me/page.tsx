"use client";

import { useMyPosts } from "@/hooks/query/use-posts";
import { ProfileHeader } from "@/components/features/profile/profile-header";
import { MyPostCard } from "@/components/features/profile/my-post-card";
import { ChangePasswordForm } from "@/components/features/profile/change-password-form";
import { EmptyState } from "@/components/features/search/empty-state";
import { MyPostCardSkeleton } from "@/components/features/profile/my-post-card-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyProfilePage() {
  const router = useRouter();
  const { data, isLoading } = useMyPosts();
  const posts = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <ProfileHeader />

      <Tabs defaultValue="posts" className="w-full">
        <TabsList
          variant="line"
          className="mb-4 md:mb-6 justify-start border-b-2 p-0 rounded-none bg-transparent h-auto w-full md:w-max"
        >
          <TabsTrigger
            value="posts"
            className="pb-4 pt-1 px-4 min-w-[100px] rounded-none shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-brand-300 after:bg-brand-300 hover:text-brand-300/80 transition-colors after:-bottom-[3px]! data-[state=active]:after:h-[2px]"
          >
            Your Post
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="pb-4 pt-1 px-4 min-w-[100px] rounded-none shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-brand-300 after:bg-brand-300 hover:text-brand-300/80 transition-colors after:-bottom-[3px]! data-[state=active]:after:h-[2px]"
          >
            Change Password
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="hidden md:block text-2xl font-bold">
              {posts.length} Post
            </h2>
            <Button
              variant="primary"
              size="lg"
              className="w-full py-6! md:w-48 rounded-full!"
              onClick={() => router.push("/post/new")}
            >
              <PenBox className="mr-2 size-5" />
              Write Post
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <MyPostCardSkeleton key={i} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid">
              <h2 className="md:hidden text-xl font-bold border-t pt-4">
                {posts.length} Post
              </h2>
              {posts.map((post) => (
                <MyPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-12 border rounded-xl bg-card">
              <EmptyState
                title="Your writing journey starts here"
                description="No posts yet, but every great writer starts with the first one."
                actionLabel="Write Post"
                onAction={() => router.push("/post/new")}
              />
            </div>
          )}
        </TabsContent>

        <TabsContent value="password">
          <ChangePasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
