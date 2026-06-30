import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  FileText,
  Layers3,
  PencilLine,
  Scale,
  SearchCheck,
  Sparkles,
} from "lucide-react";

import { AdminMetric } from "@/components/admin/admin-ui";

const modules = [
  {
    href: "/admin/blogs",
    createHref: "/admin/blogs/new",
    title: "Write a blog",
    eyebrow: "Thought leadership",
    description: "Build search-focused articles with keyword guidance, content review, metadata, and Markdown publishing.",
    action: "New article",
    Icon: BookOpenText,
    accent: "border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-sky-50",
  },
  {
    href: "/admin/comparisons",
    createHref: "/admin/comparisons/new",
    title: "Create a comparison",
    eyebrow: "Decision content",
    description: "Draft balanced versus and alternative pages with buyer intent, competitor context, and claim discipline.",
    action: "New comparison",
    Icon: Scale,
    accent: "border-violet-200 bg-violet-50 text-violet-950 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-50",
  },
  {
    href: "/admin/resources",
    createHref: "/admin/resources/new",
    title: "Publish a resource",
    eyebrow: "Practical assets",
    description: "Ship guides, playbooks, checklists, templates, documentation, and implementation resources.",
    action: "New resource",
    Icon: FileText,
    accent: "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50",
  },
];

const workflow = [
  { label: "Draft", description: "Capture the angle, slug, and core content.", Icon: PencilLine },
  { label: "Review", description: "Run content checks and improve the page before publishing.", Icon: SearchCheck },
  { label: "Publish", description: "Save to Neon and refresh public routes immediately.", Icon: CheckCircle2 },
];

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Layers3 aria-hidden="true" className="size-4" />
              Content operations
            </span>
            <span className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">
              Workspace ready
            </span>
          </div>

          <div className="mt-6 max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Choose what you want to create next.
            </h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Start with the right content format, then move through one consistent editing, review, and publish flow.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {modules.map(({ createHref, action, Icon }) => (
              <Link
                key={createHref}
                href={createHref}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon aria-hidden="true" className="size-4" />
                {action}
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Publishing path</p>
          <div className="mt-5 grid gap-4">
            {workflow.map(({ label, description, Icon }) => (
              <div key={label} className="flex gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section aria-label="Workspace metrics" className="grid gap-3 sm:grid-cols-3">
        <AdminMetric label="Content modules" value="3" tone="blue" />
        <AdminMetric label="Unified review flow" value="1" tone="green" />
        <AdminMetric label="Guided creation paths" value="3" tone="violet" />
      </section>

      <section aria-label="Content modules" className="grid gap-4 xl:grid-cols-3">
        {modules.map(({ href, createHref, title, eyebrow, description, action, Icon, accent }) => (
          <article
            key={href}
            className="group flex min-h-[19rem] flex-col rounded-lg border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <span className={`inline-flex size-12 items-center justify-center rounded-lg border ${accent}`}>
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</p>
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{description}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <Link href={href} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
                View library
              </Link>
              <Link
                href={createHref}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {action}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Assistant support</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">Every editor includes AI drafting and SEO review.</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Use suggestions as editable material, then rely on the review panel to catch keyword, metadata, and answer-coverage gaps before publishing.
            </p>
          </div>
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
            <Sparkles aria-hidden="true" className="size-6" />
          </span>
        </div>
      </section>
    </div>
  );
}
