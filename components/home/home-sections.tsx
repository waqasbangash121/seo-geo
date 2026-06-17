import Link from "next/link";
import type { ReactNode } from "react";

import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type SectionFrameProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
  align?: "left" | "center";
};

type StatItem = {
  label: string;
  value: string;
  detail: string;
};

type ProductItem = {
  name: string;
  pitch: string;
  outcome: string;
  href: string;
};

type BenefitItem = {
  title: string;
  detail: string;
};

type ProblemItem = {
  title: string;
  detail: string;
  impact: string;
};

type SolutionItem = {
  title: string;
  detail: string;
  channel: string;
};

type CaseStudyItem = {
  brand: string;
  result: string;
  summary: string;
  href: string;
};

type TestimonialItem = {
  quote: string;
  person: string;
  role: string;
};

type ArticleItem = {
  title: string;
  summary: string;
  href: string;
};

type ToolItem = {
  title: string;
  summary: string;
  href: string;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type HeroContent = {
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  geoFacts: readonly string[];
};

const productAccents = [
  {
    label: "AI Shopping Assistant",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    label: "Shoppable Videos",
    color: "text-[hsl(var(--brand-end))]",
    bg: "bg-[hsl(var(--brand-end)/0.12)]",
    border: "border-[hsl(var(--brand-end)/0.25)]",
  },
  {
    label: "Smart Search & Filters",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
];

const customerLogos = [
  "gymshark",
  "KYLIE COSMETICS",
  "allbirds",
  "HEXCLAD",
  "MVMT",
  "Peachy",
  "STEVE MADDEN",
];

function SectionFrame({
  id,
  eyebrow,
  title,
  description,
  children,
  align = "center",
}: SectionFrameProps) {
  const isCenter = align === "center";

  return (
    <Section aria-labelledby={id} spacing="md" className="border-t border-border bg-background">
      <Container>
        <header className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          {eyebrow ? (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h2 id={id} className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
        </header>
        <div className="mt-9">{children}</div>
      </Container>
    </Section>
  );
}

function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 min-w-36 items-center justify-center rounded-[6px] bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-16px_hsl(var(--primary)/0.85)] transition hover:bg-[hsl(var(--brand-end))]"
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 min-w-36 items-center justify-center rounded-[6px] border border-border bg-surface px-5 text-sm font-semibold text-foreground transition hover:border-primary hover:bg-muted"
    >
      {children}
    </Link>
  );
}

function MiniIcon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-[10px] border text-base font-bold ${className}`}
    >
      {children}
    </span>
  );
}

function CheckLine({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2 text-sm leading-6 text-muted-foreground">
      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
      <span>{children}</span>
    </li>
  );
}

function HeroOrbit() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center">
      <div className="absolute inset-[13%] rounded-full border border-primary/20" />
      <div className="absolute inset-[25%] rounded-full border border-dashed border-primary/30" />
      <div className="absolute inset-[38%] rounded-full border border-primary/20 bg-surface shadow-[0_20px_70px_-38px_hsl(var(--primary)/0.75)]" />
      <div className="absolute left-1/2 top-[8%] h-[74%] w-px -translate-x-1/2 bg-primary/20" />
      <div className="absolute left-[14%] top-1/2 h-px w-[72%] -translate-y-1/2 bg-primary/20" />
      <div className="absolute left-[24%] top-[24%] h-px w-[52%] rotate-45 bg-primary/20" />
      <div className="absolute right-[24%] top-[24%] h-px w-[52%] -rotate-45 bg-primary/20" />

      <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-surface shadow-[0_18px_50px_-28px_hsl(var(--primary)/0.8)]">
        <div className="flex size-14 items-center justify-center rounded-[14px] bg-primary text-2xl font-black text-primary-foreground">
          H
        </div>
      </div>

      <div className="absolute left-1/2 top-4 w-52 -translate-x-1/2 rounded-[14px] border border-primary/20 bg-surface p-4 shadow-[0_18px_55px_-34px_hsl(var(--primary)/0.75)]">
        <div className="flex items-center gap-3">
          <MiniIcon className="border-primary/20 bg-primary/10 text-primary">AI</MiniIcon>
          <div>
            <p className="text-sm font-bold text-primary">AI Chatbot</p>
            <p className="text-xs text-muted-foreground">Answer. Recommend. Convert.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 w-56 -translate-x-1/2 rounded-[14px] border border-primary/20 bg-surface p-4 shadow-[0_18px_55px_-34px_hsl(var(--primary)/0.72)]">
        <div className="flex items-center gap-3">
          <MiniIcon className="border-primary/20 bg-primary/10 text-primary">SF</MiniIcon>
          <div>
            <p className="text-sm font-bold text-primary">Smart Search & Filters</p>
            <p className="text-xs text-muted-foreground">Find. Filter. Convert.</p>
          </div>
        </div>
      </div>

      <div className="absolute right-2 top-[55%] w-48 rounded-[14px] border border-[hsl(var(--brand-end)/0.25)] bg-surface p-4 shadow-[0_18px_55px_-34px_hsl(var(--brand-end)/0.65)]">
        <div className="flex items-center gap-3">
          <MiniIcon className="border-[hsl(var(--brand-end)/0.25)] bg-[hsl(var(--brand-end)/0.12)] text-[hsl(var(--brand-end))]">
            SV
          </MiniIcon>
          <div>
            <p className="text-sm font-bold text-[hsl(var(--brand-end))]">Shoppable Videos</p>
            <p className="text-xs text-muted-foreground">Engage. Inspire. Sell.</p>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-[42%] hidden w-40 rounded-[10px] border border-border bg-surface p-3 shadow-[0_16px_40px_-30px_hsl(var(--shadow)/0.8)] sm:block">
        <div className="h-3 w-20 rounded bg-primary/10" />
        <div className="mt-3 grid grid-cols-[1fr_36px] gap-2">
          <div className="space-y-1.5">
            <div className="h-2 rounded bg-primary/20" />
            <div className="h-2 rounded bg-muted" />
            <div className="h-2 rounded bg-muted" />
          </div>
          <div className="rounded bg-primary/10" />
        </div>
      </div>

      <div className="absolute right-5 top-[34%] hidden w-32 rounded-[10px] border border-border bg-surface p-2 shadow-[0_16px_40px_-30px_hsl(var(--shadow)/0.8)] sm:block">
        <div className="h-16 rounded bg-[linear-gradient(135deg,hsl(var(--brand-start)/0.35),hsl(var(--brand-end)/0.5))]" />
        <div className="mt-2 h-2 rounded bg-primary/20" />
      </div>
    </div>
  );
}

export function HeroSection({ content }: { content: HeroContent }) {
  return (
    <Section
      spacing="lg"
      className="bg-[radial-gradient(circle_at_78%_18%,hsl(var(--brand-start)/0.14)_0,hsl(var(--surface))_38%,hsl(var(--background))_100%)] pb-14 pt-12 sm:pt-16"
    >
      <Container className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <header>
          <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            The Shopify Conversion Intelligence Platform
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.08] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            Shopify Conversion Stack for <span className="text-primary">AI Search</span> and{" "}
            <span className="text-primary">Revenue Growth</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Three AI-powered apps that help you attract, engage, and convert more shoppers. More
            discovery. More engagement. More sales.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton href={content.primaryCtaHref}>Install All Free</PrimaryButton>
            <SecondaryButton href={content.secondaryCtaHref}>Book a Demo</SecondaryButton>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="size-4 rounded-full border border-primary/30 bg-primary/10" />
              Built for Shopify
            </span>
            <span className="flex gap-1" aria-label="Rated 4.9 out of 5">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className="size-2 rounded-full bg-primary" />
              ))}
            </span>
            <span>4.9/5 from 1,200+ reviews</span>
          </div>
        </header>

        <HeroOrbit />
      </Container>
    </Section>
  );
}

export function StatisticsSection({ items }: { items: readonly StatItem[] }) {
  const stats = [
    { value: "35%", label: "Increase in", detail: "Conversion Rate" },
    { value: "28%", label: "Increase in", detail: "Average Order Value" },
    { value: "50%", label: "Reduction in", detail: "Support Tickets" },
    { value: "31%", label: "Increase in", detail: "Search-to-Order Rate" },
    { value: "40%", label: "Increase in", detail: "Video Engagement" },
  ];

  return (
    <SectionFrame
      id="statistics"
      title="Real Results from Real Shopify Stores"
      description="Conversion, support, and engagement improvements delivered by the complete Hyper stack."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {(items.length ? stats : stats).map((item) => (
          <div
            key={`${item.value}-${item.detail}`}
            className="rounded-[10px] border border-border bg-surface p-6 text-center shadow-[0_16px_40px_-34px_hsl(var(--shadow)/0.7)]"
          >
            <p className="text-3xl font-black text-primary">{item.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
            <p className="text-sm font-semibold text-foreground">{item.detail}</p>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}

export function ThreeProductsSection({ products }: { products: readonly ProductItem[] }) {
  const orderedProducts = [
    products.find((product) => product.name.toLowerCase().includes("chat")),
    products.find((product) => product.name.toLowerCase().includes("video")),
    products.find((product) => product.name.toLowerCase().includes("search")),
  ].filter((product): product is ProductItem => Boolean(product));

  return (
    <SectionFrame
      id="three-products"
      title="Three AI Conversion Engines. One Complete Stack."
      description="Each app is powerful on its own. Together, they drive unparalleled conversions."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {orderedProducts.map((product, index) => {
          const accent = productAccents[index % productAccents.length];
          const features =
            index === 0
              ? ["Reduce support tickets", "Increase engagement", "Boost conversions"]
              : index === 1
                ? ["Increase watch time", "Showcase products", "Boost average order value"]
                : [
                    "Improve product discovery",
                    "Reduce zero-result searches",
                    "Increase conversions",
                  ];

          return (
            <article
              key={product.name}
              className="rounded-[10px] border border-border bg-surface p-7 shadow-[0_18px_50px_-40px_hsl(var(--shadow)/0.85)]"
            >
              <div className="flex items-start gap-4">
                <MiniIcon className={`${accent.border} ${accent.bg} ${accent.color}`}>
                  {index === 0 ? "AI" : index === 1 ? "SV" : "SF"}
                </MiniIcon>
                <div>
                  <h3 className={`text-lg font-bold ${accent.color}`}>{accent.label}</h3>
                  <p className="text-sm font-semibold text-foreground">({product.name})</p>
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-foreground">{product.pitch}</p>
              <ul className="mt-5 space-y-2">
                {features.map((feature) => (
                  <CheckLine key={feature}>{feature}</CheckLine>
                ))}
              </ul>
              <Link href={product.href} className="mt-7 inline-flex text-sm font-bold text-primary">
                Learn More +
              </Link>
            </article>
          );
        })}
      </div>
    </SectionFrame>
  );
}

export function BenefitsSection({ benefits }: { benefits: readonly BenefitItem[] }) {
  const supportItems = [
    ["Seamless Integration", "Install in minutes. No coding required."],
    ["AI-Powered", "Machine learning that gets smarter every day."],
    ["Enterprise Ready", "Scalable, secure, and built for growth."],
    ["24/7 Support", "Our team is always here to help you succeed."],
  ];

  return (
    <SectionFrame
      id="benefits"
      title="Built for Shopify. Powered by AI."
      description="The stack brings integration, intelligence, and operational readiness together."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {(benefits.length ? supportItems : supportItems).map(([title, detail], index) => (
          <div
            key={title}
            className="flex gap-4 rounded-[10px] border border-border bg-surface p-5"
          >
            <MiniIcon className="border-primary/20 bg-primary/10 text-primary">
              {String(index + 1).padStart(2, "0")}
            </MiniIcon>
            <div>
              <h3 className="text-sm font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}

export function MerchantProblemsSection({ problems }: { problems: readonly ProblemItem[] }) {
  const cards = [
    {
      title: "Can't find products",
      body: "Shoppers can't find what they're looking for.",
      icon: "SF",
    },
    {
      title: "Have questions",
      body: "Shoppers have questions but don't get answers.",
      icon: "AI",
    },
    {
      title: "Need more confidence",
      body: "Shoppers need more information or proof.",
      icon: "SV",
    },
  ];

  return (
    <SectionFrame
      id="merchant-problems"
      title="Why Stores Lose Revenue (And How Hyper Fixes It)"
      description="Shoppers leave your store for three main reasons. Our stack solves all three."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr_0.95fr] lg:items-stretch">
        {cards.map((card, index) => (
          <div key={card.title} className="contents">
            <article className="rounded-[10px] border border-border bg-surface p-6 text-center">
              <h3 className="text-sm font-bold text-foreground">{card.title}</h3>
              <MiniIcon className="mx-auto mt-5 border-primary/20 bg-primary/10 text-primary">
                {card.icon}
              </MiniIcon>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{card.body}</p>
              <p className="mt-4 text-sm font-bold text-foreground">Leaves</p>
            </article>
            {index < cards.length - 1 ? (
              <div className="hidden items-center px-1 text-2xl font-bold text-primary lg:flex">
                -
              </div>
            ) : null}
          </div>
        ))}
        <article className="rounded-[10px] border border-primary/20 bg-primary/10 p-6">
          <h3 className="text-base font-bold text-primary">Hyper Solves All 3</h3>
          <ul className="mt-5 space-y-3">
            {(problems.length
              ? [
                  "AI Chat answers instantly",
                  "Smart Search finds products",
                  "Shoppable Videos build trust",
                ]
              : []
            ).map((item) => (
              <li key={item} className="flex gap-2 text-sm font-semibold text-foreground">
                <span className="mt-1 size-4 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-7 text-foreground">
            More engagement. More conversions. More revenue.
          </p>
        </article>
      </div>
    </SectionFrame>
  );
}

export function SolutionsSection({ solutions }: { solutions: readonly SolutionItem[] }) {
  return (
    <SectionFrame
      id="solutions"
      title="How the Stack Converts More Shoppers"
      description="Each solution removes a different point of buying friction across discovery, support, and product education."
      align="left"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {solutions.map((solution, index) => (
          <article
            key={solution.title}
            className="rounded-[10px] border border-border bg-surface p-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {String(index + 1).padStart(2, "0")} / {solution.channel}
            </p>
            <h3 className="mt-4 text-lg font-bold text-foreground">{solution.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{solution.detail}</p>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

export function CustomerLogosSection({ logos }: { logos: readonly string[] }) {
  return (
    <SectionFrame
      id="customer-logos"
      title="Trusted by 10,000+ Shopify Brands Worldwide"
      description="From startups to enterprise, brands trust Hyper AI to grow their revenue."
    >
      <ul
        className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
        aria-label="Customer logos"
      >
        {(logos.length ? customerLogos : customerLogos).map((logo) => (
          <li key={logo} className="text-lg font-black tracking-normal text-foreground opacity-80">
            {logo}
          </li>
        ))}
        <li className="text-sm font-semibold text-muted-foreground">and more</li>
      </ul>
    </SectionFrame>
  );
}

export function CaseStudiesSection({ studies }: { studies: readonly CaseStudyItem[] }) {
  return (
    <SectionFrame
      id="case-studies"
      title="Proof Across the Full Conversion Journey"
      description="Use quantified outcomes to move visitors from interest to action."
      align="left"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {studies.map((study) => (
          <article key={study.brand} className="rounded-[10px] border border-border bg-surface p-6">
            <h3 className="text-lg font-bold text-foreground">{study.brand}</h3>
            <p className="mt-3 text-2xl font-black text-primary">{study.result}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{study.summary}</p>
            <Link href={study.href} className="mt-5 inline-flex text-sm font-bold text-primary">
              Read case study +
            </Link>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: readonly TestimonialItem[];
}) {
  return (
    <SectionFrame
      id="testimonials"
      title="What Merchants Say"
      description="Concise testimonials reduce hesitation and improve trial-to-install intent."
      align="left"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <blockquote
            key={`${testimonial.person}-${testimonial.role}-${index}`}
            className="rounded-[10px] border border-border bg-surface p-6"
          >
            <p className="text-sm leading-7 text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
            <footer className="mt-5 text-sm text-muted-foreground">
              <cite className="not-italic font-bold text-foreground">{testimonial.person}</cite>
              <p>{testimonial.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </SectionFrame>
  );
}

export function LatestArticlesSection({ articles }: { articles: readonly ArticleItem[] }) {
  return (
    <SectionFrame
      id="latest-articles"
      title="Shopify Conversion Resources & Guides"
      description="The latest thinking on AI discovery, customer support, and video commerce."
      align="left"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.title}
            className="rounded-[10px] border border-border bg-surface p-6"
          >
            <div className="mb-5 h-28 rounded-[8px] bg-[linear-gradient(135deg,hsl(var(--brand-start)/0.16),hsl(var(--surface))_45%,hsl(var(--brand-end)/0.12))]" />
            <h3 className="text-lg font-bold text-foreground">{article.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{article.summary}</p>
            <Link href={article.href} className="mt-5 inline-flex text-sm font-bold text-primary">
              Read article +
            </Link>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

export function FreeToolsSection({ tools }: { tools: readonly ToolItem[] }) {
  return (
    <SectionFrame
      id="free-tools"
      title="Conversion Tools Built for Operators"
      description="Low-friction tools build trust and drive qualified leads into product demos."
      align="left"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {tools.map((tool) => (
          <article key={tool.title} className="rounded-[10px] border border-border bg-surface p-6">
            <h3 className="text-lg font-bold text-foreground">{tool.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{tool.summary}</p>
            <Link href={tool.href} className="mt-5 inline-flex text-sm font-bold text-primary">
              Open tool +
            </Link>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

export function FaqSection({ faqs }: { faqs: readonly FaqItem[] }) {
  return (
    <SectionFrame
      id="faqs"
      title="Questions Merchants Ask Before Installing"
      description="Answer decision-stage questions clearly to improve conversion and AI snippet quality."
    >
      <div className="mx-auto max-w-4xl rounded-[10px] border border-border bg-surface p-4">
        <Accordion
          items={faqs.map((faq) => ({
            id: faq.id,
            title: faq.question,
            content: faq.answer,
          }))}
        />
      </div>
    </SectionFrame>
  );
}

export function NewsletterSection() {
  return (
    <SectionFrame
      id="newsletter"
      title="Get Weekly Conversion Briefings"
      description="Receive practical Shopify growth tactics, AI search updates, and product release notes."
    >
      <div className="mx-auto max-w-3xl rounded-[10px] border border-border bg-surface p-6">
        <NewsletterForm />
      </div>
    </SectionFrame>
  );
}

export function CtaSection({
  title,
  detail,
  primaryHref,
  primaryLabel,
}: {
  title: string;
  detail: string;
  primaryHref: string;
  primaryLabel: string;
}) {
  return (
    <Section
      aria-labelledby="home-cta"
      spacing="md"
      className="border-t border-border bg-background"
    >
      <Container>
        <div className="rounded-[10px] border border-border bg-[linear-gradient(180deg,hsl(var(--surface)),hsl(var(--muted)))] p-8 text-center shadow-[0_20px_55px_-44px_hsl(var(--shadow)/0.85)] sm:p-10">
          <h2
            id="home-cta"
            className="text-2xl font-black tracking-normal text-foreground sm:text-3xl"
          >
            Ready to 10X Your Shopify Store Conversions?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {detail || title}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <PrimaryButton href={primaryHref}>{primaryLabel || "Install All Free"}</PrimaryButton>
            <SecondaryButton href="/contact">Book a Demo</SecondaryButton>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            No credit card required - Works on all Shopify plans
          </p>
        </div>
      </Container>
    </Section>
  );
}
