import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Clock3,
  FileText,
  Scale,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { formatComparisonDate, getAllComparisons } from "@/lib/comparisons";

export const metadata = createPageMetadata({
  title: "Shopify App Comparisons and Alternatives",
  description:
    "Compare Hyper Shopify apps with alternatives using clear decision criteria, implementation considerations, and practical use cases.",
  path: "/comparisons",
});

const comparisonPrinciples = [
  {
    title: "Use-case first",
    description: "Start with the storefront problem, customer journey, and operational need you are solving.",
  },
  {
    title: "Clear trade-offs",
    description: "Understand the meaningful differences without reducing a complex choice to a feature checklist.",
  },
  {
    title: "Practical next steps",
    description: "Leave with guidance that helps your team decide what to evaluate or implement next.",
  },
];

const relatedLinks = [
  {
    href: "/blog",
    label: "Read the blog",
    description: "Explore practical perspectives on discovery, conversion, and AI commerce.",
    Icon: BookOpenText,
  },
  {
    href: "/resources",
    label: "Use the resources",
    description: "Turn a decision into action with implementation-focused guides and playbooks.",
    Icon: FileText,
  },
];

export default async function ComparisonsPage() {
  const comparisons = await getAllComparisons();

  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="pointer-events-none absolute -left-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 right-1/4 size-72 rounded-full bg-[hsl(var(--brand-end)/0.1)] blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  Decision guides
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Shopify comparisons
                </p>
                <h1 className="mt-3 max-w-4xl type-display">
                  Compare Shopify solutions with more confidence.
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Browse balanced versus and alternative guides built around buyer context, decision criteria,
                  and the implementation factors that matter in a real storefront.
                </p>
              </div>

              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <Scale aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-4xl font-semibold tracking-tight">{comparisons.length}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  comparison {comparisons.length === 1 ? "guide" : "guides"}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Written to make evaluation clearer, not to replace your team’s due diligence.
                </p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-6 sm:pb-8">
        <Container className="max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {comparisonPrinciples.map((principle, index) => (
              <article key={principle.title} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <span className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-background text-sm font-semibold text-primary">
                  0{index + 1}
                </span>
                <h2 className="mt-4 text-lg font-semibold tracking-tight">{principle.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{principle.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-8 sm:pb-10">
        <Container className="max-w-6xl">
          <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Comparison library</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Find the decision guide you need.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-right">
              Each guide highlights the context behind a choice, with a focus on practical fit and trade-offs.
            </p>
          </div>

          {comparisons.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {comparisons.map((comparison) => {
                const displayDate = comparison.updatedAt ?? comparison.publishedAt;
                const summary = comparison.decisionSummary || comparison.excerpt;

                return (
                  <Link
                    key={comparison.slug}
                    href={`/comparisons/${comparison.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_54px_-38px_hsl(var(--shadow)/0.78)] sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-muted/60 text-primary">
                        <Scale aria-hidden="true" className="size-5" />
                      </span>
                      <time
                        dateTime={displayDate}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
                      >
                        {formatComparisonDate(displayDate)}
                      </time>
                    </div>

                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {comparison.category}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {comparison.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{summary}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {comparison.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock3 aria-hidden="true" className="size-4" />
                        {comparison.readingTime} min read
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                        Read comparison
                        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-background text-primary">
                <Scale aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">Comparison guides are being prepared.</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Practical alternatives and versus pages for Shopify decision-makers will appear here soon.
              </p>
            </div>
          )}
        </Container>
      </Section>

      <Section spacing="none" className="pb-12 sm:pb-16">
        <Container className="max-w-6xl">
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Plan beyond the comparison</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Gather context, then take action.
                </h2>
              </div>
              <BadgeCheck aria-hidden="true" className="size-6 text-primary" />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {relatedLinks.map(({ href, label, description, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_18px_42px_-30px_hsl(var(--shadow)/0.75)]"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-primary">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    Continue exploring
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
