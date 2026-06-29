import { comparisonEntries } from "@/content/comparisons/posts";

export function getAllComparisons() {
  return comparisonEntries.filter((item) => !item.draft);
}

export function getComparisonBySlug(slug: string) {
  return getAllComparisons().find((item) => item.slug === slug);
}

export function formatComparisonDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00.000Z`));
}
