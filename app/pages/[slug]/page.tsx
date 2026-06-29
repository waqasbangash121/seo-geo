import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import { BlocksRenderer } from "@/components/cms/blocks-renderer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getPublishedCmsPageBySlug } from "@/lib/cms/queries";
import { createCmsMetadata, createCmsPageJsonLd, serializeJsonLd } from "@/lib/cms/seo";
import { toCmsMediaUrl } from "@/lib/cms/strapi-client";

type CmsPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: CmsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedCmsPageBySlug(slug);

  if (!page) {
    return { robots: { index: false, follow: false } };
  }

  return createCmsMetadata({
    title: page.title,
    description: page.intro,
    path: `/pages/${page.slug}`,
    seo: page.seo,
    fallbackImage: page.heroImage,
  });
}

export default async function CmsPage({ params }: CmsPageProps) {
  const { slug } = await params;
  const page = await getPublishedCmsPageBySlug(slug);

  if (!page) notFound();

  const heroImage = toCmsMediaUrl(page.heroImage?.url);
  const jsonLd = createCmsPageJsonLd(page);

  return (
    <>
      {jsonLd ? (
        <Script id="cms-page-schema" type="application/ld+json">
          {serializeJsonLd(jsonLd)}
        </Script>
      ) : null}

      <Section className="pb-12 pt-20 sm:pt-28 lg:pt-32">
        <Container className="max-w-4xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="type-display">{page.title}</h1>
            {page.intro ? <p className="mx-auto mt-6 max-w-3xl type-body">{page.intro}</p> : null}
          </div>
        </Container>
      </Section>

      <Section className="pb-20 sm:pb-24">
        <Container className="max-w-4xl">
          {heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={page.heroImage?.alternativeText || page.title}
              className="mb-10 w-full rounded-[10px] border border-border"
              height={page.heroImage?.height ?? undefined}
              src={heroImage}
              width={page.heroImage?.width ?? undefined}
            />
          ) : null}
          <article className="rounded-[10px] border border-border bg-surface p-6 sm:p-10">
            <BlocksRenderer blocks={page.content} />
          </article>
        </Container>
      </Section>
    </>
  );
}
