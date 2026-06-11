import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Industries",
  description:
    "See how Hyper solutions map to fashion, beauty, electronics, and multi-category commerce.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <Section spacing="lg">
      <Container className="stack-md">
        <h1 className="type-display">Industries</h1>
        <p className="type-body">
          Hyper supports industry-specific merchandising and support workflows for modern ecommerce
          teams.
        </p>
      </Container>
    </Section>
  );
}
