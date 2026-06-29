import type { MetadataRoute } from "next";

import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getPublishedCmsSitemapEntries } from "@/lib/cms/queries";

const appPages = [
  "/apps",
  "/apps/hyper-search-product-filters",
  "/apps/hyper-shoppable-videos",
  "/apps/hyper-chatbot-and-faqs",
];

const legalPages = ["/privacy", "/terms", "/cookie-policy"];
const standardPages = ["/", "/about", "/services", "/search", "/blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsEntries = await getPublishedCmsSitemapEntries();
  const routes = [
    ...new Set([
      ...primaryNavigation.map((item) => item.href),
      ...standardPages,
      ...appPages,
      ...legalPages,
    ]),
  ];
  const now = new Date();

  const staticEntries = routes.map((route) => {
    const isHome = route === "/";
    const isApp = appPages.includes(route);
    const isLegal = legalPages.includes(route);

    return {
      url: new URL(route, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: isHome || isApp ? "weekly" : isLegal ? "yearly" : "monthly",
      priority: isHome ? 1.0 : isApp ? 0.95 : isLegal ? 0.3 : 0.8,
    } satisfies MetadataRoute.Sitemap[number];
  });

  const dynamicEntries = cmsEntries.map((entry) => {
    const isBlogPost = entry.path.startsWith("/blog/");

    return {
      url: new URL(entry.path, siteConfig.url).toString(),
      lastModified: entry.lastModified ? new Date(entry.lastModified) : now,
      changeFrequency: isBlogPost ? "weekly" : "monthly",
      priority: isBlogPost ? 0.75 : 0.7,
    } satisfies MetadataRoute.Sitemap[number];
  });

  return [...staticEntries, ...dynamicEntries];
}
