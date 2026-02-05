import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AuthorProps {
  author: {
    username: string;
    name: string;
    avatarUrl?: string;
  };
  className?: string;
  avatarClassName?: string;
  showName?: boolean;
}

export function Author({
  author,
  className,
  avatarClassName,
  showName = true,
}: AuthorProps) {
  return (
    <Link
      href={`/user/${author.username}`}
      className={cn("flex items-center gap-2 text-sm group", className)}
      onClick={(e) => e.stopPropagation()}
    >
      <Avatar className={cn("size-10", avatarClassName)}>
        <AvatarImage src={author.avatarUrl} />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      {showName && (
        <span className="font-medium text-primary group-hover:text-muted-foreground transition-colors">
          {author.name}
        </span>
      )}
    </Link>
  );
}
