"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchPosts } from "@/hooks/query/use-posts";

interface SearchBarProps {
  className?: string;
  initialQuery?: string;
  variant?: "default" | "mobile";
}

export function SearchBar({
  className,
  initialQuery = "",
  variant = "default",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading } = useSearchPosts(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && variant === "mobile" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, variant]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  if (variant === "mobile") {
    if (isOpen) {
      return (
        <div className="absolute left-0 top-0 h-16 w-full bg-background px-4 flex items-center z-50 border-b animate-in fade-in slide-in-from-top-1">
          <form
            onSubmit={handleSearch}
            className="flex-1 flex items-center gap-2"
          >
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search..."
              className="flex-1 border-none shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => !query && setIsOpen(false)}
            />
          </form>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 ml-2"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      );
    }

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        <Search className="h-5 w-5" />
      </Button>
    );
  }

  // Default variant
  return (
    <form
      onSubmit={handleSearch}
      className={cn("relative w-full max-w-md lg:max-w-lg", className)}
    >
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-9"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
