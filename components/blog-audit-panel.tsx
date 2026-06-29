"use client";

import { useState } from "react";

import type { BlogPostInput } from "@/lib/blog-admin-types";

export type AuditStatus = "pass" | "warning" | "error";
export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type BlogAuditCheck = {
  id: string;
  label: string;
  status: AuditStatus;
  message: string;
};

export type BlogAuditResult = {
  generatedAt: string;
  article: {
    score: number;
    wordCount: number;
    h2Count: number;
    h3Count: number;
    internalLinkCount: number;
    checks: BlogAuditCheck[];
  };
  site: {
    available: boolean;
    targetUrl: string;
    scores?: {
      overall: number;
      technical: number;
      seo: number;
      content: number;
      performance: number;
      accessibility: number;
      security: number;
    };
    pagesCrawled?: number;
    issueCount?: number;
    recommendations?: {
      priority: number;
      title: string;
      severity: Severity;
      whatToFix: string;
      howToFix: string[];
      affectedUrls: string[];
    }[];
    suggestedInternalLinks?: { title: string; url: string; reason: string }[];
    message?: string;
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

function statusClass(status: AuditStatus): string {
  if (status === "pass") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200";
  if (status === "error") return "border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-200";
  return "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-100";
}

function statusLabel(status: AuditStatus): string {
  if (status === "pass") return "Ready";
  if (status === "error") return "Fix this";
  return "Improve";
}

function severityClass(severity: Severity): string {
  if (severity === "critical" || severity === "high") return "text-red-700 dark:text-red-300";
  if (severity === "medium") return "text-amber-800 dark:text-amber-200";
  return "text-muted-foreground";
}

export function BlogAuditFeedback({ checks }: BlogAuditFeedbackProps) {
  if (!checks.length) return null;

  return (
    <div className="grid gap-2" aria-live="polite">
      {checks.map((check) => (
        <div key={check.id} className={`rounded-lg border px-3 py-2.5 ${statusClass(check.status)}`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold">{check.label}</p>
            <span className="text-xs font-semibold">{statusLabel(check.status)}</span>
          </div>
          <p className="mt-1 text-xs leading-5 opacity-90">{check.message}</p>
        </div>
      ))}
    </div>
  );
}

export function BlogInternalLinkSuggestions({ links }: { links?: BlogAuditResult["site"]["suggestedInternalLinks"] }) {
  if (!links?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <div>
        <p className="text-sm font-semibold">Suggested internal links</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Add the most relevant of these links directly into the article content above.
        </p>
      </div>
      <div className="mt-3 grid gap-2">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border bg-background p-3 transition-colors hover:bg-muted"
          >
            <p className="text-sm font-medium">{link.title}</p>
            <p className="mt-1 break-all text-xs text-primary">{link.url}</p>
            <p className="mt-1 text-xs text-muted-foreground">{link.reason}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export function BlogSiteAuditResults({ result }: { result: BlogAuditResult | null }) {
  if (!result) return null;

  return (
    <section className="rounded-xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Live site health</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            These are site-wide findings from the crawler. Fix them in the relevant page or technical area rather than inside this article form.
          </p>
        </div>
        {result.site.available && result.site.scores ? (
          <span className="rounded-full border border-border px-3 py-1 text-sm font-semibold">
            {result.site.scores.overall}/100 overall
          </span>
        ) : null}
      </div>

      {result.site.available && result.site.scores ? (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Object.entries(result.site.scores).map(([label, score]) => (
              <div key={label} className="rounded-lg border border-border bg-background p-3">
                <p className="capitalize text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 text-lg font-semibold">{score}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {result.site.pagesCrawled} pages crawled · {result.site.issueCount} issues found · {result.site.targetUrl}
          </p>
        </>
      ) : (
        <p className="mt-5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-900 dark:text-amber-100">
          {result.site.message || "The live-site crawl is unavailable right now; article-level feedback is still complete."}
        </p>
      )}

      {result.site.recommendations?.length ? (
        <div className="mt-6 grid gap-3">
          {result.site.recommendations.map((recommendation) => (
            <article key={`${recommendation.priority}-${recommendation.title}`} className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold">
                  {recommendation.priority}. {recommendation.title}
                </p>
                <span className={`shrink-0 text-xs font-semibold capitalize ${severityClass(recommendation.severity)}`}>
                  {recommendation.severity}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{recommendation.whatToFix}</p>
              {recommendation.howToFix[0] ? (
                <p className="mt-3 rounded-md bg-muted/50 px-3 py-2 text-sm leading-6">
                  <span className="font-semibold">Next step:</span> {recommendation.howToFix[0]}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
    </section>
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

      if (!response.ok) throw new Error(body.error || "The crawler audit could not be completed.");
      onResult(body);
    } catch (auditError) {
      setError(auditError instanceof Error ? auditError.message : "The crawler audit could not be completed.");
    } finally {
      setRunning(false);
    }
  }

  const warningCount = result?.article.checks.filter((check) => check.status !== "pass").length ?? 0;

  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">SEO and GEO audit</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Run the audit, then use the feedback shown beside the relevant fields.
          </p>
        </div>
        {result ? <span className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold">{result.article.score}/100</span> : null}
      </div>

      <button
        type="button"
        onClick={runAudit}
        disabled={running}
        className="mt-5 w-full rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
        {running ? "Running crawler audit…" : result ? "Refresh audit" : "Run SEO and GEO audit"}
      </button>

      {result ? (
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          {warningCount ? `${warningCount} improvement${warningCount === 1 ? "" : "s"} are highlighted in the editor.` : "All current draft checks are ready."}
        </p>
      ) : null}
      {error ? <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">{error}</p> : null}
    </section>
  );
}
