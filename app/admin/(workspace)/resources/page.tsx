import Link from "next/link";
import { FileText, Plus, SearchCheck } from "lucide-react";

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

export default async function ResourceDashboardPage() {
  const resources = await listStudioManagedContent("resource");
  const draftCount = resources.filter((resource) => resource.draft).length;
  const publishedCount = resources.length - draftCount;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Practical content</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Resources</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Publish actionable guides, playbooks, checklists, templates, and documentation for Shopify teams.
            </p>
          </div>
          <Link
            href="/admin/resources/new"
            className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Plus aria-hidden="true" className="size-4" />
            Create resource
          </Link>
        </div>
      </section>

      <section aria-label="Resource stats" className="grid gap-3 sm:grid-cols-3">
        <AdminMetric label="Total resources" value={resources.length} tone="green" />
        <AdminMetric label="Published" value={publishedCount} tone="blue" />
        <AdminMetric label="Drafts" value={draftCount} tone="violet" />
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
          <div>
            <h2 className="font-semibold tracking-tight">Resource queue</h2>
            <p className="mt-1 text-sm text-muted-foreground">Keep outcomes clear and the next step obvious.</p>
          </div>
          <span className="hidden items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground sm:inline-flex">
            <SearchCheck aria-hidden="true" className="size-4" />
            Check usefulness
          </span>
        </div>

        {resources.length ? (
          resources.map((resource) => (
            <AdminContentRow
              key={resource.slug}
              href={`/admin/resources/${resource.slug}`}
              title={resource.title}
              path={`/resources/${resource.slug}`}
              description={resource.excerpt}
              draft={resource.draft}
              meta={[
                resource.resourceType ?? resource.category,
                `${resource.readingTime} min read`,
                formatDate(resource.publishedAt),
                ...(resource.audience ? [`Audience: ${resource.audience}`] : []),
              ]}
              Icon={FileText}
              secondaryAction={<DeleteContentButton compact type="resource" slug={resource.slug} title={resource.title} redirectTo="/admin/resources" />}
            />
          ))
        ) : (
          <AdminEmptyState
            title="No resources yet"
            description="Create a practical resource with a clear audience, format, and implementation outcome."
            href="/admin/resources/new"
            action="Create resource"
            Icon={FileText}
          />
        )}
      </section>
    </div>
  );
}
