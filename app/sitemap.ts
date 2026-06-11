import type { MetadataRoute } from "next";

import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const routes = [
  ...new Set([
    ...primaryNavigation.map((route) => route.href),
    "/about",
    "/services",
    "/search",
    "/privacy",
    "/terms",
    "/cookie-policy",
  ]),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
