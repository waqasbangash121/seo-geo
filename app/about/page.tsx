import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "About Hyper",
  description:
    "Learn how Hyper is being structured as an enterprise SEO and GEO website foundation with a clean architecture.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Section className="pb-12 pt-20 sm:pt-28 lg:pt-32">
        <Container className="max-w-4xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">About</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Hyper is built as a scalable foundation for search-first web experiences.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            This starter structure prioritizes semantic markup, strong metadata defaults, reusable
            components, and clear separation between design, content, and configuration.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="about-architecture" className="pb-20 sm:pb-24">
        <Container className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border bg-surface p-6">
            <h2 id="about-architecture" className="text-2xl font-semibold tracking-tight">
              Architecture first
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              The codebase is intentionally split into app routes, reusable components, and config
              modules so future features can land without turning the project into a single tangled
              surface.
            </p>
          </article>
          <article className="rounded-3xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold tracking-tight">SEO by default</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Metadata defaults, canonical structure, robots, sitemap, and schema helpers are ready
              from the start so the website can grow into a search-visible product.
            </p>
          </article>
        </Container>
      </Section>
    </>
  );
}
