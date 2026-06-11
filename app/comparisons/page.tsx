import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Comparisons",
  description:
    "Compare Hyper against alternatives with feature depth, implementation speed, and performance focus.",
  path: "/comparisons",
});

export default function ComparisonsPage() {
  return (
    <Section spacing="lg">
      <Container className="stack-md">
        <h1 className="type-display">Comparisons</h1>
        <p className="type-body">
          Review objective comparison frameworks to select the right app stack for your storefront
          goals.
        </p>
      </Container>
    </Section>
  );
}
