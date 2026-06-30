import "server-only";

import type { BlogPostInput } from "@/lib/blog-admin-types";
import {
  getPublishedBlogPostBySlug,
  listPublishedBlogPosts,
} from "@/lib/content-store";

export type BlogPost = BlogPostInput;

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return listPublishedBlogPosts();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return getPublishedBlogPostBySlug(slug);
}

export function formatBlogDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateString}T12:00:00.000Z`));
}
