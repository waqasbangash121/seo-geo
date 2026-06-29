import { notFound } from "next/navigation";

import { ManagedContentEditorForm } from "@/components/managed-content-editor-form";
import { getRemoteManagedContent } from "@/lib/editor-github";

type ComparisonEditPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function ComparisonEditPage({ params }: ComparisonEditPageProps) {
  const { slug } = await params;
  const comparison = await getRemoteManagedContent("comparison", slug);
  if (!comparison) notFound();

  const { sourcePath: _sourcePath, ...initialItem } = comparison;
  return <ManagedContentEditorForm type="comparison" initialItem={initialItem} originalSlug={slug} />;
}
