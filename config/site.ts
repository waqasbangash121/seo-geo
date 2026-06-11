import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Hyper",
  shortName: "Hyper",
  description:
    "Enterprise SEO and GEO website foundation built for Google, ChatGPT, Gemini, and Perplexity visibility.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hyper.example",
  email: "hello@hyper.example",
  locale: "en_US",
  keywords: [
    "enterprise SEO",
    "GEO",
    "AI search optimization",
    "Next.js 15",
    "search visibility",
  ],
  iconPath: "/icon.svg",
  ogImagePath: "/og-image.svg",
};