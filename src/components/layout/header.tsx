"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/query/use-auth";
import { Button } from "@/components/ui/button";
import { Menu, X, PenBox } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { SearchBar } from "@/components/shared/search-bar";
import { AuthButtons } from "../shared/auth-buttons";
import { ProfileMenu } from "../shared/profile-menu";

export function Header() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container px-4 lg:px-8 mx-auto flex h-18 items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {/* Center: Search Bar (Desktop Only) */}
        <div className="hidden md:flex flex-1 items-center justify-center px-8">
          <SearchBar className="max-w-xl w-full" />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* DESKTOP LAYOUT */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Button
                  variant="link"
                  className="flex gap-2"
                  onClick={() => router.push("/post/new")}
                >
                  <PenBox className="h-4 w-4" />
                  <span>Write Post</span>
                </Button>
                <ProfileMenu showName={true} />
              </>
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* MOBILE LAYOUT */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated ? (
              // Mobile Auth: Profile Menu Only (Avatar)
              <ProfileMenu showName={false} />
            ) : (
              // Mobile Unauth: Search Icon + Hamburger
              <>
                <SearchBar variant="mobile" />
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay (Unauth Only) */}
      {!isAuthenticated && isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-t shadow-lg pt-12 flex flex-col gap-4 md:hidden min-h-screen">
          <AuthButtons />
        </div>
      )}
    </header>
  );
}
