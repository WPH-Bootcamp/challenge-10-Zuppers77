"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  imageSrc?: string;
}

export function EmptyState({
  title = "No results found",
  description = "Try using different keywords",
  actionLabel = "Back to Home",
  onAction,
  icon,
  imageSrc = "/images/no-result-img.png",
}: EmptyStateProps) {
  const router = useRouter();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-24 text-center">
      <div className="relative mb-6 h-40 w-40 md:h-52 md:w-52 flex items-center justify-center">
        {icon ? (
          icon
        ) : (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain"
            priority
          />
        )}
      </div>
      <h3 className="text-lg font-semibold tracking-tight mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
        {description}
      </p>
      <Button
        variant="primary"
        onClick={handleAction}
        className="min-w-[200px] rounded-full"
      >
        {actionLabel}
      </Button>
    </div>
  );
}
