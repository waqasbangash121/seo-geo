import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { CardStack } from "@/components/CardStack";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import TrackLink from "@/components/TrackLink";
import PricingComponent from "@/components/PricingComponent";

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

const seoBenefits = [
  {
    icon: "💬",
    title: "Instant AI Responses",
    desc: "Provide real-time answers to customer queries without waiting for human support.",
  },
  {
    icon: "🧠",
    title: "AI-Powered FAQs",
    desc: "Automatically generate and optimize FAQ answers based on customer behavior.",
  },
  {
    icon: "⚡",
    title: "24/7 Support",
    desc: "Offer always-on support to improve customer trust and satisfaction.",
  },
  {
    icon: "📈",
    title: "Higher Conversions",
    desc: "Faster answers reduce drop-offs and improve purchase decisions.",
  },
];

const benefits = [
  {
    id: 1,
    title: "Instant Customer Support",
    description:
      "Provide real-time answers to customer questions without delays or manual support.",
    imageSrc: "/aichat-benefit-1.png",
  },
  {
    id: 2,
    title: "Reduce Support Costs",
    description: "Automate repetitive queries and significantly reduce support team workload.",
    imageSrc: "/aichat-benefit-2.png",
  },
  {
    id: 3,
    title: "Increase Conversions",
    description:
      "Help customers make faster buying decisions with instant product and policy answers.",
    imageSrc: "/aichat-benefit-3.png",
  },
  {
    id: 4,
    title: "Faster Issue Resolution",
    description: "Resolve customer issues quickly with AI-powered support and instant answers.",
    imageSrc: "/aichat-benefit-4.png",
  },
  {
    id: 5,
    title: "Store-Specific Intelligence",
    description:
      "Leverage AI trained on your store data to provide personalized and accurate responses.",
    imageSrc: "/aichat-benefit-5.png",
  },
];

const pricingTiers = [
  {
    name: "Free",
    subtitle: "Free",
    price: "Free",
    description:
      "Add a Shopify AI chatbot and searchable FAQs to answer customer questions instantly.",
    features: [
      { text: "Up to 50 AI replies/month", included: true },
      { text: "AI training", included: true },
      { text: "10 FAQs", included: true },
      { text: "Chat history(30 days)", included: true },
      { text: "Basic analytics", included: true },
      { text: "Email support", included: true },
    ],
    buttonText: "Install Free",
    buttonVariant: "secondary" as const,
    buttonHref: "https://apps.shopify.com/hyper-chatbot-and-faqs",
  },
  {
    name: "Starter",
    subtitle: "Starter",
    price: "$19",
    period: "/mo",
    description: "Automate customer support and product discovery with AI-powered Shopify chat.",
    features: [
      { text: "500 AI replies/month", included: true },
      { text: "AI training", included: true },
      { text: "25 FAQs", included: true },
      { text: "Chat history(180 days)", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom branding", included: true },
      { text: "Basic support", included: true },
    ],
    buttonText: "Install on Shopify",
    buttonHref: "https://apps.shopify.com/hyper-chatbot-and-faqs",
  },
  {
    name: "Growth",
    subtitle: "GROWTH",
    price: "$49",
    period: "/mo",
    description: "Improve customer experience with advanced chatbot analytics and FAQ automation.",
    badge: { text: "Most Popular" },
    features: [
      { text: "2500 AI replies/month", included: true },
      { text: "AI training", included: true },
      { text: "Unlimited FAQs", included: true },
      { text: "Chat history(365 days)", included: true },
      { text: "Custom branding", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Premium support", included: true },
    ],
    buttonText: "Install on Shopify",
    buttonVariant: "secondary" as const,
    buttonHref: "https://apps.shopify.com/hyper-chatbot-and-faqs",
    highlighted: true,
  },
  {
    name: "Pro",
    subtitle: "PRO",
    price: "$99",
    period: "/mo",
    description: "Complete AI customer support solution for high-volume Shopify stores and brands.",
    features: [
      { text: "10,000 AI replies/month", included: true },
      { text: "AI training", included: true },
      { text: "Unlimited FAQs", included: true },
      { text: "Chat history(unlimited)", included: true },
      { text: "White label branding", included: true },
      { text: "Enterprise analytics", included: true },
      { text: "Priority support", included: true },
    ],
    buttonText: "Install on Shopify",
    buttonVariant: "secondary" as const,
    buttonHref: "https://apps.shopify.com/hyper-chatbot-and-faqs",
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
  {
    q: "Is it available 24/7?",
    a: "Yes. AI Chat works around the clock to support customers anytime.",
  },
  {
    q: "Does Hyper AI Chat work with Shopify themes?",
    a: "Yes. The app integrates seamlessly with Shopify stores and is designed to work across modern Shopify themes.",
  },
  {
    q: "Is coding required to use Hyper AI Chat & FAQs?",
    a: "No. Hyper AI Chat & FAQs is designed as a plug-and-play Shopify app with an easy setup process.",
  },
];

export default function HyperAIChatFAQPage() {
  return (
    <>
      {/* HERO */}
      <Section className="pt-24 sm:pt-28 lg:pt-32 pb-14">
        <Container className="max-w-5xl text-center">
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

          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            AI Chat & Smart FAQs for Shopify Customer Support
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-7">
            Automate customer support with intelligent AI chat and FAQ systems. Hyper helps Shopify
            stores deliver instant answers, reduce support tickets, and improve customer
            satisfaction 24/7.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackLink
              href="https://apps.shopify.com/hyper-chatbot-and-faqs"
              eventName="click_install_button"
              className="w-full sm:w-auto rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
            >
              Install on Shopify
            </TrackLink>

            <Link href="#features" className="text-sm font-medium text-primary underline">
              Explore Features
            </Link>
          </div>
        </Container>
      </Section>

      {/* FEATURES (MATCHED TEMPLATE STYLE) */}
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
                  AI Support Built for Shopify Stores
                </h2>

                <p className="text-muted-foreground text-base sm:text-lg leading-7 max-w-xl">
                  Hyper AI Chat understands customer questions and responds instantly using your
                  store data.
                </p>
              </div>

              <div className="flex flex-col gap-6 pt-2">
                {features.map((feature) => (
                  <div key={feature} className="flex gap-4 items-start">
                    <Check className="w-5 h-5 mt-1 text-primary shrink-0" />

                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-sm sm:text-base">{feature}</p>
                      <p className="text-sm text-muted-foreground leading-6">
                        Intelligent automation improves response quality and speed.
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
                  src="/aichat-banner.png"
                  alt="AI Chat Dashboard"
                  width={1200}
                  height={900}
                  className="opacity-80"
                />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-xl px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">💬 Chat → Solve → Convert</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-20">
        <Container className="max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
              AI Customer Support Intelligence
            </p>

            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              Increase Shopify Conversions with AI-Powered Customer Support
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-sm sm:text-base text-muted-foreground leading-7">
              Explore how AI chat and automated FAQs improve customer satisfaction, reduce support
              workload, and increase conversion rates for modern Shopify stores. Each benefit below
              is based on real-world ecommerce behavior: instant responses, 24/7 availability, and
              seamless support experiences that keep customers moving toward purchase.
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
              How AI Chat Automates Support
            </h2>

            <p className="mt-5 text-muted-foreground leading-7">
              Hyper AI Chat transforms traditional customer support into intelligent automated
              experiences. Customers can get instant answers, explore product details, and resolve
              issues without waiting for human agents.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                step: "01",
                icon: "💬",
                title: "Customer Asks a Question",
                description:
                  "Shoppers submit product, order, or policy questions through the AI chat widget directly on your Shopify store.",
              },
              {
                step: "02",
                icon: "🧠",
                title: "AI Understands Intent",
                description:
                  "The system analyzes store data, FAQs, and product information to understand what the customer needs and provide accurate answers.",
              },
              {
                step: "03",
                icon: "⚡",
                title: "Instant Response Delivered",
                description:
                  "Customers receive immediate answers 24/7, reducing wait times and helping them make faster purchase decisions.",
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
              Why AI Chat Matters for Shopify Brands
            </h3>

            <p className="mt-5 text-muted-foreground leading-8">
              Automated customer support combines instant responses with store-specific intelligence,
              helping Shopify merchants increase customer satisfaction, reduce support costs, and
              improve conversion rates. By enabling shoppers to get answers immediately without
              waiting for human agents, businesses can create modern support experiences that
              encourage higher purchase confidence and stronger customer retention.
            </p>
          </div>
        </Container>
      </Section>
      <PricingComponent
        productName="Hyper AI Chat & FAQs"
        title="Pricing for AI Chat & FAQ Automation"
        subtitle="Plans built for every Shopify store — automate support, reduce tickets, and reply 24/7."
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
              Frequently Asked Questions About Shopify AI Chat & FAQs
            </h2>

            <p className="mt-5 text-muted-foreground leading-7">
              Learn how Hyper AI Chat & FAQs helps Shopify merchants automate customer support,
              reduce ticket volume, and improve customer satisfaction.
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
              Why Shopify Merchants Choose Hyper AI Chat & FAQs
            </h3>

            <p className="mt-5 text-muted-foreground leading-8 max-w-3xl mx-auto">
              Hyper AI Chat & FAQs helps Shopify businesses transform traditional customer support
              into intelligent automated experiences. By combining AI chat with smart FAQ automation,
              merchants can improve customer satisfaction, reduce support costs, and create seamless
              support journeys that drive higher conversion rates.
            </p>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="pb-24 pt-8">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-surface p-8 sm:p-12 lg:p-16">
            {/* Background Effects (IMPORTANT) */}
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="flex justify-center">
                <span className="inline-flex rounded-full border border-border px-4 py-1 text-xs font-medium text-muted-foreground">
                  AI Customer Support Automation
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-6 text-center text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                Turn Customer Questions Into Instant Conversions
              </h2>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-3xl text-center text-base sm:text-lg leading-8 text-muted-foreground">
                Hyper AI Chat helps Shopify merchants automate customer support with intelligent AI
                responses, reduce ticket volume, and improve customer satisfaction with 24/7 instant
                assistance.
              </p>

              {/* Benefits Pills (IMPORTANT PART YOU WERE MISSING) */}
              <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="rounded-full border border-border px-4 py-2">
                  💬 Instant AI Replies
                </div>

                <div className="rounded-full border border-border px-4 py-2">⚡ 24/7 Support</div>

                <div className="rounded-full border border-border px-4 py-2">
                  🧠 Smart FAQ Automation
                </div>

                <div className="rounded-full border border-border px-4 py-2">
                  📈 Higher Conversions
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <TrackLink
                  href="https://apps.shopify.com/hyper-chatbot-and-faqs"
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
                Built for Shopify stores that want scalable AI-driven customer support without
                hiring extra agents.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
