import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { CardStack } from "@/components/CardStack";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

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
    title: "Improve SEO Performance",
    description: "Better engagement signals improve ranking and organic visibility.",
    imageSrc: "/shopable-benefit-3.png",
  },
];

const faqs = [
  {
    q: "What are shoppable videos in Shopify?",
    a: "They are interactive videos where customers can click products inside the video and purchase instantly.",
  },
  {
    q: "Do shoppable videos increase sales?",
    a: "Yes, they reduce friction and increase engagement, which directly improves conversion rates.",
  },
  {
    q: "Is coding required to use Hyper Shoppable Videos?",
    a: "No, it is a plug-and-play Shopify app.",
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
            <Link
              href="https://apps.shopify.com/hyper-shopable-videos"
              className="w-full sm:w-auto rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
            >
              Install on Shopify
            </Link>

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
                imageSrc: b.imageSrc,
              }))}
              cardHeight={420}
              autoAdvance={true}
              intervalMs={3500}
            />
          </div>

          {/* SEO SUPPORT CONTENT (IMPORTANT FOR GEO) */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">Shoppable Video Commerce for Shopify Stores</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-6">
                Turn passive video viewers into active buyers by allowing customers to interact with
                products directly inside video content without leaving the shopping experience.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">
                Improve Engagement Signals for SEO Performance
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-6">
                Longer session duration, higher interaction rates, and improved product discovery
                signals help strengthen organic search visibility for Shopify product pages.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">Reduce Friction in the Buying Journey</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-6">
                Customers can explore, view, and purchase products instantly from video content,
                removing unnecessary steps between discovery and checkout.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      {/* HOW IT WORKS */}
      <Section className="pb-16">
        <Container className="max-w-4xl">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              How Shoppable Videos Work
            </h2>

            <div className="mt-5 space-y-5 text-muted-foreground leading-7">
              <p>Merchants upload product videos and tag items directly inside the content.</p>

              <p>
                Customers can click on products while watching and instantly view or purchase them.
              </p>

              <p>
                This transforms passive viewing into active shopping and increases conversions
                significantly.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      {/* FAQ (SEO + GEO BOOST) */}
      <Section className="pb-16">
        <Container className="max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center">
            Frequently Asked Questions
          </h2>

          <div className="mt-8 space-y-5">
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
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Turn Your Videos Into Sales Engines
            </h2>

            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Increase engagement and conversions with interactive video commerce built for Shopify.
            </p>

            <Link
              href="https://apps.shopify.com/hyper-shopable-videos"
              className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Install Now
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
