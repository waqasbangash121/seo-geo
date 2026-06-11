import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Apps",
  description:
    "Browse Hyper apps built for conversion, support deflection, and storefront engagement.",
  path: "/apps",
});

export default function AppsPage() {
  return (
    <Section spacing="lg">
      <Container className="stack-md">
        <h1 className="type-display">Apps</h1>
        <p className="type-body">
          Explore Hyper apps for search and filter, AI chat and FAQs, and shoppable video commerce.
        </p>
      </Container>
    </Section>
  );
}
