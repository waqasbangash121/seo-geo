import Link from "next/link";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Hyper Search & Filters – AI Product Discovery for Shopify Stores",
  description:
    "Improve Shopify product discovery with AI-powered semantic search and smart filters. Help customers find products faster, increase conversions, and improve store UX with Hyper Search & Filters.",
  path: "/apps/hyper-search-filter",
});

const features = [
  "AI-powered semantic product search",
  "Intent-based search results (not keyword-only)",
  "Advanced Shopify collection filtering",
  "Fast, optimized product discovery",
  "Custom filter logic per collection",
  "Mobile-first search experience",
];

const benefits = [
  {
    title: "Increase Product Discoverability",
    description:
      "Help customers find exactly what they need using AI that understands meaning, not just keywords.",
  },
  {
    title: "Reduce Shopping Friction",
    description:
      "Smart filters and instant search results make browsing faster and easier for customers.",
  },
  {
    title: "Boost Conversion Rates",
    description: "Better product discovery directly increases add-to-cart rates and sales.",
  },
];

const faqs = [
  {
    q: "What is AI product search in Shopify?",
    a: "It is a smart search system that understands customer intent and shows more relevant products compared to traditional keyword search.",
  },
  {
    q: "Does Hyper Search replace Shopify default search?",
    a: "It enhances Shopify search by adding AI understanding, filtering, and smarter ranking of products.",
  },
  {
    q: "Will this improve SEO or just UX?",
    a: "It improves both UX and SEO signals like engagement time, bounce rate, and interaction depth.",
  },
];

export default function HyperSearchFilterPage() {
  return (
    <>
      {/* HERO */}
      <Section className="pt-24 sm:pt-28 lg:pt-32 pb-14">
        <Container className="max-w-5xl text-center">
          {/* LOGO BADGE */}
          <div className="flex justify-center">
            <div className="flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-2 shadow-sm">
              <Image
                src="/hyper-search.svg"
                alt="Hyper Search AI Shopify App Logo"
                width={28}
                height={28}
                className="h-7 w-7 rounded-md object-contain"
              />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                Hyper Search & Filters
              </span>
            </div>
          </div>

          {/* BADGE TEXT */}
          <p className="mt-6 text-xs sm:text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
            AI-Powered Shopify Product Discovery
          </p>

          {/* TITLE */}
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            AI-Powered Search & Filters for Shopify Product Discovery
          </h1>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-6 max-w-3xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-7">
            Improve your Shopify store with intelligent product search and advanced filtering. Hyper
            helps customers find products instantly using AI-powered relevance, increasing
            conversions and improving overall shopping experience.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://apps.shopify.com/hyper-search-product-filters"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium text-white shadow-md hover:opacity-90 transition"
            >
              Install on Shopify
            </Link>

            <Link href="#features" className="text-sm font-medium text-primary underline">
              Explore Features
            </Link>
          </div>
        </Container>
      </Section>

      {/* PROBLEM / SEO CONTEXT SECTION */}
      <Section className="pb-16">
        <Container className="max-w-4xl">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Why Shopify Stores Need Better Search
            </h2>

            <div className="mt-5 space-y-5 text-muted-foreground leading-7">
              <p>
                Most Shopify stores rely on basic keyword search that fails to understand customer
                intent. This leads to poor product discovery, frustrated users, and lost sales.
              </p>

              <p>
                Hyper Search solves this by using AI to understand meaning, context, and
                relationships between products — delivering more accurate and relevant results.
              </p>

              <p>
                This improves user experience, reduces bounce rates, and increases conversion rates
                across your store.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FEATURES */}
      <Section id="features" className="pb-16">
        <Container className="max-w-6xl">
          <h2 className="text-center text-2xl sm:text-3xl font-semibold tracking-tight">
            Core Features of Hyper Search & Filters
          </h2>

          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Built for modern Shopify merchants who want faster search, better discovery, and higher
            conversions.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-xl border border-border bg-surface p-5 hover:border-primary/40 transition"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                  <p className="text-sm text-muted-foreground leading-6">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* BENEFITS */}
      <Section className="pb-16">
        <Container className="max-w-6xl">
          <h2 className="text-center text-2xl sm:text-3xl font-semibold tracking-tight">
            Business Benefits
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-6">{b.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* HOW IT WORKS */}
      <Section className="pb-16">
        <Container className="max-w-4xl">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              How Hyper Search Works
            </h2>

            <div className="mt-5 space-y-5 text-muted-foreground leading-7">
              <p>
                Hyper uses AI models to understand customer intent beyond keywords. Instead of exact
                matches, it analyzes meaning and context.
              </p>

              <p>
                This allows Shopify stores to show more relevant products even when search queries
                are vague or complex.
              </p>

              <p>
                Combined with smart filters, merchants can deliver highly personalized shopping
                experiences in real time.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ (SEO + GEO BOOST) */}
      <Section className="pb-16">
        <Container className="max-w-4xl">
          <h2 className="text-center text-2xl sm:text-3xl font-semibold">
            Frequently Asked Questions
          </h2>

          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="pb-24">
        <Container className="max-w-5xl">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Upgrade Your Shopify Search Experience Today
            </h2>

            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Improve product discovery, increase conversions, and deliver a faster shopping
              experience with Hyper AI Search & Filters.
            </p>

            <Link
              href="https://apps.shopify.com/hyper-search-product-filters"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium text-white hover:opacity-90 transition"
            >
              Install Now
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
