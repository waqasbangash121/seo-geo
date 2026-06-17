import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Hyper AI Chat & FAQs – Shopify AI Customer Support Automation",
  description:
    "Automate Shopify customer support with Hyper AI Chat & FAQs. Provide instant answers, reduce support tickets, and improve conversions with AI-powered conversational support.",
  path: "/apps/hyper-ai-chat-faq",
});

const features = [
  "AI-powered customer support chat",
  "Automated FAQ generation and responses",
  "24/7 instant reply system",
  "Reduces support workload",
  "Smart product & order assistance",
  "Improves customer satisfaction",
];

const benefits = [
  {
    title: "Instant Customer Support",
    description:
      "Provide real-time answers to customer questions without delays or manual support.",
  },
  {
    title: "Reduce Support Costs",
    description: "Automate repetitive queries and significantly reduce support team workload.",
  },
  {
    title: "Increase Conversions",
    description:
      "Help customers make faster buying decisions with instant product and policy answers.",
  },
];

const faqs = [
  {
    q: "What is AI chat for Shopify?",
    a: "It is an automated support system that answers customer questions using artificial intelligence trained on your store data.",
  },
  {
    q: "Can it replace human support agents?",
    a: "It handles most repetitive queries, reducing workload, but complex cases can still be escalated to humans.",
  },
  {
    q: "Does it improve sales?",
    a: "Yes. Faster responses increase customer confidence and reduce cart abandonment.",
  },
];

export default function HyperAIChatFAQPage() {
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
                alt="Hyper AI Shopify Apps"
                width={28}
                height={28}
                className="h-7 w-7 rounded-md object-contain"
              />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                Hyper AI Chat & FAQs
              </span>
            </div>
          </div>

          {/* CATEGORY */}
          <p className="mt-6 text-xs sm:text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
            AI Customer Support Automation for Shopify
          </p>

          {/* TITLE */}
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            AI Chat & Smart FAQs for Shopify Customer Support
          </h1>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-6 max-w-3xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-7">
            Automate customer support with intelligent AI chat and FAQ systems. Hyper helps Shopify
            stores deliver instant answers, reduce support tickets, and improve customer
            satisfaction 24/7.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://apps.shopify.com/hyper-chatbot-and-faqs"
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

      {/* PROBLEM SECTION (SEO BOOST) */}
      <Section className="pb-16">
        <Container className="max-w-4xl">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Why Shopify Stores Need AI Customer Support
            </h2>

            <div className="mt-5 space-y-5 text-muted-foreground leading-7">
              <p>
                Most ecommerce stores struggle with slow customer support responses, leading to lost
                sales and frustrated customers.
              </p>

              <p>
                Hyper AI Chat solves this by providing instant, accurate answers using intelligent
                automation trained on your store data.
              </p>

              <p>
                This improves user experience, increases trust, and reduces support costs
                significantly.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FEATURES */}
      <Section id="features" className="pb-16">
        <Container className="max-w-6xl">
          <h2 className="text-center text-2xl sm:text-3xl font-semibold tracking-tight">
            Core Features of Hyper AI Chat
          </h2>

          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            A complete AI support system built for modern Shopify merchants.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f}
                className="rounded-xl border border-border bg-surface p-5 hover:border-primary/40 transition"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                  <p className="text-sm text-muted-foreground leading-6">{f}</p>
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
              How Hyper AI Chat Works
            </h2>

            <div className="mt-5 space-y-5 text-muted-foreground leading-7">
              <p>
                Hyper AI Chat integrates directly into your Shopify store and learns from your
                product catalog, policies, and FAQs.
              </p>

              <p>
                It uses natural language processing to understand customer questions and provide
                instant, accurate responses.
              </p>

              <p>
                Over time, it improves accuracy and reduces the need for manual support
                intervention.
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
              Automate Your Shopify Customer Support Today
            </h2>

            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Reduce support workload, increase conversions, and deliver instant customer
              satisfaction with Hyper AI Chat.
            </p>

            <Link
              href="https://apps.shopify.com/hyper-chatbot-and-faqs"
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
