import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Resources",
  description:
    "Access implementation guides, playbooks, and practical resources for Hyper products.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <Section spacing="lg">
      <Container className="stack-md">
        <h1 className="type-display">Resources</h1>
        <p className="type-body">
          Find actionable guides and documentation designed for technical and growth-focused
          ecommerce teams.
        </p>
      </Container>
    </Section>
  );
}
