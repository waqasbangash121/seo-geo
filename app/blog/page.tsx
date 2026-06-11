import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Read Hyper insights on conversion optimization, AI support, and search visibility best practices.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <Section spacing="lg">
      <Container className="stack-md">
        <h1 className="type-display">Blog</h1>
        <p className="type-body">
          Learn from product updates, strategy write-ups, and practical experiments from the Hyper
          team.
        </p>
      </Container>
    </Section>
  );
}
