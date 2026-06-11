import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Review how Hyper handles personal data, data retention, and privacy rights.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section spacing="lg">
      <Container className="stack-md">
        <h1 className="type-display">Privacy Policy</h1>
        <p className="type-body">
          This page outlines how Hyper collects, uses, and protects personal data.
        </p>
      </Container>
    </Section>
  );
}
