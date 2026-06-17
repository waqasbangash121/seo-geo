import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Contact Hyper | AI Shopify Solutions",
  description:
    "Contact Hyper to learn more about our AI-powered Shopify apps for product search, AI chat, FAQs, and shoppable videos. Connect with our team to improve your ecommerce customer experience.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section className="pb-12 pt-20 sm:pt-28 lg:pt-32">
        <Container className="max-w-4xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Contact Hyper
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Lets Build Better Shopify Shopping Experiences Together.
          </h1>

          <p className="text-lg leading-8 text-muted-foreground">
            Hyper helps Shopify merchants improve product discovery, automate customer support, and
            create engaging shopping experiences through AI-powered commerce solutions. Whether you
            have questions about our apps or want to explore how Hyper can help grow your business,
            our team would love to hear from you.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="contact-details" className="pb-12 sm:pb-16">
        <Container className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[10px] border border-border bg-surface p-6">
            <h2 id="contact-details" className="text-2xl font-semibold tracking-tight">
              Get in Touch
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Whether youre looking for AI-powered product search, intelligent customer support,
              shoppable video solutions, or general Shopify growth strategies, Hyper is here to
              help.
            </p>

            <p className="mt-6 text-sm font-medium text-muted-foreground">Email</p>

            <Link
              href={`mailto:${siteConfig.email}`}
              className="mt-2 inline-flex text-base font-medium text-foreground underline decoration-border underline-offset-4"
            >
              {siteConfig.email}
            </Link>
          </article>

          <article className="rounded-[10px] border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold tracking-tight">How We Can Help</h2>

            <ul className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
              <li>• Learn about Hyper Search & Filters for Shopify.</li>

              <li>• Explore AI Chat and FAQ automation.</li>

              <li>• Discover interactive shoppable video commerce.</li>

              <li>• Improve customer experience and conversions.</li>

              <li>• Find the right Hyper solution for your business.</li>
            </ul>
          </article>
        </Container>
      </Section>

      <Section className="pb-12 sm:pb-16">
        <Container className="max-w-5xl">
          <div className="rounded-[10px] border border-border bg-surface p-8 sm:p-10">
            <h2 className="text-3xl font-semibold tracking-tight">Why Contact Hyper?</h2>

            <div className="mt-6 space-y-5 text-muted-foreground leading-8">
              <p>
                Hyper develops AI-powered Shopify apps designed to help ecommerce businesses grow
                through better customer experiences. Our solutions focus on helping shoppers find
                products faster, receive instant support, and engage with interactive shopping
                experiences.
              </p>

              <p>
                We believe that modern ecommerce should combine artificial intelligence with
                practical merchant workflows. Our platform helps reduce friction throughout the
                buying journey while improving customer satisfaction and business performance.
              </p>

              <p>
                Whether youre launching a new Shopify store or scaling an established brand, Hyper
                provides intelligent commerce tools built for the future of online shopping.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-20 sm:pb-24">
        <Container>
          <div className="rounded-[10px] border border-border bg-surface p-8 text-center sm:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
              Hyper Commerce Platform
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              AI-Powered Solutions for Modern Shopify Stores
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              Hyper combines intelligent product discovery, AI customer support, and interactive
              video commerce to help merchants create exceptional shopping experiences. Contact us
              to learn how Hyper can help your Shopify business increase engagement, improve
              conversions, and build long-term customer relationships.
            </p>

            <div className="mt-8">
              <Link
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,hsl(var(--brand-start))_0%,hsl(var(--brand-end))_100%)] px-7 py-3 text-sm font-medium text-primary-foreground shadow-[0_18px_36px_-18px_hsl(var(--primary)/0.7)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Contact Hyper
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
