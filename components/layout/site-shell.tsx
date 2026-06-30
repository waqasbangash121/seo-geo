"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { CookieBanner } from "./cookie-banner";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
