import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { getAllResources } from "@/lib/resources";

export const metadata = createPageMetadata({
  title: "Shopify Ecommerce Guides, Playbooks, and Resources",
  description:
    "Explore practical Shopify guides, playbooks, checklists, templates, and documentation for product discovery and conversion growth.",
  path: "/resources",
});

export default function ResourcesPage() {
  const resources = getAllResources();

  return (
    <>
      <Section spacing="lg">
        <Container className="max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Practical learning</p>
          <h1 className="mt-4 type-display">Useful resources for better Shopify experiences.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Find practical guides, playbooks, checklists, templates, and implementation notes for ecommerce teams improving discovery and conversion.
          </p>
        </Container>
      </Section>

      <Section className="pb-20 sm:pb-24">
        <Container className="max-w-5xl">
          {resources.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {resources.map((resource) => (
                <Link
                  key={resource.slug}
                  href={`/resources/${resource.slug}`}
                  className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{resource.resourceType}</p>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">{resource.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{resource.excerpt}</p>
                  <p className="mt-5 text-sm font-semibold text-primary">Open resource →</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
              <h2 className="text-xl font-semibold">New resources are on the way.</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Check back soon for actionable ecommerce guides, templates, and implementation playbooks.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
