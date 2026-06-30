import "server-only";

import type { ManagedContentInput } from "@/lib/content-admin-types";
import {
  getPublishedManagedContentBySlug,
  listPublishedManagedContent,
} from "@/lib/content-store";

export type Comparison = ManagedContentInput & {
  type: "comparison";
  competitorName: string;
  decisionSummary: string;
};

export async function getAllComparisons(): Promise<Comparison[]> {
  return (await listPublishedManagedContent("comparison")) as Comparison[];
}

export async function getComparisonBySlug(slug: string): Promise<Comparison | null> {
  const item = await getPublishedManagedContentBySlug("comparison", slug);
  return item as Comparison | null;
}

export function formatComparisonDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00.000Z`));
}
