import Link from "next/link";

import { requireEditor } from "@/lib/editor-session";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const modules = [
  {
    href: "/admin/blogs",
    label: "Blog",
    description: "Articles and thought leadership",
  },
  {
    href: "/admin/comparisons",
    label: "Comparisons",
    description: "Alternative and versus pages",
  },
  {
    href: "/admin/resources",
    label: "Resources",
    description: "Guides, playbooks, and templates",
  },
];

export default async function ContentStudioLayout({ children }: { children: React.ReactNode }) {
  const editor = await requireEditor();

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-border pb-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Link href="/admin" className="text-xl font-semibold tracking-tight transition-colors hover:text-primary">
                Hyper Content Studio
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">Plan, write, review, and publish content with one signed-in workspace.</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="text-muted-foreground">Signed in as <span className="font-medium text-foreground">{editor.login}</span></span>
              <Link href="/" className="font-medium text-muted-foreground transition-colors hover:text-primary">
                View website
              </Link>
            </div>
          </div>

          <nav aria-label="Content modules" className="mt-6 grid gap-2 sm:grid-cols-3">
            {modules.map((module) => (
              <Link
                key={module.href}
                href={module.href}
                className="group rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <p className="font-semibold transition-colors group-hover:text-primary">{module.label}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{module.description}</p>
              </Link>
            ))}
          </nav>
        </header>
        <div className="py-8">{children}</div>
      </div>
    </main>
  );
}
