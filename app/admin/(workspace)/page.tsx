import Link from "next/link";
import { ArrowRight, BookOpenText, FileText, Scale } from "lucide-react";

const modules = [
  {
    href: "/admin/blogs",
    createHref: "/admin/blogs/new",
    title: "Blog",
    eyebrow: "Thought leadership",
    description: "Create focused articles with keyword guidance, question coverage, and metadata review.",
    action: "Create article",
    Icon: BookOpenText,
  },
  {
    href: "/admin/comparisons",
    createHref: "/admin/comparisons/new",
    title: "Comparisons",
    eyebrow: "Decision content",
    description: "Build balanced versus and alternative pages with factual comparison prompts and search-ready structure.",
    action: "Create comparison",
    Icon: Scale,
  },
  {
    href: "/admin/resources",
    createHref: "/admin/resources/new",
    title: "Resources",
    eyebrow: "Practical content",
    description: "Publish guides, playbooks, checklists, templates, and implementation resources for your audience.",
    action: "Create resource",
    Icon: FileText,
  },
];

export default function AdminHomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Content Studio</p>
        <div className="mt-3 max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Choose the content you want to create.</h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Every module uses the same GitHub login, draft workflow, publishing controls, and content review experience.
          </p>
        </div>
      </section>

      <section aria-label="Content modules" className="grid gap-4 lg:grid-cols-3">
        {modules.map(({ href, createHref, title, eyebrow, description, action, Icon }) => (
          <article key={href} className="group flex min-h-72 flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex rounded-xl border border-border bg-background p-3 text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</p>
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{description}</p>
            <div className="mt-6 flex items-center justify-between gap-3">
              <Link href={href} className="text-sm font-semibold text-primary transition-colors hover:text-foreground">
                View all
              </Link>
              <Link href={createHref} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
                {action}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
