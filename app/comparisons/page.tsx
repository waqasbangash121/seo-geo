import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { getAllComparisons } from "@/lib/comparisons";

export const metadata = createPageMetadata({
  title: "Shopify App Comparisons and Alternatives",
  description:
    "Compare Hyper Shopify apps with alternatives using clear decision criteria, implementation considerations, and practical use cases.",
  path: "/comparisons",
});

export default function ComparisonsPage() {
  const comparisons = getAllComparisons();

  return (
    <>
      <Section spacing="lg">
        <Container className="max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Decision guides</p>
          <h1 className="mt-4 type-display">Compare Shopify solutions with confidence.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Explore balanced comparisons that clarify the use cases, trade-offs, and implementation factors that matter for your storefront.
          </p>
        </Container>
      </Section>

      <Section className="pb-20 sm:pb-24">
        <Container className="max-w-5xl">
          {comparisons.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {comparisons.map((comparison) => (
                <Link
                  key={comparison.slug}
                  href={`/comparisons/${comparison.slug}`}
                  className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{comparison.category}</p>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">{comparison.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{comparison.excerpt}</p>
                  <p className="mt-5 text-sm font-semibold text-primary">Read comparison →</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
              <h2 className="text-xl font-semibold">Comparison guides are being prepared.</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Check back soon for practical alternatives and versus pages built for Shopify decision-makers.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
