import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Shopify AI Apps for Search, Chat & Video Commerce | Hyper AI Tools",
  description:
    "Discover Hyper AI Shopify apps for smart product search, AI chat support, FAQs, and shoppable video commerce. Improve SEO, conversions, and customer experience with AI-powered ecommerce tools.",
  path: "/apps",
});

const apps = [
  {
    title: "Hyper AI Search & Filters",
    description:
      "Improve Shopify store SEO and conversions with AI-powered search, semantic product discovery, and intelligent filtering that helps customers find products instantly.",
    features: [
      "Semantic AI product search",
      "Advanced Shopify collection filters",
      "Faster product discovery",
      "Higher conversion rate",
      "Improved store navigation",
    ],
    href: "/apps/hyper-search-filter",
    cta: "Explore AI Search",
    icon: "/hyper-search.svg",
  },
  {
    title: "Hyper AI Chat & FAQs",
    description:
      "Reduce support load and increase sales with AI chatbots and intelligent FAQ systems that answer customer questions 24/7.",
    features: [
      "AI customer support chatbot",
      "Auto-generated FAQ pages",
      "24/7 instant responses",
      "Reduced support tickets",
      "Higher customer trust",
    ],
    href: "/apps/hyper-ai-chat-faq",
    cta: "Explore AI Chat",
    icon: "/hyper-aichat.svg",
  },
  {
    title: "Hyper Shoppable Videos",
    description:
      "Turn videos into interactive shopping experiences that increase engagement, improve SEO signals, and boost conversions.",
    features: [
      "Interactive shoppable videos",
      "Video-based product discovery",
      "Higher engagement rates",
      "Mobile-first commerce",
      "Seamless Shopify integration",
    ],
    href: "/apps/hyper-shoppable-videos",
    cta: "Explore Shoppable Videos",
    icon: "/hyper-videos.svg",
  },
];

export default function AppsPage() {
  return (
    <>
      {/* HERO (SEO optimized intro block) */}
      <Section className="pt-28 pb-16">
        <Container className="max-w-6xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
              Shopify AI Apps Suite
            </p>

            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">
              AI-Powered Shopify Apps for Search, Chat & Video Commerce
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-muted-foreground text-base sm:text-lg leading-7">
              Hyper provides a complete AI toolkit for Shopify merchants — including intelligent
              product search, AI customer support, FAQ automation, and shoppable video experiences
              designed to increase conversions and improve SEO performance.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                Talk to Hyper
              </Link>

              <Link href="#apps" className="text-sm font-medium text-primary underline">
                Explore Apps
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* SEO CONTENT BLOCK (important for GEO + ranking) */}
      <Section className="pb-16">
        <Container className="max-w-5xl">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">
              Why Shopify Stores Need AI Commerce Tools
            </h2>

            <div className="mt-5 space-y-5 text-muted-foreground leading-7">
              <p>
                Modern ecommerce success depends on fast product discovery, intelligent customer
                support, and engaging shopping experiences. Without AI, most Shopify stores struggle
                with poor search relevance and high support load.
              </p>

              <p>
                Hyper solves this with AI-powered Shopify apps that improve product visibility,
                reduce friction in the buying journey, and increase conversion rates across all
                devices.
              </p>

              <p>
                These tools also enhance SEO performance by improving user engagement signals such
                as time on site, interaction rate, and product discovery depth.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* APPS GRID (conversion-focused cards) */}
      <Section id="apps" className="pb-16">
        <Container className="max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center">
            Hyper AI Shopify Apps
          </h2>

          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Choose from our suite of AI-powered tools built to improve search, support, and
            engagement in your Shopify store.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {apps.map((app) => (
              <Link
                key={app.title}
                href={app.href}
                className="group rounded-2xl border border-border bg-surface p-7 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <Image
                  src={app.icon}
                  alt={`${app.title} logo`}
                  width={42}
                  height={42}
                  className="rounded-md object-contain"
                />

                <h3 className="mt-4 text-lg font-semibold">{app.title}</h3>

                <p className="mt-2 text-sm text-muted-foreground leading-6">{app.description}</p>

                <ul className="mt-5 space-y-2">
                  {app.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary">•</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 text-sm font-medium text-primary">{app.cta} →</div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* BENEFITS SECTION (SEO + trust builder) */}
      <Section className="pb-16">
        <Container className="max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Increase Shopify Conversions",
                desc: "Improve product discovery and reduce friction in the buying journey using AI-powered tools.",
              },
              {
                title: "Improve SEO Performance",
                desc: "Better engagement signals, lower bounce rate, and improved internal search indexing behavior.",
              },
              {
                title: "Reduce Support Load",
                desc: "Automate FAQs and customer queries using AI chat systems available 24/7.",
              },
              {
                title: "Enhance User Experience",
                desc: "Make shopping faster, smarter, and more interactive with AI-driven commerce tools.",
              },
            ].map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-surface p-6">
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ SECTION (VERY IMPORTANT FOR SEO/GEO) */}
      <Section className="pb-20">
        <Container className="max-w-4xl">
          <h2 className="text-2xl font-semibold text-center">Frequently Asked Questions</h2>

          <div className="mt-8 space-y-5">
            {[
              {
                q: "What are Shopify AI apps?",
                a: "They are tools that use artificial intelligence to improve product search, customer support, and shopping experiences in Shopify stores.",
              },
              {
                q: "Do AI apps improve SEO?",
                a: "Yes. AI improves user engagement, reduces bounce rate, and increases interaction depth, which helps SEO performance.",
              },
              {
                q: "Can Hyper replace my support team?",
                a: "It can automate most common queries using AI chat and FAQ systems, reducing support workload significantly.",
              },
            ].map((f) => (
              <div key={f.q} className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="pb-24">
        <Container className="max-w-5xl">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Ready to Upgrade Your Shopify Store with AI?
            </h2>

            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Start using Hyper AI apps to improve search, automate support, and increase
              conversions with intelligent commerce experiences.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
