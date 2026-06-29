"use client";

import { useState } from "react";

import type { BlogPostInput } from "@/lib/blog-admin-types";

type AuditStatus = "pass" | "warning" | "error";
type Severity = "critical" | "high" | "medium" | "low" | "info";

type BlogAuditResult = {
  generatedAt: string;
  article: {
    score: number;
    wordCount: number;
    h2Count: number;
    h3Count: number;
    internalLinkCount: number;
    checks: { id: string; label: string; status: AuditStatus; message: string }[];
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
};

function statusClass(status: AuditStatus): string {
  if (status === "pass") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200";
  if (status === "error") return "border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-200";
  return "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-100";
}

function statusLabel(status: AuditStatus): string {
  if (status === "pass") return "Pass";
  if (status === "error") return "Needs work";
  return "Improve";
}

function severityClass(severity: Severity): string {
  if (severity === "critical" || severity === "high") return "text-red-700 dark:text-red-300";
  if (severity === "medium") return "text-amber-800 dark:text-amber-200";
  return "text-muted-foreground";
}

export function BlogAuditPanel({ article }: BlogAuditPanelProps) {
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<BlogAuditResult | null>(null);

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
      setResult(body);
    } catch (auditError) {
      setError(auditError instanceof Error ? auditError.message : "The crawler audit could not be completed.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">Crawler audit</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Check the draft before publishing, then run a small technical, SEO, and content crawl of your configured public site.
          </p>
        </div>
        {result ? (
          <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium">
            {result.article.score}/100
          </span>
        ) : null}
      </div>

      <button
        type="button"
        onClick={runAudit}
        disabled={running}
        className="mt-5 w-full rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
        {running ? "Running crawler audit…" : result ? "Run audit again" : "Run SEO and GEO audit"}
      </button>

      {error ? <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">{error}</p> : null}

      {result ? (
        <div className="mt-5 space-y-5">
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Draft readiness</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {result.article.wordCount} words · {result.article.h2Count} H2 sections · {result.article.internalLinkCount} internal links
                </p>
              </div>
              <p className="text-2xl font-semibold">{result.article.score}</p>
            </div>

            <div className="mt-4 grid gap-2">
              {result.article.checks.map((check) => (
                <div key={check.id} className={`rounded-md border px-3 py-2.5 ${statusClass(check.status)}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{check.label}</p>
                    <span className="text-xs font-semibold">{statusLabel(check.status)}</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 opacity-90">{check.message}</p>
                </div>
              ))}
            </div>
          </div>

          {result.site.available && result.site.scores ? (
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Live-site crawl</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {result.site.pagesCrawled} pages crawled · {result.site.issueCount} issues found
                  </p>
                </div>
                <p className="text-2xl font-semibold">{result.site.scores.overall}</p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
                {Object.entries(result.site.scores).map(([label, score]) => (
                  <div key={label} className="rounded-md border border-border p-2.5">
                    <p className="capitalize text-muted-foreground">{label}</p>
                    <p className="mt-1 text-base font-semibold">{score}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-900 dark:text-amber-100">
              {result.site.message || "The live-site crawl is unavailable right now; draft checks are still complete."}
            </p>
          )}

          {result.site.recommendations?.length ? (
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm font-medium">Top crawler priorities</p>
              <div className="mt-3 space-y-4">
                {result.site.recommendations.map((recommendation) => (
                  <article key={`${recommendation.priority}-${recommendation.title}`} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium">{recommendation.priority}. {recommendation.title}</p>
                      <span className={`shrink-0 text-xs font-semibold capitalize ${severityClass(recommendation.severity)}`}>
                        {recommendation.severity}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{recommendation.whatToFix}</p>
                    {recommendation.howToFix[0] ? <p className="mt-2 text-xs leading-5">Next step: {recommendation.howToFix[0]}</p> : null}
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {result.site.suggestedInternalLinks?.length ? (
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm font-medium">Suggested internal links</p>
              <div className="mt-3 grid gap-3">
                {result.site.suggestedInternalLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-border p-3 transition-colors hover:bg-muted"
                  >
                    <p className="text-sm font-medium">{link.title}</p>
                    <p className="mt-1 break-all text-xs text-primary">{link.url}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{link.reason}</p>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
