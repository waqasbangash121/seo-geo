import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Hyper AI Chat & FAQs – Shopify AI Customer Support",
  description:
    "Automate Shopify customer support with Hyper AI Chat & FAQs. Provide instant answers, reduce support tickets, and improve customer satisfaction with intelligent conversational AI.",
  path: "/apps/hyper-ai-chat-faq",
});

const features = [
  "AI-powered customer support chat",
  "Automated FAQ generation and responses",
  "24/7 instant reply system",
  "Reduces customer support workload",
  "Smart product and order assistance",
  "Improves customer satisfaction and trust",
];

const benefits = [
  {
    title: "Instant Customer Support",
    description:
      "Answer customer questions immediately using AI chat, eliminating long wait times and improving user experience.",
  },
  {
    title: "Reduce Support Costs",
    description:
      "Automate repetitive queries and reduce dependency on human support teams, saving time and operational cost.",
  },
  {
    title: "Increase Conversions",
    description:
      "Help shoppers make confident purchase decisions by providing instant answers during the buying journey.",
  },
];

export default function HyperAIChatFAQPage() {
  return (
    <>
      {/* HERO SECTION */}
      <Section className="pt-20 pb-12 sm:pt-28 lg:pt-32">
        <Container className="max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Hyper Apps
          </p>

          <h1 className="mt-4 type-display">AI Chat & Smart FAQs for Shopify Stores</h1>

          <p className="mx-auto mt-6 max-w-3xl type-body">
            Deliver instant, intelligent customer support with Hyper AI Chat & FAQs. Automate
            responses, reduce support tickets, and help customers get answers 24/7 without waiting
            for human assistance.
          </p>
        </Container>
      </Section>

      {/* FEATURES SECTION */}
      <Section className="pb-20">
        <Container>
          <div className="rounded-[10px] border border-border bg-surface p-8 sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight">Core Features</h2>

            <p className="mt-4 text-muted-foreground leading-7">
              A complete AI support system designed for modern Shopify merchants who want to scale
              customer service without scaling costs.
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
            <h2 className="text-3xl font-semibold tracking-tight">How Hyper AI Chat Works</h2>

            <div className="mt-6 space-y-5 text-muted-foreground leading-8">
              <p>
                Hyper AI Chat uses advanced natural language processing to understand customer
                questions and provide accurate, context-aware responses in real time.
              </p>

              <p>
                It integrates directly into your Shopify store, learning from your product catalog,
                policies, and FAQs to deliver highly relevant answers.
              </p>

              <p>
                Over time, the system improves through continuous learning, reducing the need for
                manual support and ensuring consistent customer communication.
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
              Automate Your Shopify Support Today
            </h2>

            <p className="mx-auto mt-4 max-w-3xl type-body">
              Improve response times, reduce support workload, and increase customer satisfaction
              with AI-powered chat and FAQs built for ecommerce growth.
            </p>

            <Link
              href="https://apps.shopify.com/hyper-chatbot-and-faqs"
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
