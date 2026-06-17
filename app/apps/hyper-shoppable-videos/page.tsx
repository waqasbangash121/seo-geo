import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Hyper Shoppable Videos – Interactive Video Commerce for Shopify",
  description:
    "Turn Shopify product videos into interactive shopping experiences with Hyper Shoppable Videos. Boost engagement, increase conversions, and enable direct purchasing from video content.",
  path: "/apps/hyper-shoppable-videos",
});

const features = [
  "Interactive shoppable product videos",
  "Direct add-to-cart from video content",
  "Mobile-optimized video commerce",
  "Higher engagement and retention",
  "Seamless Shopify integration",
  "Real-time product tagging in videos",
];

const benefits = [
  {
    title: "Increase Engagement",
    description:
      "Interactive videos capture attention longer than static images, keeping customers engaged with your products.",
  },
  {
    title: "Boost Conversions",
    description:
      "Allow customers to shop directly from videos, reducing friction and improving purchase rates.",
  },
  {
    title: "Modern Shopping Experience",
    description:
      "Deliver a TikTok-style shopping journey that feels natural, fast, and highly interactive.",
  },
];

export default function HyperShoppableVideosPage() {
  return (
    <>
      {/* HERO SECTION */}
      <Section className="pt-20 pb-12 sm:pt-28 lg:pt-32">
        <Container className="max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Hyper Apps
          </p>

          <h1 className="mt-4 type-display">Shoppable Videos for Shopify Commerce</h1>

          <p className="mx-auto mt-6 max-w-3xl type-body">
            Transform your product videos into interactive shopping experiences. Hyper Shoppable
            Videos lets customers explore, engage, and purchase products directly from video
            content—making ecommerce more dynamic and immersive.
          </p>
        </Container>
      </Section>

      {/* FEATURES SECTION */}
      <Section className="pb-20">
        <Container>
          <div className="rounded-[10px] border border-border bg-surface p-8 sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight">Core Features</h2>

            <p className="mt-4 text-muted-foreground leading-7">
              Designed for modern Shopify brands that want to combine storytelling with direct
              shopping experiences.
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
            <h2 className="text-3xl font-semibold tracking-tight">How Shoppable Videos Work</h2>

            <div className="mt-6 space-y-5 text-muted-foreground leading-8">
              <p>
                Hyper Shoppable Videos allows merchants to tag products directly inside video
                content, turning passive viewing into active shopping.
              </p>

              <p>
                When customers watch a video, they can instantly click on featured products, view
                details, and add items to cart without leaving the experience.
              </p>

              <p>
                This creates a seamless blend of entertainment and commerce, increasing both
                engagement time and conversion rates across Shopify stores.
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
              Turn Videos Into Sales Engines
            </h2>

            <p className="mx-auto mt-4 max-w-3xl type-body">
              Create immersive shopping experiences that combine storytelling and commerce. Hyper
              Shoppable Videos helps you increase engagement and convert viewers into customers.
            </p>

            <Link
              href="https://apps.shopify.com/hyper-shopable-videos"
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
