import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock3, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import styles from "@/components/blog/article-content.module.css";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { formatResourceDate, getResourceBySlug } from "@/lib/resources";

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) {
    return { robots: { index: false, follow: false }, title: "Resource not found" };
  }

  const title = resource.seoTitle ?? resource.title;
  const description = resource.seoDescription ?? resource.excerpt;
  const path = `/resources/${resource.slug}`;

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
      publishedTime: resource.publishedAt,
      modifiedTime: resource.updatedAt ?? resource.publishedAt,
      authors: [resource.author],
      tags: resource.tags,
      images: resource.coverImage ? [{ url: resource.coverImage, alt: resource.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: resource.coverImage ? [resource.coverImage] : undefined,
    },
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  const pageUrl = new URL(`/resources/${resource.slug}`, siteConfig.url).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.seoDescription ?? resource.excerpt,
    datePublished: resource.publishedAt,
    dateModified: resource.updatedAt ?? resource.publishedAt,
    mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: resource.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    audience: { "@type": "Audience", audienceType: resource.audience },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />

      <Section className="pb-12 pt-20 sm:pt-28">
        <Container className="max-w-4xl">
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:rounded-sm">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to resources
          </Link>

          <div className="mt-10">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">{resource.resourceType}</p>
            <h1 className="mt-4 type-display">{resource.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{resource.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span>By {resource.author}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={resource.publishedAt}>{formatResourceDate(resource.publishedAt)}</time>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-2"><Clock3 aria-hidden="true" className="size-4" />{resource.readingTime} min read</span>
            </div>
          </div>

          <aside className="mt-8 rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="rounded-xl border border-border bg-background p-2 text-primary"><FileText aria-hidden="true" className="size-5" /></span>
              <div>
                <p className="text-sm font-semibold">Built for</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{resource.audience}</p>
              </div>
            </div>
          </aside>

          {resource.tags.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {resource.tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">{tag}</span>)}
            </div>
          ) : null}
        </Container>
      </Section>

      <Section className="pb-20 sm:pb-24">
        <Container className="max-w-4xl">
          <article className="rounded-[10px] border border-border bg-surface p-6 sm:p-10 lg:p-12">
            <div className={styles.prose}><ReactMarkdown remarkPlugins={[remarkGfm]}>{resource.content}</ReactMarkdown></div>
          </article>
        </Container>
      </Section>
    </>
  );
}
