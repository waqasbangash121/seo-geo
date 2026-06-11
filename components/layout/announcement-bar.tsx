import Link from "next/link";

import { Container } from "@/components/ui/container";

export function AnnouncementBar() {
  return (
    <aside className="border-b border-border/70 bg-muted/60" aria-label="Announcement">
      <Container className="flex items-center justify-between gap-3 py-2 text-xs sm:text-sm">
        <p className="text-muted-foreground">
          New: Hyper AI Chat now supports multilingual product Q&A for global stores.
        </p>
        <Link
          href="/resources"
          className="font-medium text-foreground underline decoration-primary/40 underline-offset-4"
        >
          Learn more
        </Link>
      </Container>
    </aside>
  );
}
