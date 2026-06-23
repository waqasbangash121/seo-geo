import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Hyper Apps",
  shortName: "Hyper Apps",
  description:
    "Hyper Apps is a Shopify AI commerce suite that powers product discovery, customer support automation, and shoppable video experiences using AI search, chat, and intent-based merchandising.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://niagarat.com",
  email: "waqas@niagarat.com",
  locale: "en_US",

  keywords: [
    // Core brand category
    "Shopify AI apps",
    "AI commerce suite",
    "Shopify automation tools",
    "ecommerce AI tools",
    "Shopify conversion optimization",

    // AI Search / Product Discovery (Hyper Search)
    "AI product search Shopify",
    "Shopify search and filter app",
    "semantic product search",
    "intent-based product discovery",
    "Shopify smart filters",
    "AI-powered product discovery",
    "Shopify search optimization",

    // AI Chat / Support (Hyper Chat)
    "Shopify AI chatbot",
    "AI customer support Shopify",
    "automated FAQ chatbot",
    "24/7 customer support automation",
    "Shopify support automation",
    "AI helpdesk for Shopify stores",

    // Shoppable Video (Hyper Video)
    "shoppable video Shopify",
    "video commerce platform",
    "interactive product videos",
    "Shopify video marketing app",
    "in-video checkout Shopify",
    "video-driven conversion optimization",

    // Conversion + Growth Layer
    "Shopify CRO tools",
    "increase Shopify conversion rate",
    "reduce cart abandonment Shopify",
    "ecommerce personalization AI",
    "retail AI optimization"
  ],

  iconPath: "/icon.svg",
  ogImagePath: "/og-image.svg",
};