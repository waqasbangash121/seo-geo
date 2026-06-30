import "server-only";

import { unstable_noStore as noStore } from "next/cache";

import type { BlogPostInput } from "@/lib/blog-admin-types";
import type { ManagedContentInput, ManagedContentType } from "@/lib/content-admin-types";
import {
  getPublishedBlogPostBySlug as getStoredBlogPostBySlug,
  getPublishedManagedContentBySlug as getStoredManagedContentBySlug,
  listPublishedBlogPosts as listStoredBlogPosts,
  listPublishedManagedContent as listStoredManagedContent,
} from "@/lib/content-store";

export async function listPublishedBlogPosts(): Promise<BlogPostInput[]> {
  noStore();
  return listStoredBlogPosts();
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostInput | null> {
  noStore();
  return getStoredBlogPostBySlug(slug);
}

export async function listPublishedManagedContent(
  type: ManagedContentType,
): Promise<ManagedContentInput[]> {
  noStore();
  return listStoredManagedContent(type);
}

export async function getPublishedManagedContentBySlug(
  type: ManagedContentType,
  slug: string,
): Promise<ManagedContentInput | null> {
  noStore();
  return getStoredManagedContentBySlug(type, slug);
}
