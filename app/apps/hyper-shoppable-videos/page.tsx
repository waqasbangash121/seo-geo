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
  title: "Hyper Shoppable Videos – Shopify Video Commerce & Interactive Shopping",
  description:
    "Turn Shopify product videos into interactive shopping experiences. Hyper Shoppable Videos enables direct add-to-cart from video content, boosting engagement and conversions.",
  path: "/apps/hyper-shoppable-videos",
});

const features = [
  "Interactive shoppable product videos",
  "Direct add-to-cart from videos",
  "Real-time product tagging",
  "Seamless Shopify integration",
];

const seoBenefits = [
  {
    icon: "🎥",
    title: "Interactive Product Videos",
    desc: "Create immersive shopping experiences by tagging products directly inside videos.",
  },
  {
    icon: "🛒",
    title: "Direct Add-to-Cart",
    desc: "Allow customers to purchase products instantly without interrupting video playback.",
  },
  {
    icon: "📈",
    title: "Higher Engagement Metrics",
    desc: "Increase time-on-site and product interactions that support Shopify growth.",
  },
  {
    icon: "⚡",
    title: "Improve Conversion Rates",
    desc: "Reduce friction between product discovery and checkout with seamless video commerce.",
  },
];

const benefits = [
  {
    id: 1,
    title: "Increase Engagement",
    description: "Interactive videos and AI experiences keep users on your store longer.",
    imageSrc: "/shopable-benefit-1.png",
  },
  {
    id: 2,
    title: "Boost Conversions",
    description: "Reduce friction and help customers buy faster with smart UX flows.",
    imageSrc: "/shopable-benefit-2.png",
  },
  {
    id: 3,
    title: "Manage Content Easily",
    description: "Better engagement signals improve ranking and organic visibility.",
    imageSrc: "/shopable-benefit-3.png",
  },
];
const pricingTiers = [
  {
    name: "Free",
    subtitle: "Free",
    price: "Free",
    description: "Add shoppable product videos to Shopify and improve customer engagement.",
    features: [
      { text: "5 videos", included: true },
      { text: "1 widget", included: true },
      { text: "1 tag/video", included: true },
      { text: "1000 monthly views", included: true },
      { text: "Basic analytics", included: true },
      { text: "Manual upload", included: true },
      { text: "TikTok import", included: true },
    ],
    buttonText: "Install Free",
    buttonVariant: "secondary" as const,
    buttonHref: "https://apps.shopify.com/hyper-shopable-videos",
  },
  {
    name: "Starter",
    subtitle: "Starter",
    price: "$19",
    period: "/mo",
    description:
      "Transform TikTok, Instagram, and UGC videos into shoppable storefront experiences.",
    features: [
      { text: "30 videos", included: true },
      { text: "5 widgets", included: true },
      { text: "3 tags/video", included: true },
      { text: "8000 monthly views", included: true },
      { text: "Standard analytics", included: true },
      { text: "Manual upload", included: true },
      { text: "TikTok import", included: true },
      { text: "10 AI matches/month", included: true },
    ],
    buttonText: "Install on Shopify",
    buttonHref: "https://apps.shopify.com/hyper-shopable-videos",
  },
  {
    name: "Growth",
    subtitle: "GROWTH",
    price: "$49",
    period: "/mo",
    description:
      "Optimize video commerce performance with analytics, branding, and advanced controls.",
    badge: { text: "Most Popular" },
    features: [
      { text: "200 videos", included: true },
      { text: "15 widgets", included: true },
      { text: "10 tags/video", included: true },
      { text: "40,000 monthly views", included: true },
      { text: "Advanced analytics", included: true },
      { text: "TikTok/Instagram uploads", included: true },
      { text: "75 AI matches/month", included: true },
      { text: "A/B testing", included: true },
    ],
    buttonText: "Install on Shopify",
    buttonVariant: "secondary" as const,
    buttonHref: "https://apps.shopify.com/hyper-shopable-videos",
    highlighted: true,
  },
  {
    name: "Pro",
    subtitle: "PRO",
    price: "$119",
    period: "/mo",
    description: "Complete Shopify video commerce solution with premium support and scalability.",
    features: [
      { text: "500 videos", included: true },
      { text: "Unlimited widgets", included: true },
      { text: "Unlimited tag/video", included: true },
      { text: "Unlimited monthly views", included: true },
      { text: "Advanced analytics", included: true },
      { text: "TikTok/Instagram uploads", included: true },
      { text: "300 AI matches/month", included: true },
      { text: "HeyGen import", included: true },
    ],
    buttonText: "Install on Shopify",
    buttonVariant: "secondary" as const,
    buttonHref: "https://apps.shopify.com/hyper-shopable-videos",
  },
];

const faqs = [
  {
    q: "What are shoppable videos for Shopify?",
    a: "Shoppable videos are interactive product videos that allow customers to click featured products, view details, and purchase directly while watching.",
  },
  {
    q: "How do shoppable videos increase sales?",
    a: "By reducing the number of steps between product discovery and checkout, shoppable videos improve customer engagement and conversion rates.",
  },
  {
    q: "Can customers add products to cart directly from videos?",
    a: "Yes. Hyper Shoppable Videos enables direct product interaction and add-to-cart functionality without interrupting the viewing experience.",
  },
  {
    q: "Does Hyper Shoppable Videos work with Shopify themes?",
    a: "Yes. The app integrates seamlessly with Shopify stores and is designed to work across modern Shopify themes.",
  },
  {
    q: "Do shoppable videos improve customer engagement?",
    a: "Interactive video commerce typically increases session duration, product interactions, and customer engagement compared to static product pages.",
  },
  {
    q: "Is coding required to use Hyper Shoppable Videos?",
    a: "No. Hyper Shoppable Videos is designed as a plug-and-play Shopify app with an easy setup process.",
  },
];

export default function HyperShoppableVideosPage() {
  return (
    <>
      {/* HERO */}
      <Section className="pt-24 sm:pt-28 lg:pt-32 pb-14">
        <Container className="max-w-5xl text-center">
          {/* BRAND BADGE */}
          <div className="flex justify-center">
            <div className="flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-2 shadow-sm">
              <Image
                src="/hyper-search.svg"
                alt="Hyper AI Shopify Apps"
                width={28}
                height={28}
                className="h-7 w-7 rounded-md object-contain"
              />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                Hyper Shoppable Videos
              </span>
            </div>
          </div>

          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Turn Product Videos Into Shoppable Experiences
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-7">
            Transform static product videos into interactive shopping journeys. Hyper Shoppable
            Videos lets customers explore, engage, and purchase directly from video content—creating
            a seamless video commerce experience.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackLink
              href="https://apps.shopify.com/hyper-shopable-videos"
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
      {/* FEATURES */}
      <Section id="features" className="py-20 lg:py-28">
        <Container className="max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center border border-border rounded-2xl bg-surface p-6 sm:p-10">
            {/* LEFT CONTENT */}
            <div className="flex flex-col gap-8">
              {/* BADGE */}
              <div>
                <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                  Core Features
                </span>
              </div>

              {/* HEADING */}
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold">
                  Powerful Shoppable Video Features for Shopify
                </h2>

                <p className="text-muted-foreground text-base sm:text-lg leading-7 max-w-xl">
                  Built for modern Shopify brands using video-first commerce strategies. Turn
                  engagement into direct sales with interactive shopping experiences.
                </p>
              </div>

              {/* FEATURES LIST (CHECK STYLE) */}
              <div className="flex flex-col gap-6 pt-2">
                {features.map((feature) => (
                  <div key={feature} className="flex gap-4 items-start">
                    <Check className="w-5 h-5 mt-1 text-primary shrink-0" />

                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-sm sm:text-base">{feature}</p>
                      <p className="text-sm text-muted-foreground leading-6">
                        Enhance shopping experience with this capability inside video commerce.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative">
              <div className="aspect-rectangle rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-border flex items-center justify-center overflow-hidden">
                {/* Replace with real product image or video preview */}
                <Image
                  src="/shoppable-banner.png"
                  alt="Shoppable Video Commerce Preview"
                  width={1200}
                  height={1200}
                  className="opacity-80"
                />
              </div>

              {/* FLOATING BADGE (optional premium feel) */}
              <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-xl px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">⚡ Video → Product → Purchase</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section className="pb-20">
        <Container className="max-w-6xl">
          {/* SEO HEADER */}
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
              Shopify Video Commerce Intelligence
            </p>

            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              Increase Shopify Conversions with Shoppable Video Experiences
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-sm sm:text-base text-muted-foreground leading-7">
              Explore how interactive shoppable videos improve product discovery, reduce friction in
              the buying journey, and increase conversion rates for modern Shopify stores. Each
              benefit below is based on real-world ecommerce behavior: engagement, attention
              retention, and seamless add-to-cart experiences directly inside video content.
            </p>
          </div>

          {/* CARD STACK */}
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
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              How It Works
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              How Shopify Shoppable Videos Turn Viewers Into Customers
            </h2>

            <p className="mt-5 text-muted-foreground leading-7">
              Hyper Shoppable Videos transforms traditional product videos into interactive shopping
              experiences. Customers can discover products, explore details, and purchase instantly
              without disrupting their browsing journey.
            </p>
          </div>

          {/* PROCESS */}
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                step: "01",
                icon: "🎥",
                title: "Upload Product Videos",
                description:
                  "Merchants upload product, promotional, or social commerce videos directly to their Shopify store and prepare them for interactive shopping.",
              },
              {
                step: "02",
                icon: "🏷️",
                title: "Tag Products in Real Time",
                description:
                  "Products are linked directly inside the video experience, allowing shoppers to view pricing, details, and variants while watching.",
              },
              {
                step: "03",
                icon: "🛒",
                title: "Enable Instant Purchases",
                description:
                  "Customers can add products to cart and complete purchases with fewer steps, creating a seamless video commerce experience.",
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
                {/* Background Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                </div>

                {/* Step */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">Step {item.step}</span>

                  <span className="text-3xl">{item.icon}</span>
                </div>

                {/* Title */}
                <h3 className="relative z-10 mt-6 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 mt-4 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* SEO BLOCK */}
          <div className="mt-14 rounded-3xl border border-border bg-surface p-8 sm:p-10">
            <h3 className="text-2xl font-semibold tracking-tight">
              Why Shoppable Videos Matter for Shopify Brands
            </h3>

            <p className="mt-5 text-muted-foreground leading-8">
              Interactive video commerce combines storytelling with direct purchasing, helping
              Shopify merchants increase customer engagement, improve product discovery, and reduce
              friction during the buying process. By enabling shoppers to interact with products
              directly inside video content, businesses can create modern shopping experiences that
              encourage higher conversion rates and stronger customer retention.
            </p>
          </div>
        </Container>
      </Section>
      <PricingComponent
        productName="Hyper Shoppable Videos"
        title="Pricing for Shoppable Videos"
        subtitle="Plans built for every Shopify store — create interactive shopping experiences, increase engagement, and improve conversion rates."
        tiers={pricingTiers}
      />

      {/* FAQ (SEO + GEO BOOST) */}
      <Section className="py-20 lg:py-24">
        <Container className="max-w-5xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              FAQ
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              Frequently Asked Questions About Shopify Shoppable Videos
            </h2>

            <p className="mt-5 text-muted-foreground leading-7">
              Learn how Hyper Shoppable Videos helps Shopify merchants create interactive shopping
              experiences, increase engagement, and improve conversion rates.
            </p>
          </div>

          {/* FAQ Cards */}
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
                  {/* Number */}
                  <div
                    className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-primary/10
              text-sm font-semibold text-primary
            "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{faq.q}</h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SEO Block */}
          <div className="mt-14 rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 text-center">
            <h3 className="text-2xl font-semibold">
              Why Shopify Merchants Choose Hyper Shoppable Videos
            </h3>

            <p className="mt-5 text-muted-foreground leading-8 max-w-3xl mx-auto">
              Hyper Shoppable Videos helps Shopify businesses transform traditional product videos
              into interactive shopping experiences. By combining video commerce with direct
              purchasing, merchants can improve customer engagement, increase product discovery, and
              create seamless buying journeys that drive higher conversion rates.
            </p>
          </div>
        </Container>
      </Section>
      {/* CTA */}
      {/* FINAL CTA */}
      <Section className="pb-24 pt-8">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-surface p-8 sm:p-12 lg:p-16">
            {/* Background Effects */}
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="flex justify-center">
                <span className="inline-flex rounded-full border border-border px-4 py-1 text-xs font-medium text-muted-foreground">
                  Shopify Video Commerce
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-6 text-center text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                Turn Product Videos Into Revenue
              </h2>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-3xl text-center text-base sm:text-lg leading-8 text-muted-foreground">
                Hyper Shoppable Videos helps Shopify merchants create interactive shopping
                experiences that increase customer engagement, improve product discovery, and enable
                direct purchases from video content. Build a modern video-first storefront that
                converts viewers into customers.
              </p>

              {/* Benefits */}
              <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="rounded-full border border-border px-4 py-2">
                  🎥 Interactive Videos
                </div>

                <div className="rounded-full border border-border px-4 py-2">
                  🛒 Direct Add-to-Cart
                </div>

                <div className="rounded-full border border-border px-4 py-2">
                  ⚡ Higher Conversions
                </div>

                <div className="rounded-full border border-border px-4 py-2">
                  📈 Better Engagement
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <TrackLink
                  href="https://apps.shopify.com/hyper-shopable-videos"
                  className="
              inline-flex items-center justify-center
              rounded-full
              bg-primary
              px-8 py-4
              text-sm font-medium
              text-white
              transition
              hover:opacity-90
            "
                  eventName="click_install_button"
                >
                  Install on Shopify
                </TrackLink>

                <Link
                  href="#features"
                  className="
              inline-flex items-center justify-center
              rounded-full
              border border-border
              px-8 py-4
              text-sm font-medium
              hover:bg-surface
              transition
            "
                >
                  Explore Features
                </Link>
              </div>

              {/* Trust Text */}
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Designed for Shopify brands looking to grow through interactive video commerce and
                modern customer experiences.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}