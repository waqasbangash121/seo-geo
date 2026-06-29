import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { BlocksRenderer } from "@/components/cms/blocks-renderer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getPublishedBlogPostBySlug } from "@/lib/cms/queries";
import { createBlogPostJsonLd, createCmsMetadata, serializeJsonLd } from "@/lib/cms/seo";
import { toCmsMediaUrl } from "@/lib/cms/strapi-client";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

function formatPublishedDate(value?: string | null) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return null;

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    return { robots: { index: false, follow: false } };
  }

  return createCmsMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    seo: post.seo,
    fallbackImage: post.coverImage,
    openGraphType: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) notFound();

  const coverImage = toCmsMediaUrl(post.coverImage?.url);
  const publishedDate = formatPublishedDate(post.publishedAt);
  const jsonLd = createBlogPostJsonLd(post);

  return (
    <>
      {jsonLd ? (
        <Script id="blog-post-schema" type="application/ld+json">
          {serializeJsonLd(jsonLd)}
        </Script>
      ) : null}

      <Section className="pb-12 pt-20 sm:pt-28 lg:pt-32">
        <Container className="max-w-4xl">
          <div className="mx-auto max-w-3xl text-center">
            {post.category ? (
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
                {post.category}
              </p>
            ) : null}
            <h1 className="mt-4 type-display">{post.title}</h1>
            {post.excerpt ? <p className="mx-auto mt-6 max-w-3xl type-body">{post.excerpt}</p> : null}
            {publishedDate || post.authorName ? (
              <p className="mt-6 text-sm text-muted-foreground">
                {post.authorName ? `By ${post.authorName}` : null}
                {post.authorName && publishedDate ? " · " : null}
                {publishedDate ? <time dateTime={post.publishedAt ?? undefined}>{publishedDate}</time> : null}
              </p>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section className="pb-20 sm:pb-24">
        <Container className="max-w-4xl">
          {coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={post.coverImage?.alternativeText || post.title}
              className="mb-10 w-full rounded-[10px] border border-border"
              height={post.coverImage?.height ?? undefined}
              src={coverImage}
              width={post.coverImage?.width ?? undefined}
            />
          ) : null}
          <article className="rounded-[10px] border border-border bg-surface p-6 sm:p-10">
            <BlocksRenderer blocks={post.content} />
          </article>
        </Container>
      </Section>
    </>
  );
}
