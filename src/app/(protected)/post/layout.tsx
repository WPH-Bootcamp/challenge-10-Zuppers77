"use client";

import { HeaderEdit } from "@/components/layout/header-edit";
import { Footer } from "@/components/layout/footer";
import { AuthGuard } from "@/components/shared/route-guards";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col">
        <HeaderEdit />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </AuthGuard>
  );
}
