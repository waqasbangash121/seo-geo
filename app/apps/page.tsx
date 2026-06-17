import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Shopify AI Apps for Search, Chat & Video Commerce",
  description:
    "Discover Hyper's AI-powered Shopify apps for product search and filters, AI chat and FAQs, and shoppable videos. Improve customer experience, increase conversions, and grow your ecommerce business.",
  path: "/apps",
});

const apps = [
  {
    title: "Hyper Search & Filters",
    description:
      "Help customers find products faster with AI-powered product search and advanced filtering. Improve product discovery, reduce friction, and increase Shopify store conversions with intelligent search experiences.",
    features: [
      "AI-powered product search",
      "Advanced collection filtering",
      "Fast product discovery",
      "Custom filter options",
      "Improved shopping experience",
    ],
    href: "/apps/search-filter",
    cta: "Explore Search & Filters",
  },
  {
    title: "Hyper AI Chat & FAQs",
    description:
      "Deliver instant customer support with AI chatbots and searchable FAQ experiences. Answer common questions automatically, reduce support workload, and help shoppers purchase with confidence.",
    features: [
      "AI customer support",
      "Smart FAQ pages",
      "24/7 automated responses",
      "Reduced support tickets",
      "Improved customer satisfaction",
    ],
    href: "/apps/ai-chat-faq",
    cta: "Explore AI Chat",
  },
  {
    title: "Hyper Shoppable Videos",
    description:
      "Turn product videos into interactive shopping experiences. Increase customer engagement, simplify product discovery, and create immersive ecommerce journeys that drive conversions.",
    features: [
      "Interactive product videos",
      "Video commerce experiences",
      "Higher customer engagement",
      "Mobile-friendly shopping",
      "Seamless Shopify integration",
    ],
    href: "/apps/shopable-videos",
    cta: "Explore Shoppable Videos",
  },
];

export default function AppsPage() {
  return (
    <>
      <Section className="pt-20 pb-12 sm:pt-28 lg:pt-32">
        <Container className="max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Hyper Apps
          </p>

          <h1 className="mt-4 type-display">AI-Powered Shopify Apps Built for Growth</h1>

          <p className="mx-auto mt-6 max-w-3xl type-body">
            Hyper builds intelligent Shopify apps that help merchants improve product discovery,
            automate customer support, and create engaging shopping experiences. Whether customers
            are searching for products, asking questions, or shopping through interactive videos,
            Hyper helps ecommerce brands increase conversions and customer satisfaction.
          </p>
        </Container>
      </Section>

      <Section className="pb-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {apps.map((app) => (
              <article
                key={app.title}
                className="rounded-[10px] border border-border bg-surface p-8"
              >
                <h2 className="text-2xl font-semibold tracking-tight">{app.title}</h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">{app.description}</p>

                <ul className="mt-6 space-y-3">
                  {app.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={app.href}
                  className="mt-8 inline-flex text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4"
                >
                  {app.cta}
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pb-20">
        <Container className="max-w-4xl">
          <div className="rounded-[10px] border border-border bg-surface p-8 sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight">
              Why Shopify Merchants Choose Hyper
            </h2>

            <div className="mt-6 space-y-5 text-muted-foreground leading-8">
              <p>
                Hyper combines artificial intelligence with practical ecommerce solutions to help
                Shopify merchants solve everyday challenges. Our apps are designed to improve every
                stage of the customer journey, from product discovery to post-purchase support.
              </p>

              <p>
                With AI-powered search, intelligent chatbots, searchable FAQs, and interactive
                shoppable videos, Hyper helps businesses create seamless shopping experiences that
                increase engagement and drive more sales.
              </p>

              <p>
                As online shopping continues to evolve with conversational AI and intelligent
                search, Hyper provides merchants with the tools they need to stay competitive and
                deliver exceptional customer experiences.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-24">
        <Container>
          <div className="rounded-[10px] border border-border bg-surface p-8 text-center sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight">
              Build Better Shopify Shopping Experiences
            </h2>

            <p className="mx-auto mt-4 max-w-3xl type-body">
              Discover how Hyper AI-powered Shopify apps can help your customers find products
              faster, receive instant support, and shop through engaging interactive experiences
              designed to improve conversions and long-term customer loyalty.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,hsl(var(--brand-start))_0%,hsl(var(--brand-end))_100%)] px-7 py-3 text-sm font-medium text-primary-foreground shadow-[0_18px_36px_-18px_hsl(var(--primary)/0.7)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Talk to Hyper
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
