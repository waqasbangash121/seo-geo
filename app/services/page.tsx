import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { servicePreview } from "@/content";
import Image from "next/image";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Explore the service architecture planned for Hyper, including SEO, GEO, and AI search foundations.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Section className="pb-12 pt-20 sm:pt-28 lg:pt-32">
        <Container className="max-w-4xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Services
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Structured to support SEO, GEO, and AI search growth.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            These placeholders define the future content architecture without adding any operational
            logic yet.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="services-cards" className="pb-20 sm:pb-24">
        <Container>
          <h2 id="services-cards" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Our Shopify Applications
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {servicePreview.map((service) => (
              <article
                key={service.title}
                className="flex min-h-full flex-col rounded-[10px] border border-border bg-surface p-6 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <a
                    href={service.links[0].href}
                    className="flex size-14 shrink-0 items-center justify-center rounded-[10px] border border-border bg-background p-2 transition hover:border-primary"
                  >
                    <Image
                      src={service.svg}
                      alt={`${service.title} icon`}
                      width={44}
                      height={44}
                      className="h-11 w-11 object-contain"
                    />
                  </a>
                  <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
                </div>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-4 pt-6">
                  {service.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center justify-center rounded-full border border-border bg-[linear-gradient(135deg,hsl(var(--brand-start))_0%,hsl(var(--brand-end))_100%)] px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_18px_36px_-18px_hsl(var(--primary)/0.7)] transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
