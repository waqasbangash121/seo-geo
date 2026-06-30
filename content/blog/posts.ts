import type { ComponentType } from "react";

import PostHowAiSearchImprovesShopifyProductDiscovery, * as PostHowAiSearchImprovesShopifyProductDiscoveryModule from "./how-ai-search-improves-shopify-product-discovery.mdx";
import PostHowToIncreaseConversionsAndTurnMoreVisitorsIntoCustomers, * as PostHowToIncreaseConversionsAndTurnMoreVisitorsIntoCustomersModule from "./how-to-increase-conversions-and-turn-more-visitors-into-customers.mdx";

export type BlogPostMetadata = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  focusKeyword?: string;
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
const PostHowToIncreaseConversionsAndTurnMoreVisitorsIntoCustomersMetadata = (PostHowToIncreaseConversionsAndTurnMoreVisitorsIntoCustomersModule as unknown as { metadata: BlogPostMetadata }).metadata;

export const blogPostEntries: BlogPostEntry[] = [
  { ...PostHowAiSearchImprovesShopifyProductDiscoveryMetadata, Content: PostHowAiSearchImprovesShopifyProductDiscovery },
  { ...PostHowToIncreaseConversionsAndTurnMoreVisitorsIntoCustomersMetadata, Content: PostHowToIncreaseConversionsAndTurnMoreVisitorsIntoCustomers },
];
