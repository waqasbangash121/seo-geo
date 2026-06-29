import type { ComponentType } from "react";

import AiSearchArticle, * as aiSearchArticleModule from "./how-ai-search-improves-shopify-product-discovery.mdx";

export type BlogPostMetadata = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  coverImage?: string;
  readingTime: number;
  draft?: boolean;
};

export type BlogPostEntry = BlogPostMetadata & {
  Content: ComponentType;
};

const aiSearchArticleMetadata = (
  aiSearchArticleModule as unknown as { metadata: BlogPostMetadata }
).metadata;

export const blogPostEntries: BlogPostEntry[] = [
  {
    ...aiSearchArticleMetadata,
    Content: AiSearchArticle,
  },
];
