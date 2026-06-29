import Link from "next/link";

import { listRemotePosts } from "@/lib/editor-github";

export const dynamic = "force-dynamic";

export default async function BlogDashboardPage() {
  const posts = await listRemotePosts();

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Content workspace</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Articles</h1>
        </div>
        <Link href="/admin/blogs/new" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">Create article</Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface">
        {posts.map((post) => (
          <div key={post.slug} className="flex items-center justify-between gap-4 border-b border-border px-5 py-5 last:border-b-0">
            <div className="min-w-0">
              <p className="truncate font-medium">{post.title}</p>
              <p className="mt-1 truncate text-sm text-muted-foreground">/blog/{post.slug}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground sm:block">{post.draft ? "Draft" : "Published"}</span>
              <Link href={`/admin/blogs/${post.slug}`} className="text-sm font-medium text-primary">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
