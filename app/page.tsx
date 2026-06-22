import {
  BenefitsSection,
  CtaSection,
  CustomerLogosSection,
  HeroSection,
  MerchantProblemsSection,
  StatisticsSection,
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

const siteUrl = "https://niagarat.com";

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Shopify Conversion Stack for AI Search and Revenue Growth",
  description: homeContent.hero.description,
  url: siteUrl,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Niagarat",
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Shopify Conversion Stack",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: homeContent.hero.description,
  provider: {
    "@type": "Organization",
    name: "Niagarat",
  },
  url: siteUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does AI search optimization help Shopify stores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI search optimization improves how AI systems and search engines understand your products, helping increase visibility, traffic, and conversions.",
      },
    },
    {
      "@type": "Question",
      name: "Can this improve conversion rates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Better product visibility, optimized content, and conversion-focused experiences can help increase revenue and conversion rates.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work with existing Shopify stores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The platform is designed to integrate with existing Shopify stores and enhance performance without requiring a complete rebuild.",
      },
    },
  ],
};

const structuredData = [webpageSchema, organizationSchema, softwareApplicationSchema, faqSchema];

export default function HomePage() {
  return (
    <>
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLd(schema),
          }}
        />
      ))}

      <HeroSection content={homeContent.hero} />

      <ThreeProductsSection products={homeContent.products} />

      <MerchantProblemsSection problems={homeContent.problems} />

      <StatisticsSection items={homeContent.statistics} />

      <CustomerLogosSection logos={homeContent.logos} />

      <BenefitsSection benefits={homeContent.benefits} />

      <CtaSection
        title={homeContent.cta.title}
        detail={homeContent.cta.detail}
        primaryHref={homeContent.cta.primaryHref}
        primaryLabel={homeContent.cta.primaryLabel}
      />
    </>
  );
}
