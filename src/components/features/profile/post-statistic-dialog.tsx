"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePostLikes } from "@/hooks/query/use-posts";
import { useComments } from "@/hooks/query/use-comments";

import { formatDate } from "@/lib/utils";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PostStatisticDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: number;
}

export function PostStatisticDialog({
  open,
  onOpenChange,
  postId,
}: PostStatisticDialogProps) {
  const { data: likes = [] } = usePostLikes(postId);
  const { data: comments = [] } = useComments(postId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] md:max-w-[600px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-start">Statistic</DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue="like"
          className="w-full flex-1 flex flex-col overflow-hidden"
        >
          <TabsList
            variant="line"
            className="w-full justify-start border-b-2 p-0 rounded-none bg-transparent h-auto gap-4"
          >
            <TabsTrigger
              value="like"
              className="flex items-center gap-2 pb-3 pt-1 px-4 rounded-none shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-brand-300 after:bg-brand-300 hover:text-brand-300/80 transition-colors after:-bottom-[3px]! data-[state=active]:after:h-[2px]"
            >
              <ThumbsUp size={16} /> Like
            </TabsTrigger>
            <TabsTrigger
              value="comment"
              className="flex items-center gap-2 pb-3 pt-1 px-4 rounded-none shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-brand-300 after:bg-brand-300 hover:text-brand-300/80 transition-colors after:-bottom-[3px]! data-[state=active]:after:h-[2px]"
            >
              <MessageCircle size={16} /> Comment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="like" className="flex-1 mt-4 overflow-hidden">
            <div className="font-bold text-lg mb-4 px-1">
              Like ({likes.length})
            </div>
            <ScrollArea className="h-full pr-4">
              {likes.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No likes yet
                </div>
              ) : (
                <div className="space-y-0">
                  {likes.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 py-4 border-b last:border-0"
                    >
                      <Link
                        href={`/user/${user.username}`}
                        className="shrink-0"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback>
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex flex-col">
                        <Link
                          href={`/user/${user.username}`}
                          className="font-bold text-sm hover:underline"
                        >
                          {user.name}
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {user.headline || "User"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="comment" className="flex-1 mt-4 overflow-hidden">
            <div className="font-bold text-lg mb-4 px-1">
              Comment ({comments.length})
            </div>
            <ScrollArea className="h-full pr-4">
              {comments.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No comments yet
                </div>
              ) : (
                <div className="space-y-0">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex flex-col gap-3 py-4 border-b last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/user/${comment.author.username}`}
                          className="shrink-0"
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={comment.author.avatarUrl} />
                            <AvatarFallback>
                              {comment.author.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                        <div className="flex flex-col">
                          <Link
                            href={`/user/${comment.author.username}`}
                            className="font-bold text-sm hover:underline"
                          >
                            {comment.author.name}
                          </Link>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
