import type { ComponentType } from "react";

export type ResourceMetadata = {
  type: "resource";
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
  resourceType: "Guide" | "Playbook" | "Checklist" | "Template" | "Case Study" | "Documentation";
  audience: string;
};

export type ResourceEntry = ResourceMetadata & {
  Content: ComponentType;
};

export const resourceEntries: ResourceEntry[] = [];
