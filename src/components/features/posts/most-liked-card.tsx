import Link from "next/link";
import parse from "html-react-parser";
import { MessageCircle } from "lucide-react";
import { LikeButton } from "@/components/features/posts/like-button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/types/post-types";

interface MostLikedCardProps {
  post: Post;
}

export function MostLikedCard({ post }: MostLikedCardProps) {
  return (
    <Card className="flex flex-col py-6 gap-2 hover:shadow-md transition-shadow ">
      {/* Header */}
      <CardHeader>
        <Link href={`/post/${post.id}`} className="hover:underline">
          <CardTitle className="text-md xl:text-lg leading-tight line-clamp-2">
            {post.title}
          </CardTitle>
        </Link>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <div className="text-sm lg:text-base line-clamp-2 prose prose-sm dark:prose-invert max-w-none">
          {parse(post.content)}
        </div>
      </CardContent>

      {/* Footer Stats */}
      <CardFooter>
        <div className="flex items-center gap-4 text-sm lg:text-base text-muted-foreground mt-4">
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
    </Card>
  );
}
