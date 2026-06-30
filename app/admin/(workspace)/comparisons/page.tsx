import Link from "next/link";
import { Plus, Scale, SearchCheck } from "lucide-react";

import {
  AdminContentRow,
  AdminEmptyState,
  AdminMetric,
} from "@/components/admin/admin-ui";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { listStudioManagedContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function ComparisonDashboardPage() {
  const comparisons = await listStudioManagedContent("comparison");
  const draftCount = comparisons.filter((comparison) => comparison.draft).length;
  const publishedCount = comparisons.length - draftCount;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Decision content</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Comparisons</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Create neutral versus and alternative pages that help Shopify merchants compare options clearly.
            </p>
          </div>
          <Link
            href="/admin/comparisons/new"
            className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Plus aria-hidden="true" className="size-4" />
            Create comparison
          </Link>
        </div>
      </section>

      <section aria-label="Comparison stats" className="grid gap-3 sm:grid-cols-3">
        <AdminMetric label="Total comparisons" value={comparisons.length} tone="violet" />
        <AdminMetric label="Published" value={publishedCount} tone="green" />
        <AdminMetric label="Drafts" value={draftCount} tone="blue" />
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
          <div>
            <h2 className="font-semibold tracking-tight">Comparison queue</h2>
            <p className="mt-1 text-sm text-muted-foreground">Keep claims fair, current, and buyer-focused.</p>
          </div>
          <span className="hidden items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground sm:inline-flex">
            <SearchCheck aria-hidden="true" className="size-4" />
            Verify claims
          </span>
        </div>

        {comparisons.length ? (
          comparisons.map((comparison) => (
            <AdminContentRow
              key={comparison.slug}
              href={`/admin/comparisons/${comparison.slug}`}
              title={comparison.title}
              path={`/comparisons/${comparison.slug}`}
              description={comparison.decisionSummary || comparison.excerpt}
              draft={comparison.draft}
              meta={[
                comparison.competitorName ? `Target: ${comparison.competitorName}` : comparison.category,
                `${comparison.readingTime} min read`,
                formatDate(comparison.publishedAt),
                ...(comparison.focusKeyword ? [`Keyword: ${comparison.focusKeyword}`] : []),
              ]}
              Icon={Scale}
              secondaryAction={<DeleteContentButton compact type="comparison" slug={comparison.slug} title={comparison.title} redirectTo="/admin/comparisons" />}
            />
          ))
        ) : (
          <AdminEmptyState
            title="No comparisons yet"
            description="Start with a verified, buyer-focused comparison rather than an unsupported alternative page."
            href="/admin/comparisons/new"
            action="Create comparison"
            Icon={Scale}
          />
        )}
      </section>
    </div>
  );
}
