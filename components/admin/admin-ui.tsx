import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, FileText } from "lucide-react";

import { cn } from "@/lib/utils";

type AdminStatusBadgeProps = {
  draft: boolean;
};

type AdminMetricProps = {
  label: string;
  value: number | string;
  tone?: "neutral" | "green" | "blue" | "violet";
};

type AdminContentRowProps = {
  href: string;
  title: string;
  path: string;
  description?: string;
  draft: boolean;
  meta: string[];
  Icon?: LucideIcon;
};

type AdminEmptyStateProps = {
  title: string;
  description: string;
  href: string;
  action: string;
  Icon?: LucideIcon;
};

const metricToneClasses = {
  neutral: "border-border bg-surface text-foreground",
  green:
    "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50",
  blue:
    "border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-sky-50",
  violet:
    "border-violet-200 bg-violet-50 text-violet-950 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-50",
};

export function AdminStatusBadge({ draft }: AdminStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold",
        draft
          ? "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-100"
          : "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-100",
      )}
    >
      {draft ? "Draft" : "Published"}
    </span>
  );
}

export function AdminMetric({ label, value, tone = "neutral" }: AdminMetricProps) {
  return (
    <div className={cn("rounded-lg border p-4", metricToneClasses[tone])}>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-current opacity-75">{label}</p>
    </div>
  );
}

export function AdminContentRow({
  href,
  title,
  path,
  description,
  draft,
  meta,
  Icon = FileText,
}: AdminContentRowProps) {
  return (
    <article className="group grid gap-4 border-b border-border px-4 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-5">
      <div className="flex min-w-0 gap-3">
        <span className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/60 text-primary">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-base font-semibold tracking-tight text-foreground">{title}</h2>
            <AdminStatusBadge draft={draft} />
          </div>
          <p className="mt-1 truncate text-sm text-muted-foreground">{path}</p>
          {description ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{description}</p> : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {meta.map((item) => (
              <span key={item} className="rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Link
        href={href}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-muted/60 px-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Edit
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}

export function AdminEmptyState({
  title,
  description,
  href,
  action,
  Icon = FileText,
}: AdminEmptyStateProps) {
  return (
    <div className="grid place-items-center px-4 py-14 text-center">
      <div className="inline-flex size-12 items-center justify-center rounded-lg border border-border bg-muted/60 text-primary">
        <Icon aria-hidden="true" className="size-6" />
      </div>
      <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {action}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
