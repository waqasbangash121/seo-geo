"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, CheckCircle2, Loader2, SearchCheck, TriangleAlert } from "lucide-react";

import type { BlogPostInput } from "@/lib/blog-admin-types";

export type AuditStatus = "pass" | "warning" | "error";

export type BlogAuditCheck = {
  id: string;
  label: string;
  status: AuditStatus;
  message: string;
};

export type KeywordIdea = {
  phrase: string;
  reason: string;
};

export type BlogAuditResult = {
  generatedAt: string;
  focusKeyword: string;
  onPagePotential: {
    score: number;
    label: "Strong" | "Developing" | "Needs work";
    summary: string;
  };
  article: {
    wordCount: number;
    headingCount: number;
    questionHeadingCount: number;
    keywordMentions: number;
    checks: BlogAuditCheck[];
  };
  keywordIdeas: {
    secondary: KeywordIdea[];
    questions: KeywordIdea[];
  };
};

type BlogAuditPanelProps = {
  article: BlogPostInput;
  result: BlogAuditResult | null;
  onResult: (result: BlogAuditResult) => void;
};

type BlogAuditFeedbackProps = {
  checks: BlogAuditCheck[];
};

type BlogKeywordIdeasProps = {
  title: string;
  description: string;
  ideas: KeywordIdea[];
};

type ReviewClasses = {
  panel: string;
  badge: string;
};

function reviewClasses(status: AuditStatus): ReviewClasses {
  if (status === "pass") {
    return {
      panel:
        "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50",
      badge:
        "bg-emerald-100 text-emerald-900 dark:bg-emerald-300/20 dark:text-emerald-50",
    };
  }

  if (status === "error") {
    return {
      panel:
        "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-50",
      badge: "bg-rose-100 text-rose-900 dark:bg-rose-300/20 dark:text-rose-50",
    };
  }

  return {
    panel:
      "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-50",
    badge: "bg-amber-100 text-amber-900 dark:bg-amber-300/20 dark:text-amber-50",
  };
}

function potentialStatus(label: BlogAuditResult["onPagePotential"]["label"]): AuditStatus {
  if (label === "Strong") return "pass";
  if (label === "Needs work") return "error";
  return "warning";
}

function statusLabel(status: AuditStatus): string {
  if (status === "pass") return "Ready";
  if (status === "error") return "Fix this";
  return "Improve";
}

function iconForStatus(status: AuditStatus): LucideIcon {
  if (status === "pass") return CheckCircle2;
  if (status === "error") return AlertCircle;
  return TriangleAlert;
}

export function BlogAuditFeedback({ checks }: BlogAuditFeedbackProps) {
  if (!checks.length) return null;

  return (
    <div className="grid gap-2" aria-live="polite">
      {checks.map((check) => {
        const classes = reviewClasses(check.status);
        const StatusIcon = iconForStatus(check.status);

        return (
          <div key={check.id} className={`rounded-md border px-3 py-3 shadow-sm ${classes.panel}`}>
            <div className="flex items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.01em] text-current">
                <StatusIcon aria-hidden="true" className="size-3.5" />
                {check.label}
              </p>
              <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${classes.badge}`}>
                {statusLabel(check.status)}
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-5 text-current opacity-90">{check.message}</p>
          </div>
        );
      })}
    </div>
  );
}

export function BlogKeywordIdeas({ title, description, ideas }: BlogKeywordIdeasProps) {
  if (!ideas.length) return null;

  return (
    <div className="rounded-md border border-border bg-surface p-4 shadow-sm">
      <p className="text-sm font-bold text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
      <div className="mt-3 grid gap-2">
        {ideas.map((idea) => (
          <div key={idea.phrase} className="rounded-md border border-border bg-muted/60 px-3 py-3">
            <p className="text-sm font-semibold text-foreground">{idea.phrase}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{idea.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlogAuditPanel({ article, result, onResult }: BlogAuditPanelProps) {
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const potential = result ? potentialStatus(result.onPagePotential.label) : null;
  const potentialClasses = potential ? reviewClasses(potential) : null;

  async function runAudit() {
    setRunning(true);
    setError("");

    try {
      const response = await fetch("/api/admin/blogs/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });
      const body = (await response.json()) as BlogAuditResult & { error?: string };

      if (!response.ok) throw new Error(body.error || "The content review could not be completed.");
      onResult(body);
    } catch (auditError) {
      setError(auditError instanceof Error ? auditError.message : "The content review could not be completed.");
    } finally {
      setRunning(false);
    }
  }

  const improvementCount = result?.article.checks.filter((check) => check.status !== "pass").length ?? 0;

  return (
    <section className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/60 text-primary">
          <SearchCheck aria-hidden="true" className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Quality check</p>
              <h2 className="mt-1 font-semibold text-foreground">Content review</h2>
            </div>
            {result && potentialClasses ? (
              <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${potentialClasses.panel}`}>
                {result.onPagePotential.score}/100
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Review keyword targeting, metadata, content depth, and answer coverage for this draft.
          </p>
        </div>
      </div>

      {result && potentialClasses ? (
        <div className={`mt-4 rounded-md border p-3 ${potentialClasses.panel}`}>
          <p className="text-sm font-bold text-current">{result.onPagePotential.label} on-page potential</p>
          <p className="mt-1 text-xs leading-5 text-current opacity-90">{result.onPagePotential.summary}</p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={runAudit}
        disabled={running}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-muted/60 px-4 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
        {running ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <SearchCheck aria-hidden="true" className="size-4" />}
        {running ? "Reviewing content..." : result ? "Refresh content review" : "Run content review"}
      </button>

      {result ? (
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          {improvementCount ? `${improvementCount} improvement${improvementCount === 1 ? "" : "s"} are highlighted beside the relevant fields.` : "All current draft checks are ready."}
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-3 text-sm font-medium text-rose-950 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-50">
          {error}
        </p>
      ) : null}
    </section>
  );
}
