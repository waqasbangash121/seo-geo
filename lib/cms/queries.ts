import "server-only";

import { fetchStrapiCollection, isCmsConfigured } from "./strapi-client";
import type { BlogPost, CmsPage, CmsSitemapEntry } from "./types";

function withSeoAndMedia(params: URLSearchParams, mediaField: "coverImage" | "heroImage") {
  params.set(`populate[${mediaField}]`, "true");
  params.set("populate[seo][populate][openGraphImage]", "true");
  return params;
}

function logCmsReadError(operation: string, error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown CMS error";
  console.error(`[cms] ${operation}: ${message}`);
}

export async function listPublishedBlogPosts(): Promise<BlogPost[]> {
  if (!isCmsConfigured()) {
    return [];
  }

  const params = withSeoAndMedia(new URLSearchParams(), "coverImage");
  params.set("status", "published");
  params.set("sort[0]", "publishedAt:desc");
  params.set("pagination[pageSize]", "100");

  try {
    return (await fetchStrapiCollection<BlogPost>("/api/blog-posts", params))?.data ?? [];
  } catch (error) {
    logCmsReadError("Could not list published blog posts", error);
    return [];
  }
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isCmsConfigured()) {
    return null;
  }

  const params = withSeoAndMedia(new URLSearchParams(), "coverImage");
  params.set("status", "published");
  params.set("filters[slug][$eq]", slug);
  params.set("pagination[pageSize]", "1");

  try {
    return (await fetchStrapiCollection<BlogPost>("/api/blog-posts", params))?.data[0] ?? null;
  } catch (error) {
    logCmsReadError(`Could not load blog post "${slug}"`, error);
    return null;
  }
}

export async function listPublishedCmsPages(): Promise<CmsPage[]> {
  if (!isCmsConfigured()) {
    return [];
  }

  const params = withSeoAndMedia(new URLSearchParams(), "heroImage");
  params.set("status", "published");
  params.set("sort[0]", "publishedAt:desc");
  params.set("pagination[pageSize]", "100");

  try {
    return (await fetchStrapiCollection<CmsPage>("/api/pages", params))?.data ?? [];
  } catch (error) {
    logCmsReadError("Could not list published CMS pages", error);
    return [];
  }
}

export async function getPublishedCmsPageBySlug(slug: string): Promise<CmsPage | null> {
  if (!isCmsConfigured()) {
    return null;
  }

  const params = withSeoAndMedia(new URLSearchParams(), "heroImage");
  params.set("status", "published");
  params.set("filters[slug][$eq]", slug);
  params.set("pagination[pageSize]", "1");

  try {
    return (await fetchStrapiCollection<CmsPage>("/api/pages", params))?.data[0] ?? null;
  } catch (error) {
    logCmsReadError(`Could not load CMS page "${slug}"`, error);
    return null;
  }
}

export async function getPublishedCmsSitemapEntries(): Promise<CmsSitemapEntry[]> {
  const [posts, pages] = await Promise.all([listPublishedBlogPosts(), listPublishedCmsPages()]);

  return [
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt,
    })),
    ...pages.map((page) => ({
      path: `/pages/${page.slug}`,
      lastModified: page.updatedAt ?? page.publishedAt,
    })),
  ];
}
