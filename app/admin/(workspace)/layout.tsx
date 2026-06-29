import Link from "next/link";

import { requireEditor } from "@/lib/editor-session";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function BlogWorkspaceLayout({ children }: { children: React.ReactNode }) {
  const editor = await requireEditor();

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/admin/blogs" className="text-xl font-semibold tracking-tight">
              Hyper Blog Editor
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">Signed in as {editor.login}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              View public blog
            </Link>
            <Link href="/admin/blogs/new" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
              New article
            </Link>
          </div>
        </header>
        <div className="py-8">{children}</div>
      </div>
    </main>
  );
}
