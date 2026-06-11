import Link from "next/link";
import type { ReactNode } from "react";

import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type SectionFrameProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
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

function SectionFrame({ id, eyebrow, title, description, children }: SectionFrameProps) {
  return (
    <Section aria-labelledby={id} spacing="lg">
      <Container>
        <header className="stack-sm max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <h2 id={id} className="type-heading">
            {title}
          </h2>
          <p className="type-body">{description}</p>
        </header>
        <div className="mt-8">{children}</div>
      </Container>
    </Section>
  );
}

export function HeroSection({ content }: { content: HeroContent }) {
  return (
    <Section spacing="lg" className="pt-20 sm:pt-24">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <header className="stack-md">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Shopify Growth Stack
          </p>
          <h1 className="type-display max-w-4xl">{content.title}</h1>
          <p className="type-body max-w-2xl">{content.description}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={content.primaryCtaHref}
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#f97316_0%,#ef4444_100%)] px-6 py-3 text-sm font-medium text-white shadow-[0_18px_36px_-18px_rgba(239,68,68,0.7)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {content.primaryCtaLabel}
            </Link>
            <Link
              href={content.secondaryCtaHref}
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {content.secondaryCtaLabel}
            </Link>
          </div>
        </header>

        <aside className="rounded-3xl border border-border bg-surface p-6">
          <h2 className="type-subheading">GEO Facts for AI Search</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
            {content.geoFacts.map((fact) => (
              <li key={fact} className="rounded-xl border border-border/70 bg-background px-3 py-2">
                {fact}
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </Section>
  );
}

export function StatisticsSection({ items }: { items: readonly StatItem[] }) {
  return (
    <SectionFrame
      id="statistics"
      eyebrow="Statistics"
      title="Performance Metrics That Drive Conversion"
      description="Use these placeholders to present clear baseline and growth outcomes for merchant decision-makers."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <Card key={item.label} className="rounded-2xl">
            <p className="text-3xl font-semibold text-foreground">{item.value}</p>
            <p className="mt-2 text-sm font-medium text-foreground">{item.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
          </Card>
        ))}
      </div>
    </SectionFrame>
  );
}

export function ThreeProductsSection({ products }: { products: readonly ProductItem[] }) {
  return (
    <SectionFrame
      id="three-products"
      eyebrow="Three Products"
      title="One Conversion Stack, Three Revenue Levers"
      description="Position each product with a direct business outcome and clear next action."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.name} className="rounded-3xl border border-border bg-surface p-6">
            <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{product.pitch}</p>
            <p className="mt-3 text-sm font-medium text-foreground">Outcome: {product.outcome}</p>
            <Link
              href={product.href}
              className="mt-4 inline-flex text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4"
            >
              View product details
            </Link>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

export function BenefitsSection({ benefits }: { benefits: readonly BenefitItem[] }) {
  return (
    <SectionFrame
      id="benefits"
      eyebrow="Benefits"
      title="Why Merchants Choose Hyper"
      description="Summarize practical advantages in language buyers can quote internally during approvals."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {benefits.map((benefit) => (
          <Card key={benefit.title} className="rounded-2xl">
            <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{benefit.detail}</p>
          </Card>
        ))}
      </div>
    </SectionFrame>
  );
}

export function MerchantProblemsSection({ problems }: { problems: readonly ProblemItem[] }) {
  return (
    <SectionFrame
      id="merchant-problems"
      eyebrow="Shopify Merchant Problems"
      title="Common Friction That Blocks Growth"
      description="Highlight urgent pain points and quantify impact to increase conversion intent."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {problems.map((problem) => (
          <article key={problem.title} className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">{problem.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{problem.detail}</p>
            <p className="mt-3 text-sm font-medium text-foreground">
              Business impact: {problem.impact}
            </p>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

export function SolutionsSection({ solutions }: { solutions: readonly SolutionItem[] }) {
  return (
    <SectionFrame
      id="solutions"
      eyebrow="Solutions"
      title="How Hyper Resolves Merchant Bottlenecks"
      description="Map each solution to explicit AI and search channels so the value is clear to teams and AI assistants."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {solutions.map((solution) => (
          <article key={solution.title} className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">{solution.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{solution.detail}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Channel: {solution.channel}
            </p>
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
      eyebrow="Customer Logos"
      title="Trusted by Ambitious Shopify Teams"
      description="Replace placeholders with real customer marks to strengthen social proof and conversion confidence."
    >
      <ul
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Customer logo placeholders"
      >
        {logos.map((logo) => (
          <li
            key={logo}
            className="rounded-xl border border-border bg-surface px-4 py-5 text-center text-sm font-semibold text-foreground"
          >
            {logo}
          </li>
        ))}
      </ul>
    </SectionFrame>
  );
}

export function CaseStudiesSection({ studies }: { studies: readonly CaseStudyItem[] }) {
  return (
    <SectionFrame
      id="case-studies"
      eyebrow="Case Studies"
      title="Proof of Results"
      description="Use quantified outcomes to move visitors from interest to action."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {studies.map((study) => (
          <article key={study.brand} className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">{study.brand}</h3>
            <p className="mt-2 text-2xl font-semibold text-primary">{study.result}</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{study.summary}</p>
            <Link
              href={study.href}
              className="mt-4 inline-flex text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4"
            >
              Read case study
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
      eyebrow="Testimonials"
      title="What Merchants Say"
      description="Concise testimonials reduce hesitation and improve trial-to-install intent."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <blockquote
            key={`${testimonial.person}-${testimonial.role}-${index}`}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <p className="text-sm leading-7 text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
            <footer className="mt-4 text-sm text-muted-foreground">
              <cite className="not-italic font-medium text-foreground">{testimonial.person}</cite>
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
      eyebrow="Latest Articles"
      title="Insights for Commerce Operators"
      description="Publish practical guides that answer high-intent questions from teams and AI search tools."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {articles.map((article) => (
          <article key={article.title} className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{article.summary}</p>
            <Link
              href={article.href}
              className="mt-3 inline-flex text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4"
            >
              Read article
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
      eyebrow="Free Tools"
      title="Try Conversion Utilities Before You Commit"
      description="Low-friction tools build trust and drive qualified leads into product demos."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {tools.map((tool) => (
          <article key={tool.title} className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">{tool.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{tool.summary}</p>
            <Link
              href={tool.href}
              className="mt-3 inline-flex text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4"
            >
              Open tool
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
      eyebrow="FAQs"
      title="Questions Merchants Ask Before Installing"
      description="Answer decision-stage questions clearly to improve conversion and AI snippet quality."
    >
      <Accordion
        items={faqs.map((faq) => ({
          id: faq.id,
          title: faq.question,
          content: faq.answer,
        }))}
      />
    </SectionFrame>
  );
}

export function NewsletterSection() {
  return (
    <SectionFrame
      id="newsletter"
      eyebrow="Newsletter"
      title="Get Weekly Conversion Briefings"
      description="Receive practical Shopify growth tactics, AI search updates, and product release notes."
    >
      <Card className="rounded-3xl border-border bg-surface">
        <NewsletterForm />
      </Card>
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
    <Section aria-labelledby="home-cta" spacing="lg">
      <Container>
        <div className="rounded-3xl border border-border bg-surface p-8 text-center sm:p-12">
          <h2 id="home-cta" className="type-heading">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl type-body">{detail}</p>
          <div className="mt-6">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#f97316_0%,#ef4444_100%)] px-7 py-3 text-sm font-medium text-white shadow-[0_18px_36px_-18px_rgba(239,68,68,0.7)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {primaryLabel}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
