import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/layout/site-shell";
import { defaultMetadata, defaultViewport } from "@/config/metadata";
import { createOrganizationSchema, createWebsiteSchema } from "@/schemas";

import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-hyper-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-hyper-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = defaultMetadata;
export const viewport: Viewport = defaultViewport;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(createOrganizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(createWebsiteSchema()) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}