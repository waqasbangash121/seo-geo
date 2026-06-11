import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Terms",
  description: "Read Hyper terms of service and platform usage conditions.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section spacing="lg">
      <Container className="stack-md">
        <h1 className="type-display">Terms</h1>
        <p className="type-body">
          These terms govern the use of Hyper products, services, and website content.
        </p>
      </Container>
    </Section>
  );
}
