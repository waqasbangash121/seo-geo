import type { MetadataRoute } from "next";

import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/lib/blog";
import { getAllComparisons } from "@/lib/comparisons";
import { getAllResources } from "@/lib/resources";

const appPages = [
  "/apps",
  "/apps/hyper-search-product-filters",
  "/apps/hyper-shoppable-videos",
  "/apps/hyper-chatbot-and-faqs",
];

const legalPages = ["/privacy", "/terms", "/cookie-policy"];
const standardPages = ["/", "/about", "/services", "/search", "/blog", "/comparisons", "/resources"];

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, comparisons, resources] = await Promise.all([
    getAllBlogPosts(),
    getAllComparisons(),
    getAllResources(),
  ]);

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
      priority: isHome ? 1 : isApp ? 0.95 : isLegal ? 0.3 : 0.8,
    };
  });

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
    lastModified: new Date(`${post.updatedAt || post.publishedAt}T12:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisonEntries: MetadataRoute.Sitemap = comparisons.map((comparison) => ({
    url: new URL(`/comparisons/${comparison.slug}`, siteConfig.url).toString(),
    lastModified: new Date(`${comparison.updatedAt || comparison.publishedAt}T12:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const resourceEntries: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: new URL(`/resources/${resource.slug}`, siteConfig.url).toString(),
    lastModified: new Date(`${resource.updatedAt || resource.publishedAt}T12:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...comparisonEntries, ...resourceEntries];
}
