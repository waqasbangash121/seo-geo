import type { ComponentType } from "react";

import AiSearchArticle, * as aiSearchArticleModule from "./how-ai-search-improves-shopify-product-discovery.mdx";
import ShopifyFilterArticle, * as shopifyFilterArticleModule from "./shopify-product-filter-best-practices.mdx";

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

const aiSearchArticleMetadata = (aiSearchArticleModule as unknown as { metadata: BlogPostMetadata })
  .metadata;
const shopifyFilterArticleMetadata = (
  shopifyFilterArticleModule as unknown as { metadata: BlogPostMetadata }
).metadata;

export const blogPostEntries: BlogPostEntry[] = [
  {
    ...shopifyFilterArticleMetadata,
    Content: ShopifyFilterArticle,
  },
  {
    ...aiSearchArticleMetadata,
    Content: AiSearchArticle,
  },
];
