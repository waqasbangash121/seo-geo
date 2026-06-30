import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock3, Scale } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import styles from "@/components/blog/article-content.module.css";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { formatComparisonDate, getAllComparisons, getComparisonBySlug } from "@/lib/comparisons";

type ComparisonPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const comparisons = await getAllComparisons();
  return comparisons.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);
  if (!comparison) {
    return { robots: { index: false, follow: false }, title: "Comparison not found" };
  }

  const title = comparison.seoTitle ?? comparison.title;
  const description = comparison.seoDescription ?? comparison.excerpt;
  const path = `/comparisons/${comparison.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: new URL(path, siteConfig.url).toString(),
      title,
      description,
      siteName: siteConfig.name,
      publishedTime: comparison.publishedAt,
      modifiedTime: comparison.updatedAt ?? comparison.publishedAt,
      authors: [comparison.author],
      tags: comparison.tags,
      images: comparison.coverImage ? [{ url: comparison.coverImage, alt: comparison.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: comparison.coverImage ? [comparison.coverImage] : undefined,
    },
  };
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);
  if (!comparison) notFound();

  const pageUrl = new URL(`/comparisons/${comparison.slug}`, siteConfig.url).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.seoDescription ?? comparison.excerpt,
    datePublished: comparison.publishedAt,
    dateModified: comparison.updatedAt ?? comparison.publishedAt,
    mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: comparison.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    about: [
      { "@type": "Thing", name: siteConfig.name },
      { "@type": "Thing", name: comparison.competitorName },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />

      <Section className="pb-12 pt-20 sm:pt-28">
        <Container className="max-w-4xl">
          <Link href="/comparisons" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:rounded-sm">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to comparisons
          </Link>

          <div className="mt-10">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">{comparison.category}</p>
            <h1 className="mt-4 type-display">{comparison.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{comparison.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span>By {comparison.author}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={comparison.publishedAt}>{formatComparisonDate(comparison.publishedAt)}</time>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-2"><Clock3 aria-hidden="true" className="size-4" />{comparison.readingTime} min read</span>
            </div>
          </div>

          <aside className="mt-8 rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="rounded-xl border border-border bg-background p-2 text-primary"><Scale aria-hidden="true" className="size-5" /></span>
              <div>
                <p className="text-sm font-semibold">Decision summary</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{comparison.decisionSummary}</p>
              </div>
            </div>
          </aside>

          {comparison.tags.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {comparison.tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">{tag}</span>)}
            </div>
          ) : null}
        </Container>
      </Section>

      <Section className="pb-20 sm:pb-24">
        <Container className="max-w-4xl">
          <article className="rounded-[10px] border border-border bg-surface p-6 sm:p-10 lg:p-12">
            <div className={styles.prose}><ReactMarkdown remarkPlugins={[remarkGfm]}>{comparison.content}</ReactMarkdown></div>
          </article>
        </Container>
      </Section>
    </>
  );
}
