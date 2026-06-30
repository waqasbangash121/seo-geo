import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  FileText,
  Layers3,
  Scale,
  Sparkles,
} from "lucide-react";

import { BlogCard } from "@/components/blog/blog-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata = createPageMetadata({
  title: "Hyper Blog | AI Shopify & Ecommerce Insights",
  description:
    "Explore the Hyper Blog for expert insights on AI for Shopify, ecommerce growth, product discovery, AI chatbots, customer experience, shoppable videos, and conversion optimization.",
  path: "/blog",
});

const categories = [
  "AI Commerce",
  "Shopify Growth",
  "Product Discovery",
  "AI Customer Support",
  "Video Commerce",
  "Conversion Optimization",
];

const libraryLinks = [
  {
    href: "/comparisons",
    label: "Comparisons",
    description: "Evaluate Shopify options with clear decision criteria and practical trade-offs.",
    Icon: Scale,
  },
  {
    href: "/resources",
    label: "Resources",
    description: "Use actionable playbooks, guides, and templates built for ecommerce teams.",
    Icon: FileText,
  },
];

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-1/3 size-72 rounded-full bg-[hsl(var(--brand-end)/0.1)] blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  Hyper insights
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  The Hyper blog
                </p>
                <h1 className="mt-3 max-w-4xl type-display">
                  Practical ideas for AI-powered ecommerce growth.
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Explore clear, useful perspectives on product discovery, customer experience, Shopify growth,
                  and the systems that help more shoppers find the right next step.
                </p>
              </div>

              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <BookOpenText aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-4xl font-semibold tracking-tight">{posts.length}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  published {posts.length === 1 ? "article" : "articles"}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Built for Shopify merchants and ecommerce teams planning their next improvement.
                </p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-6 sm:pb-8">
        <Container className="max-w-6xl">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Layers3 aria-hidden="true" className="size-4 text-primary" />
                  Browse by topic
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Start with the area of ecommerce experience you are improving right now.
                </p>
              </div>
              <span className="text-sm font-medium text-muted-foreground">{categories.length} focus areas</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-8 sm:pb-10">
        <Container className="max-w-6xl">
          <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Latest reading</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Ideas you can put to work.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-right">
              Every article is written to help teams make a clearer product, content, or conversion decision.
            </p>
          </div>

          {posts.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-background text-primary">
                <BookOpenText aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">Articles are on the way.</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                New perspectives on AI commerce, discovery, and conversion will appear here as they are published.
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
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Keep exploring</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  More ways to plan your next move.
                </h2>
              </div>
              <p className="max-w-lg text-sm leading-6 text-muted-foreground">
                Move from ideas to evaluated options and practical implementation support.
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {libraryLinks.map(({ href, label, description, Icon }) => (
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
                    Explore {label.toLowerCase()}
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
