import { notFound } from "next/navigation";

import { ManagedContentEditorForm } from "@/components/managed-content-editor-form";
import { getRemoteManagedContent } from "@/lib/editor-github";

type ResourceEditPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function ResourceEditPage({ params }: ResourceEditPageProps) {
  const { slug } = await params;
  const resource = await getRemoteManagedContent("resource", slug);
  if (!resource) notFound();

  const { sourcePath: _sourcePath, ...initialItem } = resource;
  return <ManagedContentEditorForm type="resource" initialItem={initialItem} originalSlug={slug} />;
}
