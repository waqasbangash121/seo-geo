import "server-only";

import {
  auditWebsite,
  type AuditRecommendation,
  type AuditScores,
  type CrawlPage,
} from "@waqashanifkhan/crawler";

import { siteConfig } from "@/config/site";

export type BlogAuditStatus = "pass" | "warning" | "error";

export type BlogAuditCheck = {
  id: string;
  label: string;
  status: BlogAuditStatus;
  message: string;
};

export type BlogAuditDraft = {
  title?: unknown;
  slug?: unknown;
  excerpt?: unknown;
  tags?: unknown;
  seoTitle?: unknown;
  seoDescription?: unknown;
  coverImage?: unknown;
  content?: unknown;
};

export type BlogArticleAudit = {
  score: number;
  wordCount: number;
  h2Count: number;
  h3Count: number;
  internalLinkCount: number;
  checks: BlogAuditCheck[];
};

export type BlogSiteAudit = {
  available: boolean;
  targetUrl: string;
  scores?: AuditScores;
  pagesCrawled?: number;
  issueCount?: number;
  recommendations?: Pick<
    AuditRecommendation,
    "priority" | "title" | "severity" | "whatToFix" | "howToFix" | "affectedUrls"
  >[];
  suggestedInternalLinks?: {
    title: string;
    url: string;
    reason: string;
  }[];
  message?: string;
};

export type BlogAuditResult = {
  generatedAt: string;
  article: BlogArticleAudit;
  site: BlogSiteAudit;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asTags(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((tag): tag is string => typeof tag === "string").map((tag) => tag.trim()).filter(Boolean)
    : [];
}

function articleWordCount(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/[#>*_~|]/g, " ");

  return text.split(/\s+/).filter(Boolean).length;
}

function internalMarkdownLinkCount(content: string, siteOrigin: string): number {
  const matches = content.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+[^)]*)?\)/g);
  let total = 0;

  for (const match of matches) {
    const href = match[1]?.trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;

    try {
      const target = new URL(href, siteOrigin);
      if (target.origin === siteOrigin) total += 1;
    } catch {
      // Ignore incomplete links while a draft is being edited.
    }
  }

  return total;
}

function createCheck(id: string, label: string, status: BlogAuditStatus, message: string): BlogAuditCheck {
  return { id, label, status, message };
}

function scoreChecks(checks: BlogAuditCheck[]): number {
  const deduction = checks.reduce((total, check) => {
    if (check.status === "error") return total + 18;
    if (check.status === "warning") return total + 7;
    return total;
  }, 0);

  return Math.max(0, 100 - deduction);
}

function getArticleAudit(input: BlogAuditDraft, siteOrigin: string): BlogArticleAudit {
  const title = asString(input.title);
  const excerpt = asString(input.excerpt);
  const seoTitle = asString(input.seoTitle);
  const seoDescription = asString(input.seoDescription);
  const coverImage = asString(input.coverImage);
  const content = asString(input.content);
  const tags = asTags(input.tags);
  const wordCount = articleWordCount(content);
  const h2Count = (content.match(/^##\s+.+$/gm) ?? []).length;
  const h3Count = (content.match(/^###\s+.+$/gm) ?? []).length;
  const internalLinkCount = internalMarkdownLinkCount(content, siteOrigin);
  const effectiveSeoTitle = seoTitle || title;
  const effectiveDescription = seoDescription || excerpt;

  const checks: BlogAuditCheck[] = [
    !title
      ? createCheck("title", "Article title", "error", "Add a clear article title before publishing.")
      : title.length >= 30 && title.length <= 70
        ? createCheck("title", "Article title", "pass", "The title is within a practical search-result length range.")
        : createCheck("title", "Article title", "warning", "Aim for a title between 30 and 70 characters when possible."),
    !effectiveSeoTitle
      ? createCheck("seo-title", "SEO title", "error", "Add an SEO title or keep a descriptive article title.")
      : effectiveSeoTitle.length >= 30 && effectiveSeoTitle.length <= 60
        ? createCheck("seo-title", "SEO title", "pass", "The SEO title is within the recommended range.")
        : createCheck("seo-title", "SEO title", "warning", "Aim for an SEO title between 30 and 60 characters."),
    !effectiveDescription
      ? createCheck("seo-description", "SEO description", "error", "Add an SEO description or a useful excerpt.")
      : effectiveDescription.length >= 120 && effectiveDescription.length <= 160
        ? createCheck("seo-description", "SEO description", "pass", "The description is within the recommended search-preview range.")
        : createCheck("seo-description", "SEO description", "warning", "Aim for a description between 120 and 160 characters."),
    wordCount >= 700
      ? createCheck("word-count", "Article depth", "pass", `${wordCount} words gives the article useful topical depth.`)
      : wordCount >= 350
        ? createCheck("word-count", "Article depth", "warning", `${wordCount} words is a useful start; expand the article with examples, answers, or evidence.`)
        : createCheck("word-count", "Article depth", "error", `${wordCount} words is too thin for a complete blog article. Add meaningful detail before publishing.`),
    h2Count >= 2
      ? createCheck("heading-structure", "Heading structure", "pass", `${h2Count} H2 sections make the article easier to scan.`)
      : h2Count === 1
        ? createCheck("heading-structure", "Heading structure", "warning", "Add at least one more H2 section to improve structure and answer intent more completely.")
        : createCheck("heading-structure", "Heading structure", "error", "Add H2 headings with ## to structure the article."),
    internalLinkCount >= 2
      ? createCheck("internal-links", "Internal links", "pass", `${internalLinkCount} internal Markdown links support content discovery.`)
      : internalLinkCount === 1
        ? createCheck("internal-links", "Internal links", "warning", "Add one more relevant internal link to connect this article with the site.")
        : createCheck("internal-links", "Internal links", "warning", "Add two relevant internal links. The crawler below will suggest candidate pages."),
    tags.length >= 2
      ? createCheck("tags", "Tags", "pass", `${tags.length} tags help organize related content.`)
      : createCheck("tags", "Tags", "warning", "Use at least two specific tags to improve editorial organization."),
    coverImage
      ? createCheck("cover-image", "Cover image", "pass", "A cover image is configured for the article.")
      : createCheck("cover-image", "Cover image", "warning", "Add an optimized cover image for stronger social and blog-card presentation."),
  ];

  return {
    score: scoreChecks(checks),
    wordCount,
    h2Count,
    h3Count,
    internalLinkCount,
    checks,
  };
}

function keywordCandidates(input: BlogAuditDraft): string[] {
  const words = `${asString(input.title)} ${asTags(input.tags).join(" ")}`
    .toLowerCase()
    .match(/[a-z0-9]{4,}/g) ?? [];

  return [...new Set(words)].filter((word) => !["with", "from", "that", "this", "your", "into", "shopify"].includes(word));
}

function relatedPages(pages: CrawlPage[], input: BlogAuditDraft, expectedUrl: string): BlogSiteAudit["suggestedInternalLinks"] {
  const keywords = keywordCandidates(input);
  if (!keywords.length) return [];

  return pages
    .filter((page) => page.statusCode >= 200 && page.statusCode < 300 && page.url !== expectedUrl)
    .map((page) => {
      const haystack = `${page.title} ${page.description}`.toLowerCase();
      const matches = keywords.filter((keyword) => haystack.includes(keyword));
      return { page, matches };
    })
    .filter(({ matches }) => matches.length > 0)
    .sort((left, right) => right.matches.length - left.matches.length || left.page.url.localeCompare(right.page.url))
    .slice(0, 4)
    .map(({ page, matches }) => ({
      title: page.title || page.url,
      url: page.url,
      reason: `Matches: ${matches.slice(0, 3).join(", ")}`,
    }));
}

export async function runBlogAudit(input: BlogAuditDraft): Promise<BlogAuditResult> {
  const siteOrigin = new URL(siteConfig.url).origin;
  const article = getArticleAudit(input, siteOrigin);

  try {
    const report = await auditWebsite(siteOrigin, {
      maxPages: 4,
      concurrency: 2,
      timeoutMs: 3_500,
      retries: 0,
      respectRobotsTxt: true,
      userAgent: "HyperBlogAudit/1.0 (+https://niagarat.com)",
      maxAffectedUrls: 3,
    });

    return {
      generatedAt: new Date().toISOString(),
      article,
      site: {
        available: true,
        targetUrl: report.auditedUrl,
        scores: report.scores,
        pagesCrawled: report.summary.totalPagesCrawled,
        issueCount: report.summary.totalIssues,
        recommendations: report.summary.topPriorities.map((recommendation) => ({
          priority: recommendation.priority,
          title: recommendation.title,
          severity: recommendation.severity,
          whatToFix: recommendation.whatToFix,
          howToFix: recommendation.howToFix,
          affectedUrls: recommendation.affectedUrls,
        })),
        suggestedInternalLinks: relatedPages(report.pages, input, `${siteOrigin}/blog/${asString(input.slug)}`),
      },
    };
  } catch {
    return {
      generatedAt: new Date().toISOString(),
      article,
      site: {
        available: false,
        targetUrl: siteOrigin,
        message: "The live-site crawl could not complete. You can still use the article checks and try the site audit again shortly.",
      },
    };
  }
}
