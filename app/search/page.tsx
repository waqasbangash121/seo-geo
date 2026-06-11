import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Search",
  description:
    "Placeholder search route for the Hyper foundation, ready for future site-search implementation.",
  path: "/search",
});

export default function SearchPage() {
  return (
    <Section className="pb-20 pt-20 sm:pt-28 lg:pt-32">
      <Container className="max-w-3xl space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">Search</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Search is reserved for the next phase of the Hyper platform.
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          The route exists so the site architecture can point to a dedicated search experience once
          content indexing is introduced.
        </p>
        <div className="rounded-3xl border border-border bg-surface p-6">
          <p className="text-sm leading-7 text-muted-foreground">
            No search logic has been added yet. This page is only a structural placeholder.
          </p>
        </div>
      </Container>
    </Section>
  );
}
