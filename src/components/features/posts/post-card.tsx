import Link from "next/link";
import parse from "html-react-parser";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/types/post-types";
import { formatDate } from "@/lib/utils";
import { Tag } from "@/components/shared/tag";
import { Author } from "@/components/shared/author";
import { LikeButton } from "@/components/features/posts/like-button";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex flex-col py-6 lg:py-10 gap-8 md:flex-row overflow-hidden">
      {/* Thumbnail - Hidden on Mobile */}
      {post.imageUrl && (
        <div className="hidden md:block w-full md:w-48 lg:w-64 relative shrink-0 aspect-square overflow-hidden rounded-md bg-white">
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
        <CardHeader>
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

        <CardContent className="flex-1">
          <div className="line-clamp-2 max-w-none">{parse(post.content)}</div>
        </CardContent>

        <CardFooter className="mt-auto flex flex-col items-start gap-4">
          {/* Author */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Author author={post.author} />
            <span>•</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>

          {/* Counts */}
          <div className="mt-2 flex items-center gap-4 text-muted-foreground">
            <LikeButton postId={post.id} initialLikes={post.likes} />
            <Link
              href={`/post/${post.id}#comments`}
              className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments}</span>
            </Link>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
