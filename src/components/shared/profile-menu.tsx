import { useAuth } from "@/hooks/query/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { UserIcon, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";

interface ProfileMenuProps {
  showName?: boolean;
  className?: string;
}

export function ProfileMenu({ showName, className }: ProfileMenuProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "relative hover:bg-transparent hover:text-muted-foreground px-2 gap-2",
            className,
          )}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatarUrl} alt={user?.name} />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {showName && (
            <span className="font-medium text-sm hidden md:inline-block">
              {user?.name}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-42" align="end" forceMount>
        <DropdownMenuItem
          onClick={() => router.push("/users/me")}
          className="py-3"
        >
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout} className="py-3">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
