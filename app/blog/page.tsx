import Link from "next/link";

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

const featuredTopics = [
  {
    title: "AI for Shopify Merchants",
    description:
      "Learn how artificial intelligence is changing ecommerce through smarter search, automated support, and personalized shopping experiences.",
  },
  {
    title: "Product Discovery",
    description:
      "Discover strategies that help customers find products faster and improve online shopping journeys.",
  },
  {
    title: "Customer Experience",
    description:
      "Explore practical ways to reduce friction, answer customer questions, and build loyalty.",
  },
  {
    title: "Video Commerce",
    description:
      "Understand how interactive and shoppable videos can increase engagement and conversions.",
  },
];

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Section className="pb-12 pt-20 sm:pt-28 lg:pt-32">
        <Container className="max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Hyper Blog
          </p>

          <h1 className="mt-4 type-display">AI Commerce, Shopify Growth, and Ecommerce Insights</h1>

          <p className="mx-auto mt-6 max-w-3xl type-body">
            The Hyper Blog explores the future of ecommerce through artificial intelligence, product
            discovery, customer support automation, and interactive shopping experiences. Learn
            practical strategies that help Shopify merchants improve customer experiences and grow
            their businesses.
          </p>
        </Container>
      </Section>

      <Section className="pb-12">
        <Container className="max-w-5xl">
          <div className="rounded-[10px] border border-border bg-surface p-8">
            <h2 className="text-3xl font-semibold tracking-tight">What You’ll Learn</h2>

            <p className="mt-4 leading-8 text-muted-foreground">
              Our articles focus on practical ecommerce strategies, AI-powered commerce
              technologies, Shopify best practices, and emerging trends that help merchants build
              better shopping experiences.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-12">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
                Latest articles
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Practical guides for modern commerce</h2>
            </div>
            <p className="max-w-xl leading-7 text-muted-foreground">
              Every article is published from this repository as an MDX file, keeping the blog fast,
              version-controlled, and free to host on Vercel.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[10px] border border-dashed border-border bg-surface p-10 text-center">
              <h3 className="text-2xl font-semibold tracking-tight">Articles are on the way</h3>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
                Add a published MDX file to the content/blog directory to make the first article
                appear here.
              </p>
            </div>
          )}
        </Container>
      </Section>

      <Section className="pb-12">
        <Container>
          <h2 className="text-center text-3xl font-semibold tracking-tight">Featured Topics</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {featuredTopics.map((topic) => (
              <article
                key={topic.title}
                className="rounded-[10px] border border-border bg-surface p-8"
              >
                <h3 className="text-2xl font-semibold tracking-tight">{topic.title}</h3>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">{topic.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pb-12">
        <Container className="max-w-5xl">
          <div className="rounded-[10px] border border-border bg-surface p-8 sm:p-10">
            <h2 className="text-3xl font-semibold tracking-tight">
              Why Hyper Writes About AI Commerce
            </h2>

            <div className="mt-6 space-y-5 leading-8 text-muted-foreground">
              <p>
                Ecommerce is evolving rapidly as artificial intelligence transforms how customers
                discover products, ask questions, and make purchasing decisions. The Hyper Blog
                helps merchants understand these changes and apply practical strategies to their
                Shopify stores.
              </p>

              <p>
                Our content covers AI-powered product search, customer support automation, FAQ
                optimization, interactive shopping experiences, conversion optimization, and the
                future of online retail.
              </p>

              <p>
                Whether you’re launching a new store or scaling an established ecommerce brand,
                Hyper provides insights that help merchants build better customer experiences and
                prepare for the next generation of AI-driven shopping.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-20 sm:pb-24">
        <Container>
          <div className="rounded-[10px] border border-border bg-surface p-8 text-center sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Explore the Future of AI Commerce
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              Stay up to date with practical Shopify strategies, artificial intelligence trends,
              ecommerce innovations, and customer experience best practices designed to help
              merchants build better online stores.
            </p>

            <div className="mt-8">
              <Link
                href="/apps"
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,hsl(var(--brand-start))_0%,hsl(var(--brand-end))_100%)] px-7 py-3 text-sm font-medium text-primary-foreground shadow-[0_18px_36px_-18px_hsl(var(--primary)/0.7)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Explore Hyper Apps
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
