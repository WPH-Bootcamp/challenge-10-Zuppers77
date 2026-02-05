"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
}

export function Logo({ variant = "full", className }: LogoProps) {
  const [isError, setIsError] = useState(false);

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 font-bold text-xl", className)}
    >
      <div className="relative h-8 w-8 shrink-0">
        {!isError ? (
          <Image
            src="/images/logo-icon.png"
            alt="Logo"
            fill
            className="object-contain"
            onError={() => setIsError(true)}
          />
        ) : (
          <div className="h-full w-full bg-primary rounded flex items-center justify-center text-primary-foreground text-sm">
            B
          </div>
        )}
      </div>

      {variant === "full" && <span className="truncate">Your Logo</span>}
    </Link>
  );
}
