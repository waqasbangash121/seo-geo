"use client";

import { useState } from "react";

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

function statusClass(status: AuditStatus): string {
  if (status === "pass") {
    return "border-emerald-600/30 bg-emerald-50 text-emerald-950 shadow-sm dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-100";
  }

  if (status === "error") {
    return "border-rose-600/30 bg-rose-50 text-rose-950 shadow-sm dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-100";
  }

  return "border-amber-600/35 bg-amber-50 text-amber-950 shadow-sm dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100";
}

function statusBadgeClass(status: AuditStatus): string {
  if (status === "pass") {
    return "bg-emerald-600/10 text-emerald-900 dark:bg-emerald-300/15 dark:text-emerald-100";
  }

  if (status === "error") {
    return "bg-rose-600/10 text-rose-900 dark:bg-rose-300/15 dark:text-rose-100";
  }

  return "bg-amber-600/10 text-amber-900 dark:bg-amber-300/15 dark:text-amber-100";
}

function potentialClass(label: BlogAuditResult["onPagePotential"]["label"]): string {
  if (label === "Strong") {
    return "border-emerald-600/30 bg-emerald-50 text-emerald-950 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-100";
  }

  if (label === "Needs work") {
    return "border-rose-600/30 bg-rose-50 text-rose-950 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-100";
  }

  return "border-amber-600/35 bg-amber-50 text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100";
}

function statusLabel(status: AuditStatus): string {
  if (status === "pass") return "Ready";
  if (status === "error") return "Fix this";
  return "Improve";
}

export function BlogAuditFeedback({ checks }: BlogAuditFeedbackProps) {
  if (!checks.length) return null;

  return (
    <div className="grid gap-2" aria-live="polite">
      {checks.map((check) => (
        <div key={check.id} className={`rounded-lg border px-3 py-3 ${statusClass(check.status)}`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold tracking-[0.01em]">{check.label}</p>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${statusBadgeClass(check.status)}`}>
              {statusLabel(check.status)}
            </span>
          </div>
          <p className="mt-1.5 text-xs leading-5 opacity-95">{check.message}</p>
        </div>
      ))}
    </div>
  );
}

export function BlogKeywordIdeas({ title, description, ideas }: BlogKeywordIdeasProps) {
  if (!ideas.length) return null;

  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <p className="text-sm font-bold text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
      <div className="mt-3 grid gap-2">
        {ideas.map((idea) => (
          <div key={idea.phrase} className="rounded-md border border-border bg-background px-3 py-3 shadow-sm">
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
    <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-bold text-foreground">Content review</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Review keyword targeting, metadata, content depth, and answer coverage for this draft.
          </p>
        </div>
        {result ? (
          <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${potentialClass(result.onPagePotential.label)}`}>
            {result.onPagePotential.score}/100
          </span>
        ) : null}
      </div>

      {result ? (
        <div className={`mt-4 rounded-lg border p-3 ${potentialClass(result.onPagePotential.label)}`}>
          <p className="text-sm font-bold">{result.onPagePotential.label} on-page potential</p>
          <p className="mt-1 text-xs leading-5 opacity-95">{result.onPagePotential.summary}</p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={runAudit}
        disabled={running}
        className="mt-5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
        {running ? "Reviewing content…" : result ? "Refresh content review" : "Run content review"}
      </button>

      {result ? (
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          {improvementCount ? `${improvementCount} improvement${improvementCount === 1 ? "" : "s"} are highlighted beside the relevant fields.` : "All current draft checks are ready."}
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 rounded-lg border border-rose-600/30 bg-rose-50 p-3 text-sm font-medium text-rose-950 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-100">
          {error}
        </p>
      ) : null}
    </section>
  );
}
