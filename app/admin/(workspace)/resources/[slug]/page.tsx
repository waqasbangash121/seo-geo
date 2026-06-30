import { notFound } from "next/navigation";

import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { ManagedContentEditorForm } from "@/components/managed-content-editor-form";
import { getStudioManagedContentBySlug } from "@/lib/content-store";

type ResourceEditPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function ResourceEditPage({ params }: ResourceEditPageProps) {
  const { slug } = await params;
  const resource = await getStudioManagedContentBySlug("resource", slug);
  if (!resource) notFound();

  return (
    <div className="space-y-6">
      <ManagedContentEditorForm type="resource" initialItem={resource} originalSlug={slug} />
      <section className="rounded-lg border border-rose-200 bg-rose-50/70 p-5 dark:border-rose-400/25 dark:bg-rose-400/10">
        <h2 className="text-lg font-semibold text-rose-950 dark:text-rose-50">Danger zone</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-rose-900/90 dark:text-rose-100/85">
          Remove this resource from the database and the public resource directory. Restore it only from a database backup.
        </p>
        <div className="mt-4 max-w-xs">
          <DeleteContentButton type="resource" slug={slug} title={resource.title} redirectTo="/admin/resources" />
        </div>
      </section>
    </div>
  );
}
