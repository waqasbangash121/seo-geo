import Link from "next/link";

import { listRemoteManagedContent } from "@/lib/editor-github";

export const dynamic = "force-dynamic";

export default async function ComparisonDashboardPage() {
  const comparisons = await listRemoteManagedContent("comparison");

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Decision content</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Comparisons</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Create neutral versus and alternative pages that help Shopify merchants choose the best fit for their needs.
          </p>
        </div>
        <Link href="/admin/comparisons/new" className="w-fit rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
          Create comparison
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface">
        {comparisons.length ? (
          comparisons.map((comparison) => (
            <div key={comparison.slug} className="flex items-center justify-between gap-4 border-b border-border px-5 py-5 last:border-b-0">
              <div className="min-w-0">
                <p className="truncate font-semibold">{comparison.title}</p>
                <p className="mt-1 truncate text-sm text-muted-foreground">/comparisons/{comparison.slug}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground sm:block">{comparison.draft ? "Draft" : "Published"}</span>
                <Link href={`/admin/comparisons/${comparison.slug}`} className="text-sm font-semibold text-primary">Edit</Link>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="font-semibold">No comparisons yet</p>
            <p className="mt-2 text-sm text-muted-foreground">Start with a verified, buyer-focused comparison rather than an unsupported alternative page.</p>
          </div>
        )}
      </div>
    </div>
  );
}
