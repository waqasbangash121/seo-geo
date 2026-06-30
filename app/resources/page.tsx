import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Clock3,
  FileText,
  ListChecks,
  Scale,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { formatResourceDate, getAllResources } from "@/lib/resources";

export const metadata = createPageMetadata({
  title: "Shopify Ecommerce Guides, Playbooks, and Resources",
  description:
    "Explore practical Shopify guides, playbooks, checklists, templates, and documentation for product discovery and conversion growth.",
  path: "/resources",
});

const resourceFormats = [
  {
    title: "Guides",
    description: "Learn a concept, understand the context, and see the next practical step.",
    Icon: BookOpenText,
  },
  {
    title: "Playbooks",
    description: "Turn a goal into a repeatable process your team can actually follow.",
    Icon: ListChecks,
  },
  {
    title: "Checklists and templates",
    description: "Move faster with structured prompts for planning, reviews, and implementation.",
    Icon: CheckCircle2,
  },
];

const relatedLinks = [
  {
    href: "/blog",
    label: "Read the blog",
    description: "Get context and practical perspectives on AI commerce, discovery, and conversion.",
    Icon: BookOpenText,
  },
  {
    href: "/comparisons",
    label: "Browse comparisons",
    description: "Evaluate Shopify solutions with clearer decision criteria and trade-offs.",
    Icon: Scale,
  },
];

export default async function ResourcesPage() {
  const resources = await getAllResources();

  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/4 size-72 rounded-full bg-[hsl(var(--brand-end)/0.1)] blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  Practical learning
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Hyper resources
                </p>
                <h1 className="mt-3 max-w-4xl type-display">
                  Practical resources for better Shopify experiences.
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Use focused guides, playbooks, checklists, and templates to improve product discovery,
                  customer experience, and conversion with a clearer implementation plan.
                </p>
              </div>

              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <FileText aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-4xl font-semibold tracking-tight">{resources.length}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  learning {resources.length === 1 ? "resource" : "resources"}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Designed to help ecommerce teams move from a question to a useful next action.
                </p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-6 sm:pb-8">
        <Container className="max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {resourceFormats.map(({ title, description, Icon }) => (
              <article key={title} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold tracking-tight">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-8 sm:pb-10">
        <Container className="max-w-6xl">
          <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Resource library</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Pick a useful next step.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-right">
              Choose a format that matches the work in front of you, then adapt it to your storefront and team.
            </p>
          </div>

          {resources.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {resources.map((resource) => {
                const displayDate = resource.updatedAt ?? resource.publishedAt;

                return (
                  <Link
                    key={resource.slug}
                    href={`/resources/${resource.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_54px_-38px_hsl(var(--shadow)/0.78)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-muted/60 text-primary">
                        <FileText aria-hidden="true" className="size-5" />
                      </span>
                      <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-primary">
                        {resource.resourceType}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {resource.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{resource.excerpt}</p>

                    {resource.audience ? (
                      <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                        <UsersRound aria-hidden="true" className="size-3.5 text-primary" />
                        {resource.audience}
                      </span>
                    ) : null}

                    <div className="mt-5 flex flex-wrap gap-2">
                      {resource.tags.slice(0, 3).map((tag) => (
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
                        {resource.readingTime} min read
                      </span>
                      <time dateTime={displayDate} className="text-sm font-medium text-muted-foreground">
                        {formatResourceDate(displayDate)}
                      </time>
                    </div>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      Open resource
                      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-background text-primary">
                <FileText aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">New resources are on the way.</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Actionable ecommerce guides, templates, and implementation playbooks will appear here soon.
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
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Keep moving</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Pair resources with context and evaluation.
                </h2>
              </div>
              <CheckCircle2 aria-hidden="true" className="size-6 text-primary" />
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
