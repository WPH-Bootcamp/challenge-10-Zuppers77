"use client";

import { GuestGuard } from "@/components/shared/route-guards";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestGuard>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </GuestGuard>
  );
}
