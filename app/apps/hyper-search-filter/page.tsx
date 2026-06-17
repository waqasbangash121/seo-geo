import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Hyper Search & Filters – AI Product Discovery for Shopify",
  description:
    "Improve Shopify product discovery with Hyper AI Search & Filters. Help customers find products faster using intelligent search, smart filtering, and personalized shopping experiences that boost conversions.",
  path: "/apps/hyper-search-filter",
});

const features = [
  "AI-powered semantic product search",
  "Advanced collection filtering system",
  "Fast and relevant product discovery",
  "Custom filter logic for Shopify collections",
  "Improved conversion through better UX",
  "Mobile-optimized search experience",
];

const benefits = [
  {
    title: "Increase Product Discoverability",
    description:
      "Help customers instantly find what they are looking for using intelligent search that understands intent, synonyms, and context.",
  },
  {
    title: "Reduce Shopping Friction",
    description:
      "Smart filters and fast search results eliminate confusion and help users quickly narrow down product choices.",
  },
  {
    title: "Boost Conversion Rates",
    description:
      "Better search experience leads directly to higher engagement and increased sales across your Shopify store.",
  },
];

export default function HyperSearchFilterPage() {
  return (
    <>
      {/* HERO SECTION */}
      <Section className="pt-20 pb-12 sm:pt-28 lg:pt-32">
        <Container className="max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Hyper Apps
          </p>

          <h1 className="mt-4 type-display">AI-Powered Search & Filters for Shopify Stores</h1>

          <p className="mx-auto mt-6 max-w-3xl type-body">
            Transform your Shopify store with intelligent search and advanced filtering. Hyper
            Search & Filters helps customers find products instantly using AI-powered relevance,
            improving product discovery and increasing conversions.
          </p>
        </Container>
      </Section>

      {/* FEATURES SECTION */}
      <Section className="pb-20">
        <Container>
          <div className="rounded-[10px] border border-border bg-surface p-8 sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight">Core Features</h2>

            <p className="mt-4 text-muted-foreground leading-7">
              Built for modern Shopify merchants who want to improve search performance and deliver
              a seamless shopping experience.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* BENEFITS SECTION */}
      <Section className="pb-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {benefits.map((item) => (
              <article
                key={item.title}
                className="rounded-[10px] border border-border bg-surface p-8"
              >
                <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* HOW IT WORKS SECTION */}
      <Section className="pb-20">
        <Container className="max-w-4xl">
          <div className="rounded-[10px] border border-border bg-surface p-8 sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight">How Hyper Search Works</h2>

            <div className="mt-6 space-y-5 text-muted-foreground leading-8">
              <p>
                Hyper uses AI to understand customer intent beyond keywords. Instead of relying on
                basic matching, it interprets meaning, context, and product relationships to deliver
                highly relevant results.
              </p>

              <p>
                Our system enhances Shopify’s native search with semantic understanding, ensuring
                customers always see the most relevant products first—even when their queries are
                vague or complex.
              </p>

              <p>
                Combined with advanced filtering options, merchants can offer dynamic shopping
                experiences that adapt to customer behavior in real time.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA SECTION */}
      <Section className="pb-24">
        <Container>
          <div className="rounded-[10px] border border-border bg-surface p-8 text-center sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight">
              Upgrade Your Shopify Search Experience
            </h2>

            <p className="mx-auto mt-4 max-w-3xl type-body">
              Give your customers a faster, smarter, and more intuitive way to find products. Hyper
              Search & Filters helps you increase conversions and improve overall store performance.
            </p>

            <Link
              href="https://apps.shopify.com/hyper-search-product-filters"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,hsl(var(--brand-start))_0%,hsl(var(--brand-end))_100%)] px-7 py-3 text-sm font-medium text-primary-foreground shadow-[0_18px_36px_-18px_hsl(var(--primary)/0.7)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Install Now
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
