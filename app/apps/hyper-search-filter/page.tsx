import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import TrackLink from "@/components/TrackLink";
import PricingComponent from "@/components/PricingComponent";
import dynamic from "next/dynamic";

const CardStack = dynamic(
  () => import("@/components/CardStack").then((m) => m.CardStack),
  {
    // Reserve the same height the stack renders at (cardHeight={420} below)
    // so the page doesn't jump once the lazy chunk loads.
    loading: () => (
      <div className="h-[420px] w-full max-w-3xl animate-pulse rounded-2xl bg-surface" />
    ),
  }
);

export const metadata = createPageMetadata({
  title: "Hyper AI Search – AI-Powered Shopify Search & Product Discovery",
  description:
    "Hyper AI Search helps Shopify stores improve product discovery using AI-powered semantic search, smart filters, autocomplete, and personalized shopping experiences.",
  path: "/apps/hyper-ai-search",
});

/* DATA */
const features = [
  "AI-powered semantic search",
  "Intent-based product discovery",
  "Advanced collection filters",
  "Instant search suggestions",
];

const seoBenefits = [
  {
    icon: "🔍",
    title: "AI Product Discovery",
    desc: "Understand customer intent instead of exact keyword matching.",
  },
  {
    icon: "⚡",
    title: "Faster Shopping",
    desc: "Instant results reduce friction and improve browsing speed.",
  },
  {
    icon: "📈",
    title: "Higher Conversions",
    desc: "Better product discovery leads to more purchases.",
  },
  {
    icon: "🧠",
    title: "Intent-Based Search",
    desc: "AI understands meaning behind queries for better results.",
  },
];

const benefits = [
  {
    id: 1,
    title: "Find Products Faster",
    description: "AI understands customer intent and delivers relevant products instantly.",
    imageSrc: "/search-benefit-1.png",
  },
  {
    id: 2,
    title: "Reduce Shopping Friction",
    description: "Smart filters simplify navigation and improve UX.",
    imageSrc: "/search-benefit-2.png",
  },
  {
    id: 3,
    title: "Increase Conversions",
    description: "Better discovery directly improves purchase rate.",
    imageSrc: "/search-benefit-4.png",
  },
  {
    id: 4,
    title: "In-depth Analytics",
    description: "Gain insights into customer behavior and search patterns.",
    imageSrc: "/search-benefit-3.png",
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
    q: "What is AI product search?",
    a: "AI search understands intent instead of relying only on keyword matching.",
  },
  {
    q: "Does it replace Shopify search?",
    a: "No. It enhances Shopify search with AI-powered discovery.",
  },
  {
    q: "Can it improve conversions?",
    a: "Yes. Better discovery improves purchase behavior.",
  },
  {
    q: "Is it mobile friendly?",
    a: "Yes. It is fully optimized for mobile commerce.",
  },
  {
    q: "Can it handle large catalogs?",
    a: "Yes. It scales for large Shopify stores.",
  },
  {
    q: "Is coding required to use Hyper AI Search?",
    a: "No. Hyper AI Search is designed as a plug-and-play Shopify app with an easy setup process.",
  },
];

export default function HyperSearchFilterPage() {
  return (
    <>
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
            AI Search & Smart Filters for Shopify Stores
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-7">
            Help customers discover products faster with AI-powered semantic search, smart filters,
            autocomplete, and personalized recommendations.
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
                  AI Search Built for Shopify Growth
                </h2>

                <p className="text-muted-foreground text-base sm:text-lg leading-7 max-w-xl">
                  Hyper AI Search improves product discovery using semantic understanding and
                  intelligent ranking.
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
              How AI Search Converts Visitors Into Buyers
            </h2>

            <p className="mt-5 text-muted-foreground leading-7">
              Hyper AI Search transforms traditional keyword search into intelligent product
              discovery. Customers can find products faster, explore relevant results, and purchase
              with fewer steps in their shopping journey.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                step: "01",
                icon: "🔍",
                title: "Understand Customer Intent",
                description:
                  "AI analyzes what customers actually mean when they search, going beyond exact keyword matching to deliver relevant results.",
              },
              {
                step: "02",
                icon: "⚡",
                title: "Show Smart Results",
                description:
                  "Products are ranked intelligently based on relevance, popularity, and customer behavior to surface the best matches instantly.",
              },
              {
                step: "03",
                icon: "🛒",
                title: "Drive Conversions",
                description:
                  "Faster product discovery reduces friction and helps customers reach checkout sooner with more confidence in their purchase decisions.",
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
              Why AI Search Matters for Shopify Brands
            </h3>

            <p className="mt-5 text-muted-foreground leading-8">
              Intelligent product search combines semantic understanding with smart filtering, helping
              Shopify merchants increase customer engagement, improve product discovery, and reduce
              friction during the buying process. By enabling shoppers to find products faster with
              AI-powered results, businesses can create modern shopping experiences that encourage
              higher conversion rates and stronger customer retention.
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
            <h3 className="text-2xl font-semibold">
              Why Shopify Merchants Choose Hyper AI Search
            </h3>

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