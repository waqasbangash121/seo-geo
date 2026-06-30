import Link from "next/link";
import {
  BookOpenText,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Scale,
  Settings2,
} from "lucide-react";

import { ThemeSwitcher } from "@/components/layout/theme-switcher";
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
    href: "/admin",
    label: "Dashboard",
    description: "Workspace overview",
    Icon: LayoutDashboard,
  },
  {
    href: "/admin/blogs",
    label: "Articles",
    description: "Articles and thought leadership",
    Icon: BookOpenText,
  },
  {
    href: "/admin/comparisons",
    label: "Comparisons",
    description: "Alternative and versus pages",
    Icon: Scale,
  },
  {
    href: "/admin/resources",
    label: "Resources",
    description: "Guides, playbooks, and templates",
    Icon: FileText,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    description: "AI connection and workspace preferences",
    Icon: Settings2,
  },
];

function SignOutButton({ compact = false }: { compact?: boolean }) {
  return (
    <form action="/api/admin/auth/logout" method="post">
      <button
        type="submit"
        className={
          compact
            ? "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:hover:border-rose-400/20 dark:hover:bg-rose-400/10 dark:hover:text-rose-200"
            : "inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:hover:border-rose-400/20 dark:hover:bg-rose-400/10 dark:hover:text-rose-200"
        }
      >
        <LogOut aria-hidden="true" className="size-4" />
        Sign out
      </button>
    </form>
  );
}

export default async function ContentStudioLayout({ children }: { children: React.ReactNode }) {
  const editor = await requireEditor();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-border bg-surface/90 px-4 py-5 backdrop-blur lg:flex lg:flex-col">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              H
            </span>
            <span>
              <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Hyper
              </span>
              <span className="block text-lg font-semibold tracking-tight">Content Studio</span>
            </span>
          </Link>

          <nav aria-label="Content modules" className="mt-7 grid gap-1.5">
            {modules.map(({ href, label, description, Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-3 rounded-lg px-3 py-3 transition-all hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                    {description}
                  </span>
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto rounded-lg border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Signed in
            </p>
            <p className="mt-2 truncate text-sm font-semibold">{editor.login}</p>
            <div className="mt-4 flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2">
              <span className="text-sm font-semibold text-muted-foreground">Theme</span>
              <ThemeSwitcher />
            </div>
            <div className="mt-3 grid gap-2">
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                <ExternalLink aria-hidden="true" className="size-4" />
                View website
              </Link>
              <SignOutButton />
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-border bg-surface/90 px-4 py-3 backdrop-blur lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <Link href="/admin" className="flex min-w-0 items-center gap-2 font-semibold tracking-tight">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground">
                  H
                </span>
                <span className="truncate">Content Studio</span>
              </Link>
              <div className="flex shrink-0 items-center gap-2">
                <div className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-2">
                  <ThemeSwitcher />
                </div>
                <Link
                  href="/"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  <ExternalLink aria-hidden="true" className="size-4" />
                  Site
                </Link>
                <SignOutButton compact />
              </div>
            </div>

            <nav aria-label="Mobile content modules" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {modules.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {label}
                </Link>
              ))}
            </nav>
          </header>

          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
