import Link from "next/link";

import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

import { BrandMark } from "./brand-mark";
import { NewsletterForm } from "./newsletter-form";
import { Container } from "../ui/container";

export function SiteFooter() {
  return (
    <footer role="contentinfo" className="border-t border-border/70">
      <Container className="grid gap-10 py-10 md:grid-cols-[1.3fr_2fr] md:items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <BrandMark className="h-9 w-9" />
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-foreground">
              Hyper
            </p>
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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {footerNavigation.map((group) => (
            <section key={group.title} aria-labelledby={`footer-${group.title.toLowerCase()}`}>
              <h2
                id={`footer-${group.title.toLowerCase()}`}
                className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground"
              >
                {group.title}
              </h2>
              <nav aria-label={`${group.title} links`} className="mt-3 grid gap-2 text-sm">
                {group.links.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </section>
          ))}

          <section aria-labelledby="footer-newsletter" className="sm:col-span-2 lg:col-span-1">
            <h2
              id="footer-newsletter"
              className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground"
            >
              Newsletter
            </h2>
            <div className="mt-3">
              <NewsletterForm />
            </div>
          </section>
        </div>
      </Container>

      <Container className="border-t border-border/70 py-4 text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
