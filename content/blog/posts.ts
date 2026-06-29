import type { ComponentType } from "react";

import PostHowAiSearchImprovesShopifyProductDiscovery, * as PostHowAiSearchImprovesShopifyProductDiscoveryModule from "./how-ai-search-improves-shopify-product-discovery.mdx";
import PostTestingNewArticle, * as PostTestingNewArticleModule from "./testing-new-article.mdx";
import PostHowToIncreaseConversion, * as PostHowToIncreaseConversionModule from "./how-to-increase-conversion.mdx";

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

const PostHowAiSearchImprovesShopifyProductDiscoveryMetadata = (PostHowAiSearchImprovesShopifyProductDiscoveryModule as unknown as { metadata: BlogPostMetadata }).metadata;
const PostTestingNewArticleMetadata = (PostTestingNewArticleModule as unknown as { metadata: BlogPostMetadata }).metadata;
const PostHowToIncreaseConversionMetadata = (PostHowToIncreaseConversionModule as unknown as { metadata: BlogPostMetadata }).metadata;

export const blogPostEntries: BlogPostEntry[] = [
  { ...PostHowAiSearchImprovesShopifyProductDiscoveryMetadata, Content: PostHowAiSearchImprovesShopifyProductDiscovery },
  { ...PostTestingNewArticleMetadata, Content: PostTestingNewArticle },
  { ...PostHowToIncreaseConversionMetadata, Content: PostHowToIncreaseConversion },
];
