import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import TrackLink from "@/components/TrackLink";
import PricingComponent from "@/components/PricingComponent";
import dynamic from "next/dynamic";

const CardStack = dynamic(() => import("@/components/CardStack").then((m) => m.CardStack), {
  // Reserve the same height the stack renders at (cardHeight={420} below)
  // so the page doesn't jump once the lazy chunk loads.
  loading: () => (
    <div className="h-[420px] w-full max-w-3xl animate-pulse rounded-2xl bg-surface" />
  ),
});

export const metadata = createPageMetadata({
  title: "Hyper AI Search - Semantic Search & Smart Filters for Shopify",
  description:
    "Replace Shopify's default keyword search with semantic product discovery. Hyper AI Search indexes up to 200,000 products, returns typo-tolerant results, and filters by any metafield - no code required.",
  path: "/apps/hyper-ai-search",
});

/* DATA */
const features = [
  "Vector-based semantic search",
  "Typo-tolerant product discovery",
  "Metafield & variant filters",
  "Real-time Shopify webhook sync",
];

const seoBenefits = [
  {
    icon: "🧠",
    title: "Semantic Search",
    desc: "Understand customer intent instead of matching exact keywords.",
  },
  {
    icon: "🎯",
    title: "NLP Intent Mapping",
    desc: "Interpret what shoppers mean, even when they use different terminology.",
  },
  {
    icon: "⚡",
    title: "Instant Autocomplete",
    desc: "Show products, collections, and popular searches as customers type.",
  },
  {
    icon: "📈",
    title: "Smart Merchandising",
    desc: "Boost products, pin results, and optimize product discovery for revenue.",
  },
];

const benefits = [
  {
    id: 1,
    title: "Vector-Based Semantic Search",
    description:
      "Convert search queries and product data into semantic embeddings for highly relevant results.",
    imageSrc: "/search-benefit-1.png",
    alt: "Vector-based semantic search for Shopify product discovery",
  },
  {
    id: 2,
    title: "Advanced Collection Filters",
    description: "Create filters from metafields, variants, tags, and custom attributes.",
    imageSrc: "/search-benefit-2.png",
    alt: "Advanced Shopify collection and metafield filters",
  },
  {
    id: 3,
    title: "Instant Autocomplete",
    description: "Display products, collections, and popular searches while customers type.",
    imageSrc: "/search-benefit-3.png",
    alt: "Instant autocomplete search suggestions for Shopify stores",
  },
  {
    id: 4,
    title: "Smart Merchandising Controls",
    description: "Pin products, create boost rules, and improve search relevance.",
    imageSrc: "/search-benefit-4.png",
    alt: "Smart merchandising controls and product ranking optimization",
  },
];

const pricingTiers = [
  {
    name: "Free",
    subtitle: "Free",
    price: "Free",
    description: "Launch advanced Shopify search and product filtering with essential features.",
    features: [
      { text: "Upto 50 products", included: true },
      { text: "Unlimited search queries", included: true },
      { text: "Real-time product sync", included: true },
      { text: "Typo tolerance", included: true },
      { text: "15 filters", included: true },
      { text: "7-day analytics", included: true },
      { text: "Basic support", included: true },
    ],
    buttonText: "Install Free",
    buttonVariant: "secondary" as const,
    buttonHref: "https://apps.shopify.com/hyper-search-product-filters",
  },
  {
    name: "Starter",
    subtitle: "Starter",
    price: "$15",
    period: "/mo",
    description: "Boost product discovery with unlimited filters and smarter Shopify search.",
    features: [
      { text: "Upto 5,000 products", included: true },
      { text: "Unlimited search queries", included: true },
      { text: "Custom CSS", included: true },
      { text: "50 synonyms", included: true },
      { text: "Unlimited filters", included: true },
      { text: "30-day analytics", included: true },
      { text: "Basic support", included: true },
    ],
    buttonText: "Install on Shopify",
    buttonHref: "https://apps.shopify.com/hyper-search-product-filters",
  },
  {
    name: "Professional",
    subtitle: "PROFESSIONAL",
    price: "$49",
    period: "/mo",
    description: "Optimize search relevance with analytics, synonyms, and advanced filtering.",
    badge: { text: "Most Popular" },
    features: [
      { text: "Upto 50,000 products", included: true },
      { text: "Remove branding", included: true },
      { text: "Custom CSS", included: true },
      { text: "Unlimited synonyms", included: true },
      { text: "Unlimited filters", included: true },
      { text: "Zero results reporting", included: true },
      { text: "1-year analytics", included: true },
      { text: "Filter usage analytics", included: true },
      { text: "Export/import data", included: true },
      { text: "Priority support", included: true },
    ],
    buttonText: "Install on Shopify",
    buttonVariant: "secondary" as const,
    buttonHref: "https://apps.shopify.com/hyper-search-product-filters",
    highlighted: true,
  },
  {
    name: "Enterprise",
    subtitle: "ENTERPRISE",
    price: "$119",
    period: "/mo",
    description: "Complete Shopify search and merchandising solution for high-volume brands.",
    features: [
      { text: "Upto 200,000 products", included: true },
      { text: "Unlimited filters", included: true },
      { text: "Custom CSS", included: true },
      { text: "Unlimited synonyms", included: true },
      { text: "Color & size swatches", included: true },
      { text: "Export/import data", included: true },
      { text: "Unlimited product labels", included: true },
      { text: "Unlimited analytics history", included: true },
      { text: "Zero results report", included: true },
      { text: "Dedicated priority support", included: true },
    ],
    buttonText: "Install on Shopify",
    buttonVariant: "secondary" as const,
    buttonHref: "https://apps.shopify.com/hyper-search-product-filters",
  },
];

const faqs = [
  {
    q: "Does Hyper AI Search replace Shopify's default search?",
    a: "Yes. Hyper AI Search replaces the storefront search experience while leaving Shopify admin search unchanged.",
  },
  {
    q: "How does semantic search handle technical terminology?",
    a: "The search engine understands intent and supports synonym mapping for industry-specific catalogs.",
  },
  {
    q: "Will the app slow down my storefront?",
    a: "No. Search requests are processed by Hyper infrastructure and the widget loads asynchronously.",
  },
  {
    q: "What happens when customers search for products with no matches?",
    a: "Professional and Enterprise plans support custom zero-results experiences and reporting.",
  },
  {
    q: "Is there a free trial available?",
    a: "Yes. Every paid plan includes a free trial before billing begins.",
  },
  {
    q: "Does Hyper AI Search work on mobile devices?",
    a: "Yes. The search experience is fully responsive and optimized for mobile commerce.",
  },
];

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hyper AI Search",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Shopify",

  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Starter",
      price: "15",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Professional",
      price: "49",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      price: "119",
      priceCurrency: "USD",
    },
  ],

  publisher: {
    "@type": "Organization",
    name: "Hyper Apps",
    url: "https://niagarat.com",
  },

  description:
    "Vector-based semantic search and smart filters for Shopify stores. Indexes up to 200,000 products, supports metafield filters, and deploys via app embed with no Liquid edits.",

  featureList: [
    "Vector-based semantic search",
    "NLP intent mapping",
    "Typo tolerance",
    "Metafield filters",
    "Real-time Shopify webhook sync",
    "Instant autocomplete",
    "Smart merchandising controls",
    "Zero-results reporting",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function HyperSearchFilterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {/* ================= HERO ================= */}
      <Section className="pt-24 sm:pt-28 lg:pt-32 pb-14">
        <Container className="max-w-5xl text-center">
          <div className="flex justify-center">
            <div className="flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-2 shadow-sm">
              <Image
                src="/hyper-search.svg"
                alt="Hyper AI Search"
                width={28}
                height={28}
                className="h-7 w-7 rounded-md object-contain"
              />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                Hyper AI Search
              </span>
            </div>
          </div>

          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Semantic Search and Smart Filters for Shopify Stores That Outgrow Basic Search
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-7">
            Hyper AI Search replaces Shopify&apos;s native keyword matching with vector-based
            semantic search. When shoppers search for products using natural language, the app
            returns relevant results, intelligent suggestions, and advanced filters across catalogs
            of up to 200,000 products.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackLink
              href="https://apps.shopify.com/hyper-search-product-filters"
              className="w-full sm:w-auto rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
              eventName="click_install_button"
            >
              Install on Shopify
            </TrackLink>

            <Link href="#features" className="text-sm font-medium text-primary underline">
              Explore Features
            </Link>
          </div>
        </Container>
      </Section>

      {/* ================= FEATURES ================= */}
      <Section id="features" className="py-20 lg:py-28">
        <Container className="max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center border border-border rounded-2xl bg-surface p-6 sm:p-10">
            {/* LEFT */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                  Core Features
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold">
                  The Problem That Keyword Search Cannot Fix
                </h2>

                <p className="text-muted-foreground text-base sm:text-lg leading-7 max-w-xl">
                  Shopify&apos;s default search relies heavily on keyword matching. When customers
                  search using different terminology than your catalog, they often receive poor
                  results or no results at all. Hyper AI Search uses NLP-powered intent mapping to
                  understand what shoppers mean, helping them discover products even when exact
                  keywords don&apos;t match.
                </p>
              </div>

              <div className="flex flex-col gap-6 pt-2">
                {features.map((feature) => (
                  <div key={feature} className="flex gap-4 items-start">
                    <Check className="w-5 h-5 mt-1 text-primary shrink-0" />

                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-sm sm:text-base">{feature}</p>
                      <p className="text-sm text-muted-foreground leading-6">
                        Helps customers find products faster and more accurately.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative">
              <div className="aspect-rectangle rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-border flex items-center justify-center overflow-hidden">
                <Image
                  src="/search-banner.png"
                  alt="AI Search Dashboard"
                  width={1200}
                  height={900}
                  className="opacity-80"
                />
              </div>

              {/* FLOATING BADGE (MISSING PIECE) */}
              <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-xl px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">
                  ⚡ AI Search → Instant Results → Conversion
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* SEO BENEFITS */}
      <Section className="pb-20">
        <Container className="max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
              Shopify Search Intelligence
            </p>

            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              Increase Shopify Conversions with AI-Powered Product Discovery
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-sm sm:text-base text-muted-foreground leading-7">
              Explore how AI search and smart filters improve product discovery, reduce friction in
              the shopping journey, and increase conversion rates for modern Shopify stores. Each
              benefit below is based on real-world ecommerce behavior: intent understanding, faster
              navigation, and seamless product discovery experiences.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <CardStack
              items={benefits.map((b) => ({
                id: b.id,
                title: b.title,
                imageSrc: b.imageSrc,
              }))}
              cardHeight={420}
              autoAdvance={true}
              intervalMs={3500}
            />
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {seoBenefits.map((item) => (
              <div
                key={item.title}
                className="
        rounded-3xl
        border
        border-border
        bg-surface
        p-8
        transition-all
        duration-300
        hover:border-primary/30
        hover:shadow-xl
      "
              >
                <div className="text-4xl">{item.icon}</div>

                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* HOW IT WORKS */}
      <Section className="py-20 lg:py-24">
        <Container className="max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              How It Works
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              How the Search Index Works
            </h2>

            <p className="mt-5 text-muted-foreground leading-7">
              Hyper AI Search builds a semantic search index of your Shopify catalog and keeps it
              synchronized in real time using Shopify webhooks. Product updates, inventory changes,
              and new variants are reflected automatically.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                step: "01",
                icon: "📦",
                title: "Catalog Indexing",
                description:
                  "Hyper AI Search crawls your Shopify catalog and builds a search index within minutes.",
              },
              {
                step: "02",
                icon: "🧠",
                title: "Semantic Understanding",
                description:
                  "Queries and products are converted into vector embeddings so the engine can understand intent rather than exact wording.",
              },
              {
                step: "03",
                icon: "⚡",
                title: "Real-Time Sync",
                description:
                  "Inventory changes, new products, and product updates sync automatically through Shopify webhooks.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="
            group relative overflow-hidden rounded-3xl
            border border-border
            bg-linear-to-b from-background to-surface
            p-8
            transition-all duration-300
            hover:-translate-y-1
            hover:border-primary/40
            hover:shadow-xl
          "
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">Step {item.step}</span>

                  <span className="text-3xl">{item.icon}</span>
                </div>

                <h3 className="relative z-10 mt-6 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>

                <p className="relative z-10 mt-4 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-surface p-8 sm:p-10">
            <h3 className="text-2xl font-semibold tracking-tight">
              Enterprise Search Capabilities for Shopify
            </h3>

            <p className="mt-5 text-muted-foreground leading-8">
              Hyper AI Search combines semantic search, advanced filtering, autocomplete,
              merchandising controls, and analytics in a single Shopify app. The platform supports
              catalogs up to 200,000 products while maintaining fast response times and accurate
              product discovery.
            </p>
          </div>
        </Container>
      </Section>

      <PricingComponent
        productName="Hyper Search and Filters"
        title="Pricing for Hyper Search & Filters"
        subtitle="Shopify search and filter plans for growing ecommerce stores. Enhance product discovery with instant search, advanced collection filters, smart merchandising, and optimized shopping experiences."
        tiers={pricingTiers}
      />
      <Section className="py-20">
        <Container className="max-w-5xl">
          <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10">
            <h2 className="text-3xl font-semibold tracking-tight">Setup and Compatibility</h2>

            <div className="mt-6 space-y-5 text-muted-foreground leading-8">
              <p>
                Hyper AI Search works with Shopify Online Store 2.0 themes including Dawn, Refresh,
                Sense, Spotlight, and most modern Shopify themes.
              </p>

              <p>Installation uses Shopify app embeds and requires no Liquid code modifications.</p>

              <p>Compatible with PageFly, GemPages, Shogun, and other popular page builders.</p>

              <p>
                Product updates sync automatically using Shopify webhook APIs, ensuring search
                results remain accurate as inventory changes.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="py-20 lg:py-24">
        <Container className="max-w-5xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              FAQ
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              Frequently Asked Questions About Shopify AI Search
            </h2>

            <p className="mt-5 text-muted-foreground leading-7">
              Learn how Hyper AI Search helps Shopify merchants improve product discovery, reduce
              shopping friction, and increase conversion rates.
            </p>
          </div>

          <div className="mt-14 space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className="
            group rounded-3xl
            border border-border
            bg-surface
            p-6 sm:p-8
            transition-all duration-300
            hover:border-primary/30
            hover:shadow-lg
          "
              >
                <div className="flex items-start gap-5">
                  <div
                    className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-primary/10
              text-sm font-semibold text-primary
            "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{faq.q}</h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 text-center">
            <h3 className="text-2xl font-semibold">Why Shopify Merchants Choose Hyper AI Search</h3>

            <p className="mt-5 text-muted-foreground leading-8 max-w-3xl mx-auto">
              Hyper AI Search helps Shopify businesses transform traditional product search into
              intelligent discovery experiences. By combining semantic search with smart filters,
              merchants can improve customer engagement, increase product findability, and create
              seamless shopping journeys that drive higher conversion rates.
            </p>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="pb-24 pt-8">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-surface p-8 sm:p-12 lg:p-16">
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="flex justify-center">
                <span className="inline-flex rounded-full border border-border px-4 py-1 text-xs font-medium text-muted-foreground">
                  Shopify AI Search
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-6 text-center text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                Turn Search Into Revenue
              </h2>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-3xl text-center text-base sm:text-lg leading-8 text-muted-foreground">
                Hyper AI Search helps Shopify merchants improve product discovery, reduce friction,
                and increase conversions by turning search into an intelligent shopping experience.
              </p>

              {/* Feature Pills */}
              <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="rounded-full border border-border px-4 py-2">🔍 Smart Search</div>
                <div className="rounded-full border border-border px-4 py-2">
                  ⚡ Instant Results
                </div>
                <div className="rounded-full border border-border px-4 py-2">
                  📈 Higher Conversions
                </div>
                <div className="rounded-full border border-border px-4 py-2">
                  🧠 AI Understanding
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <TrackLink
                  href="https://apps.shopify.com/hyper-search-product-filters"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-medium text-white hover:opacity-90 transition"
                  eventName="click_install_button"
                >
                  Install on Shopify
                </TrackLink>

                <Link
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-border px-8 py-4 text-sm font-medium hover:bg-surface transition"
                >
                  Explore Features
                </Link>
              </div>

              {/* Trust line */}
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Built for Shopify brands focused on scaling through AI-powered product discovery.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
