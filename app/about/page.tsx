import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "About Hyper",
  description:
    "Hyper builds AI-powered Shopify apps for product discovery, customer support, and video commerce. Improve search, engagement, and conversions with intelligent commerce tools.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Section className="pb-12 pt-20 sm:pt-28 lg:pt-32">
        <Container className="max-w-4xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
            About Hyper
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Hyper builds AI-powered Shopify apps that help merchants sell more.
          </h1>

          <p className="text-lg leading-8 text-muted-foreground">
            Hyper develops intelligent Shopify solutions designed to improve product discovery,
            automate customer support, and create engaging shopping experiences. Our mission is to
            help ecommerce businesses increase conversions, improve customer satisfaction, and grow
            revenue through practical AI technology.
          </p>

          <p className="text-lg leading-8 text-muted-foreground">
            Whether customers are searching for products, asking questions before purchasing, or
            discovering products through interactive videos, Hyper helps merchants deliver fast,
            personalized, and frictionless shopping experiences.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="hyper-platform" className="pb-20 sm:pb-24">
        <Container className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border bg-surface p-6">
            <h2 id="hyper-platform" className="text-2xl font-semibold tracking-tight">
              AI-powered product discovery
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Hyper Search & Filter helps Shopify stores deliver instant product search and advanced
              filtering. Customers can quickly find products by attributes such as size, color,
              category, and other custom options, improving shopping experiences while increasing
              conversion rates and average order value.
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold tracking-tight">AI customer support</h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Hyper AI Chat and FAQs provides automated customer assistance around the clock.
              Merchants can deploy AI chatbots and searchable FAQ pages to answer common questions,
              reduce support tickets, and help shoppers make confident buying decisions.
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold tracking-tight">Shop through video</h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Hyper Shopable Videos transforms product videos into interactive shopping experiences.
              Merchants can showcase products with engaging video content that encourages discovery
              and simplifies the path from inspiration to purchase.
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold tracking-tight">Built for modern ecommerce</h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Hyper is designed for Shopify merchants who want to combine AI, automation, and
              customer experience into a single growth strategy. Our apps are easy to install,
              require minimal setup, and help businesses compete in both traditional search engines
              and AI-driven shopping experiences.
            </p>
          </article>
        </Container>
      </Section>

      <Section className="pb-20">
        <Container className="max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight">Why merchants choose Hyper</h2>

          <div className="mt-6 space-y-4 text-muted-foreground leading-8">
            <p>
              Hyper combines artificial intelligence with practical ecommerce workflows to solve
              common challenges for Shopify stores. From helping shoppers find products faster to
              providing instant customer support and interactive product discovery, our apps are
              built to improve every stage of the customer journey.
            </p>

            <p>
              As ecommerce continues to evolve with AI-powered search and conversational shopping,
              Hyper is committed to building tools that help merchants stay visible, accessible, and
              ready for the future of online retail.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
