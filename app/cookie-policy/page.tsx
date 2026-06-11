import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description: "Understand how Hyper uses cookies and similar technologies across the website.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <Section spacing="lg">
      <Container className="stack-md">
        <h1 className="type-display">Cookie Policy</h1>
        <p className="type-body">
          This policy explains what cookies we use and how you can manage your preferences.
        </p>
      </Container>
    </Section>
  );
}
