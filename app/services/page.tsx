import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { servicePreview } from "@/content";

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
            Planned service layers
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {servicePreview.map((service) => (
              <article key={service.title} className="rounded-3xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
