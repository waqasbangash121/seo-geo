import {
  BenefitsSection,
  CaseStudiesSection,
  CtaSection,
  CustomerLogosSection,
  FaqSection,
  FreeToolsSection,
  HeroSection,
  LatestArticlesSection,
  MerchantProblemsSection,
  NewsletterSection,
  SolutionsSection,
  StatisticsSection,
  TestimonialsSection,
  ThreeProductsSection,
} from "@/components/home/home-sections";
import { createPageMetadata } from "@/config/metadata";
import { homeContent } from "@/content";
import { toJsonLd } from "@/lib/schema";

export const metadata = createPageMetadata({
  title: "Shopify Conversion Stack for AI Search and Revenue Growth",
  description: homeContent.hero.description,
  path: "/",
});

const jsonLdPlaceholders = {
  webpage: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "REPLACE_WITH_PAGE_NAME",
    description: "REPLACE_WITH_PAGE_DESCRIPTION",
    url: "REPLACE_WITH_PAGE_URL",
  },
  product: {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "REPLACE_WITH_PRIMARY_PRODUCT_NAME",
    description: "REPLACE_WITH_PRIMARY_PRODUCT_DESCRIPTION",
    brand: {
      "@type": "Brand",
      name: "REPLACE_WITH_BRAND_NAME",
    },
  },
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "REPLACE_WITH_QUESTION",
        acceptedAnswer: {
          "@type": "Answer",
          text: "REPLACE_WITH_ANSWER",
        },
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLdPlaceholders.webpage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLdPlaceholders.product) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLdPlaceholders.faq) }}
      />

      <HeroSection content={homeContent.hero} />
      <StatisticsSection items={homeContent.statistics} />
      <ThreeProductsSection products={homeContent.products} />
      <BenefitsSection benefits={homeContent.benefits} />
      <MerchantProblemsSection problems={homeContent.problems} />
      <SolutionsSection solutions={homeContent.solutions} />
      <CustomerLogosSection logos={homeContent.logos} />
      <CaseStudiesSection studies={homeContent.caseStudies} />
      <TestimonialsSection testimonials={homeContent.testimonials} />
      <LatestArticlesSection articles={homeContent.latestArticles} />
      <FreeToolsSection tools={homeContent.freeTools} />
      <FaqSection faqs={homeContent.faqs} />
      <NewsletterSection />
      <CtaSection
        title={homeContent.cta.title}
        detail={homeContent.cta.detail}
        primaryHref={homeContent.cta.primaryHref}
        primaryLabel={homeContent.cta.primaryLabel}
      />
    </>
  );
}
