import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Case Studies",
  description:
    "Explore measurable outcomes from brands using Hyper to improve discovery and conversion.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <Section spacing="lg">
      <Container className="stack-md">
        <h1 className="type-display">Case Studies</h1>
        <p className="type-body">
          See real-world implementation stories and impact metrics across Hyper products.
        </p>
      </Container>
    </Section>
  );
}
