import Link from "next/link";
import { BookOpenText, Plus, SearchCheck } from "lucide-react";

import {
  AdminContentRow,
  AdminEmptyState,
  AdminMetric,
} from "@/components/admin/admin-ui";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { listStudioBlogPosts } from "@/lib/content-store";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BlogDashboardPage() {
  const posts = await listStudioBlogPosts();
  const draftCount = posts.filter((post) => post.draft).length;
  const publishedCount = posts.length - draftCount;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Article library</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Blogs</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Manage thought leadership, SEO articles, and educational content from draft through publish.
            </p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Plus aria-hidden="true" className="size-4" />
            Create article
          </Link>
        </div>
      </section>

      <section aria-label="Article stats" className="grid gap-3 sm:grid-cols-3">
        <AdminMetric label="Total articles" value={posts.length} tone="blue" />
        <AdminMetric label="Published" value={publishedCount} tone="green" />
        <AdminMetric label="Drafts" value={draftCount} tone="violet" />
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
          <div>
            <h2 className="font-semibold tracking-tight">Content queue</h2>
            <p className="mt-1 text-sm text-muted-foreground">Newest articles appear first.</p>
          </div>
          <span className="hidden items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground sm:inline-flex">
            <SearchCheck aria-hidden="true" className="size-4" />
            Review before publish
          </span>
        </div>

        {posts.length ? (
          posts.map((post) => (
            <AdminContentRow
              key={post.slug}
              href={`/admin/blogs/${post.slug}`}
              title={post.title}
              path={`/blog/${post.slug}`}
              description={post.excerpt}
              draft={post.draft}
              meta={[
                post.category,
                `${post.readingTime} min read`,
                formatDate(post.publishedAt),
                ...(post.focusKeyword ? [`Keyword: ${post.focusKeyword}`] : []),
              ]}
              Icon={BookOpenText}
              secondaryAction={<DeleteContentButton compact type="blog" slug={post.slug} title={post.title} redirectTo="/admin/blogs" />}
            />
          ))
        ) : (
          <AdminEmptyState
            title="No articles yet"
            description="Create the first blog draft, add keyword context, and use the content review before publishing."
            href="/admin/blogs/new"
            action="Create article"
            Icon={BookOpenText}
          />
        )}
      </section>
    </div>
  );
}
