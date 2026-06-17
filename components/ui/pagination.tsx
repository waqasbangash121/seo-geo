import Link from "next/link";

import { cn, createPaginationItems } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  getHref: (page: number) => string;
  className?: string;
};

export function Pagination({ currentPage, totalPages, getHref, className }: PaginationProps) {
  const items = createPaginationItems(currentPage, totalPages);
  const previousDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  if (!items.length) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-2", className)}>
      <Link
        href={getHref(Math.max(1, currentPage - 1))}
        aria-disabled={previousDisabled}
        tabIndex={previousDisabled ? -1 : 0}
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-[8px] border px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          previousDisabled
            ? "pointer-events-none border-border text-muted-foreground/60"
            : "border-border text-foreground hover:bg-muted",
        )}
      >
        Previous
      </Link>

      <ul className="flex items-center gap-1">
        {items.map((item) => {
          if (item.type === "ellipsis") {
            return (
              <li key={item.key} className="px-2 text-muted-foreground" aria-hidden="true">
                ...
              </li>
            );
          }

          return (
            <li key={item.value}>
              <Link
                href={getHref(item.value)}
                aria-current={item.isCurrent ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  item.isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {item.value}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href={getHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={nextDisabled}
        tabIndex={nextDisabled ? -1 : 0}
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-[8px] border px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          nextDisabled
            ? "pointer-events-none border-border text-muted-foreground/60"
            : "border-border text-foreground hover:bg-muted",
        )}
      >
        Next
      </Link>
    </nav>
  );
}
