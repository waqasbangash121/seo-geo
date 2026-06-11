import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Tools",
  description:
    "Use Hyper tools to evaluate search quality, support workflows, and merchandising opportunities.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <Section spacing="lg">
      <Container className="stack-md">
        <h1 className="type-display">Tools</h1>
        <p className="type-body">
          Access practical utilities for audit workflows, prioritization, and storefront
          optimization.
        </p>
      </Container>
    </Section>
  );
}
