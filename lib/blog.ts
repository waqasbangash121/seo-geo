import "server-only";

import { blogPostEntries, type BlogPostEntry } from "@/content/blog/posts";

export type BlogPost = Omit<BlogPostEntry, "Content">;

export function getAllBlogPosts(): BlogPost[] {
  return blogPostEntries
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map(({ Content: _content, ...post }) => post);
}

export function getBlogPostBySlug(slug: string): BlogPostEntry | null {
  const post = blogPostEntries.find((entry) => entry.slug === slug && !entry.draft);
  return post ?? null;
}

export function formatBlogDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateString}T12:00:00.000Z`));
}
