import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Contact Hyper",
  description:
    "Use the placeholder contact foundation for Hyper while the next business workflows are defined.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section className="pb-12 pt-20 sm:pt-28 lg:pt-32">
        <Container className="max-w-4xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Contact
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Ready for the next layer of the Hyper stack.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            The page is intentionally simple for now so the project has a clear destination without
            introducing workflow logic too early.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="contact-details" className="pb-20 sm:pb-24">
        <Container className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border bg-surface p-6">
            <h2 id="contact-details" className="text-2xl font-semibold tracking-tight">
              Contact details
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Email</p>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="mt-2 inline-flex text-base font-medium text-foreground underline decoration-border underline-offset-4"
            >
              {siteConfig.email}
            </Link>
          </article>
          <article className="rounded-3xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold tracking-tight">Next step</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              When the workflow layer is added, this route can evolve into a contact form, intake
              flow, or scheduling experience.
            </p>
          </article>
        </Container>
      </Section>
    </>
  );
}
