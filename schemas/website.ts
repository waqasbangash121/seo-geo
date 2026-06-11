import { siteConfig } from "@/config/site";

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}