import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { homeContent } from "@/content";

export const metadata = createPageMetadata({
  title: homeContent.hero.title,
  description: homeContent.hero.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Section className="pb-12 pt-20 sm:pt-28 lg:pt-32">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
              Hyper Apps
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {homeContent.hero.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {homeContent.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#f97316_0%,#ef4444_100%)] px-6 py-3 text-sm font-medium text-white shadow-[0_18px_36px_-18px_rgba(239,68,68,0.7)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Explore Apps
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Explore services
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Foundation
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
              {homeContent.foundation.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-background px-4 py-4"
                >
                  <span className="block font-medium text-foreground">{item.title}</span>
                  <span className="mt-1 block">{item.description}</span>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </Section>

      <Section aria-labelledby="foundation-section" className="pb-20 sm:pb-24">
        <Container>
          <div className="max-w-2xl">
            <h2
              id="foundation-section"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Production-ready foundation
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              The initial architecture is organized for scale: semantic routes, typed config,
              reusable primitives, SEO defaults, and a consistent design system that can expand
              without reshaping the app.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {homeContent.capabilities.map((item) => (
              <article key={item.title} className="rounded-3xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
