import { resourceEntries } from "@/content/resources/posts";

export function getAllResources() {
  return resourceEntries.filter((item) => !item.draft);
}

export function getResourceBySlug(slug: string) {
  return getAllResources().find((item) => item.slug === slug);
}

export function formatResourceDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00.000Z`));
}
