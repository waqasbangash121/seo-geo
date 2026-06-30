import "server-only";

import type { ManagedContentInput } from "@/lib/content-admin-types";
import {
  getPublishedManagedContentBySlug,
  listPublishedManagedContent,
} from "@/lib/public-content-store";

type ResourceItem = ManagedContentInput & {
  type: "resource";
  resourceType: string;
  audience: string;
};

export async function getAllResources(): Promise<ResourceItem[]> {
  return (await listPublishedManagedContent("resource")) as ResourceItem[];
}

export async function getResourceBySlug(slug: string): Promise<ResourceItem | null> {
  const item = await getPublishedManagedContentBySlug("resource", slug);
  return item as ResourceItem | null;
}

export function formatResourceDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00.000Z`));
}
