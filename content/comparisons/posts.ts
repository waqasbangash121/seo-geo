import type { ComponentType } from "react";

import ContentHyperAiSearchVsSearchanise, * as ContentHyperAiSearchVsSearchaniseModule from "./hyper-ai-search-vs-searchanise.mdx";

export type ManagedContentMetadata = {
  type: "comparison";
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
  competitorName?: string;
  decisionSummary?: string;
  resourceType?: "Guide" | "Playbook" | "Checklist" | "Template" | "Case Study" | "Documentation";
  audience?: string;
};

export type ManagedContentEntry = ManagedContentMetadata & {
  Content: ComponentType;
};

const ContentHyperAiSearchVsSearchaniseMetadata = (ContentHyperAiSearchVsSearchaniseModule as unknown as { metadata: ManagedContentMetadata }).metadata;

export const comparisonEntries: ManagedContentEntry[] = [
  { ...ContentHyperAiSearchVsSearchaniseMetadata, Content: ContentHyperAiSearchVsSearchanise },
];
