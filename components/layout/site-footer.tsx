import Link from "next/link";

import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

import { BrandMark } from "./brand-mark";
import { Container } from "../ui/container";

export function SiteFooter() {
  return (
    <footer role="contentinfo" className="border-t border-border/70">
      <Container className="grid gap-10 py-10 md:grid-cols-[1.5fr_1fr] md:items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <BrandMark className="h-9 w-9" />
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-foreground">Hyper</p>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            {siteConfig.description}
          </p>
          <Link
            href={`mailto:${siteConfig.email}`}
            className="inline-flex text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4"
          >
            {siteConfig.email}
          </Link>
        </div>

        <nav aria-label="Footer navigation" className="grid gap-3 text-sm">
          {footerNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}