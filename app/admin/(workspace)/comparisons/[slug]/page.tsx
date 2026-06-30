import { notFound } from "next/navigation";

import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { ManagedContentEditorForm } from "@/components/managed-content-editor-form";
import { getStudioManagedContentBySlug } from "@/lib/content-store";

type ComparisonEditPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function ComparisonEditPage({ params }: ComparisonEditPageProps) {
  const { slug } = await params;
  const comparison = await getStudioManagedContentBySlug("comparison", slug);
  if (!comparison) notFound();

  return (
    <div className="space-y-6">
      <ManagedContentEditorForm type="comparison" initialItem={comparison} originalSlug={slug} />
      <section className="rounded-lg border border-rose-200 bg-rose-50/70 p-5 dark:border-rose-400/25 dark:bg-rose-400/10">
        <h2 className="text-lg font-semibold text-rose-950 dark:text-rose-50">Danger zone</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-rose-900/90 dark:text-rose-100/85">
          Remove this comparison from the database and the public comparison directory. Restore it only from a database backup.
        </p>
        <div className="mt-4 max-w-xs">
          <DeleteContentButton type="comparison" slug={slug} title={comparison.title} redirectTo="/admin/comparisons" />
        </div>
      </section>
    </div>
  );
}
