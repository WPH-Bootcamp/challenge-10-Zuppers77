"use client";

import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Post } from "@/types/post-types";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDeletePost } from "@/hooks/query/use-posts";
import { DeletePostDialog } from "./delete-post-dialog";
import { PostStatisticDialog } from "./post-statistic-dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "@/components/shared/tag";
import { BarChart2, Edit, Trash2 } from "lucide-react";

interface MyPostCardProps {
  post: Post;
}

export function MyPostCard({ post }: MyPostCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showStatisticDialog, setShowStatisticDialog] = useState(false);

  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  const handleDelete = () => {
    deletePost(post.id, {
      onSuccess: () => {
        toast.success("Post deleted successfully");
        setShowDeleteDialog(false);
      },
      onError: () => {
        toast.error("Failed to delete post");
      },
    });
  };

  return (
    <>
      <Card className="flex flex-col py-6 lg:py-10 gap-8 md:flex-row overflow-hidden border-b rounded-none shadow-none">
        {/* Thumbnail - Hidden on Mobile */}
        {post.imageUrl && (
          <div className="hidden md:block w-full md:w-48 lg:w-64 relative shrink-0 aspect-square overflow-hidden rounded-md bg-transparent">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content wrapper */}
        <div className="flex flex-col flex-1 space-y-6">
          <CardHeader className="p-0">
            <Link href={`/post/${post.id}`} className="hover:underline">
              <CardTitle className="text-lg md:text-xl line-clamp-2 leading-tight">
                {post.title}
              </CardTitle>
            </Link>
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0">
            <div className="line-clamp-2 prose prose-md dark:prose-invert max-w-none text-muted-foreground">
              {parse(post.content)}
            </div>
          </CardContent>

          <CardFooter className="mt-auto flex flex-col items-start gap-4 p-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Created {formatDate(post.createdAt)}</span>
              {post.updatedAt && (
                <>
                  <span className="mx-1 text-muted-foreground/30">|</span>
                  <span>Last updated {formatDate(post.updatedAt)}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-brand-300 hover:text-brand-300/80"
                onClick={() => setShowStatisticDialog(true)}
              >
                <BarChart2 className="mr-1 h-3 w-3" />
                Statistic
              </Button>
              <span className="text-muted-foreground/30 mx-2">|</span>
              <Link href={`/post/${post.id}/edit`}>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-brand-300 hover:text-brand-300/80"
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
              </Link>
              <span className="text-muted-foreground/30 mx-2">|</span>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-destructive hover:text-destructive/80 hover:no-underline"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-1 h-3 w-3" />
                Delete
              </Button>
            </div>
          </CardFooter>
        </div>
      </Card>

      <DeletePostDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      <PostStatisticDialog
        open={showStatisticDialog}
        onOpenChange={setShowStatisticDialog}
        postId={post.id}
      />
    </>
  );
}
