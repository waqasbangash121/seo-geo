import type { MetadataRoute } from "next";

import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/lib/blog";

const appPages = [
  "/apps",
  "/apps/hyper-search-product-filters",
  "/apps/hyper-shoppable-videos",
  "/apps/hyper-chatbot-and-faqs",
];

const legalPages = ["/privacy", "/terms", "/cookie-policy"];
const standardPages = ["/", "/about", "/services", "/search"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...new Set([
      ...primaryNavigation.map((item) => item.href),
      ...standardPages,
      ...appPages,
      ...legalPages,
    ]),
  ];

  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => {
    const isHome = route === "/";
    const isApp = appPages.includes(route);
    const isLegal = legalPages.includes(route);

    return {
      url: new URL(route, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: isHome || isApp ? "weekly" : isLegal ? "yearly" : "monthly",
      priority: isHome ? 1.0 : isApp ? 0.95 : isLegal ? 0.3 : 0.8,
    };
  });

  const blogEntries: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
    lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T12:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
