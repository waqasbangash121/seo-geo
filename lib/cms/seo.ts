import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

import { toCmsMediaUrl } from "./strapi-client";
import type { BlogPost, CmsPage, JsonObject, JsonValue, SeoFields, StrapiMedia } from "./types";

type CmsSeoContent = {
  title: string;
  description?: string | null;
  path: string;
  seo?: SeoFields | null;
  fallbackImage?: StrapiMedia | null;
  openGraphType?: "article" | "website";
};

function absoluteSiteUrl(pathOrUrl: string) {
  try {
    return new URL(pathOrUrl).toString();
  } catch {
    return new URL(pathOrUrl, siteConfig.url).toString();
  }
}

function getCanonicalUrl(path: string, canonicalUrl?: string | null) {
  return canonicalUrl?.trim() ? absoluteSiteUrl(canonicalUrl) : absoluteSiteUrl(path);
}

function getOpenGraphImage(seo?: SeoFields | null, fallbackImage?: StrapiMedia | null) {
  return toCmsMediaUrl(seo?.openGraphImage?.url ?? fallbackImage?.url) ?? undefined;
}

export function createCmsMetadata(content: CmsSeoContent): Metadata {
  const title = content.seo?.metaTitle?.trim() || content.title;
  const description = content.seo?.metaDescription?.trim() || content.description || siteConfig.description;
  const canonical = getCanonicalUrl(content.path, content.seo?.canonicalUrl);
  const openGraphTitle = content.seo?.openGraphTitle?.trim() || title;
  const openGraphDescription = content.seo?.openGraphDescription?.trim() || description;
  const image = getOpenGraphImage(content.seo, content.fallbackImage);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: content.openGraphType ?? "website",
      url: canonical,
      title: openGraphTitle,
      description: openGraphDescription,
      images: image
        ? [
            {
              url: image,
              alt: openGraphTitle,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: image ? [image] : undefined,
    },
  };
}

function isJsonObject(value: JsonValue | null | undefined): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseCustomJsonLd(value: JsonValue | null | undefined): JsonObject | null {
  if (isJsonObject(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(value);
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
      ? (parsed as JsonObject)
      : null;
  } catch {
    return null;
  }
}

export function createBlogPostJsonLd(post: BlogPost): JsonObject | null {
  const customJsonLd = parseCustomJsonLd(post.seo?.jsonLd);

  if (customJsonLd) {
    return customJsonLd;
  }

  if (!post.seo?.enableArticleSchema) {
    return null;
  }

  const canonical = getCanonicalUrl(`/blog/${post.slug}`, post.seo?.canonicalUrl);
  const image = getOpenGraphImage(post.seo, post.coverImage);
  const jsonLd: JsonObject = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo?.metaDescription?.trim() || post.excerpt || siteConfig.description,
    mainEntityOfPage: canonical,
    author: {
      "@type": "Organization",
      name: post.authorName?.trim() || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  if (post.publishedAt) {
    jsonLd.datePublished = post.publishedAt;
  }

  if (post.updatedAt || post.publishedAt) {
    jsonLd.dateModified = post.updatedAt ?? post.publishedAt ?? "";
  }

  if (image) {
    jsonLd.image = [image];
  }

  return jsonLd;
}

export function createCmsPageJsonLd(page: CmsPage): JsonObject | null {
  return parseCustomJsonLd(page.seo?.jsonLd);
}

export function serializeJsonLd(value: JsonObject) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
