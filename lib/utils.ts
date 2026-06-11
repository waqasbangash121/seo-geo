import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function idFromString(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function isModifiedEvent(
  event: Pick<MouseEvent, "metaKey" | "altKey" | "ctrlKey" | "shiftKey">,
) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

export type PaginationItem =
  | { type: "page"; value: number; isCurrent: boolean }
  | { type: "ellipsis"; key: string };

export function createPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 0) {
    return [];
  }

  const current = clamp(currentPage, 1, totalPages);
  const pages = new Set<number>([1, totalPages, current, current - 1, current + 1]);

  const visiblePages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const items: PaginationItem[] = [];

  visiblePages.forEach((page, index) => {
    const previous = visiblePages[index - 1];
    if (previous && page - previous > 1) {
      items.push({ type: "ellipsis", key: `ellipsis-${previous}-${page}` });
    }

    items.push({ type: "page", value: page, isCurrent: page === current });
  });

  return items;
}
