"use client";

import Image from "next/image";
import parse from "html-react-parser";
import { Post } from "@/types/post-types";

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  return (
    <div className="space-y-8 py-8">
      {post.imageUrl && (
        <div className="relative w-full aspect-square rounded-md overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-slate dark:prose-invert max-w-none md:prose-lg lg:prose-xl leading-relaxed">
        {parse(post.content)}
      </div>
    </div>
  );
}
