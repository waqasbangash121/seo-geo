"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  Globe2,
  Hash,
  ImageIcon,
  Loader2,
  Save,
  Send,
  Tag,
  UserRound,
} from "lucide-react";

import { AdminStatusBadge } from "@/components/admin/admin-ui";
import {
  BlogAuditFeedback,
  BlogAuditPanel,
  BlogKeywordIdeas,
  type BlogAuditResult,
} from "@/components/blog-audit-panel";
import { ContentAiAssistant } from "@/components/content-ai-assistant";
import type { BlogPostInput } from "@/lib/blog-admin-types";

type BlogEditorFormProps = {
  initialPost?: BlogPostInput;
  originalSlug?: string;
};

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function slugFromTitle(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

const emptyPost: BlogPostInput = {
  title: "",
  slug: "",
  excerpt: "",
  publishedAt: today(),
  updatedAt: today(),
  author: "Hyper Team",
  category: "AI Commerce",
  tags: [],
  focusKeyword: "",
  seoTitle: "",
  seoDescription: "",
  coverImage: "",
  readingTime: 5,
  draft: true,
  content:
    "## Start writing your article\n\nWrite your article in Markdown. Use `##` for main sections, normal paragraphs, lists, and links.",
};

const fieldLabelClass = "grid gap-2 text-sm font-semibold";
const inputClass =
  "h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";
const textareaClass =
  "rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";
const sectionClass = "rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6";
const secondaryButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60";
const primaryButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60";

export function BlogEditorForm({ initialPost, originalSlug }: BlogEditorFormProps) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPostInput>(initialPost ?? emptyPost);
  const [tagsText, setTagsText] = useState((initialPost?.tags ?? []).join(", "));
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [auditResult, setAuditResult] = useState<BlogAuditResult | null>(null);

  const publicUrl = useMemo(() => `/blog/${post.slug || "your-article-slug"}`, [post.slug]);
  const auditArticle = useMemo<BlogPostInput>(
    () => ({
      ...post,
      focusKeyword: post.focusKeyword ?? "",
      tags: tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }),
    [post, tagsText],
  );
  const auditChecks = useMemo(
    () => new Map((auditResult?.article.checks ?? []).map((check) => [check.id, check])),
    [auditResult],
  );

  function feedbackFor(...ids: string[]) {
    return ids.flatMap((id) => {
      const check = auditChecks.get(id);
      return check ? [check] : [];
    });
  }

  function update<K extends keyof BlogPostInput>(key: K, value: BlogPostInput[K]) {
    setPost((current) => ({ ...current, [key]: value }));
  }

  function appendGeneratedContent(text: string) {
    update("content", `${post.content.trim()}\n\n${text.trim()}`.trim());
    setSuccess("AI suggestion added to the article draft. Review it before saving or publishing.");
  }

  async function save(mode: "draft" | "publish") {
    setSaving(mode);
    setError("");
    setSuccess("");

    const payload = {
      ...post,
      focusKeyword: post.focusKeyword ?? "",
      tags: tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      draft: mode === "draft",
      updatedAt: today(),
    };

    try {
      const response = await fetch(
        originalSlug ? `/api/admin/blogs/${encodeURIComponent(originalSlug)}` : "/api/admin/blogs",
        {
          method: originalSlug ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const result = (await response.json()) as {
        error?: string;
        slug?: string;
        commitUrl?: string;
      };

      if (!response.ok || !result.slug) {
        throw new Error(result.error || "The article could not be saved.");
      }

      setPost((current) => ({ ...current, ...payload }));
      setSuccess(
        mode === "publish"
          ? "Published to Neon. The public article is available now."
          : "Draft saved to Neon. It remains hidden from the public blog.",
      );

      if (result.slug !== originalSlug) {
        router.push(`/admin/blogs/${result.slug}`);
      }

      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "The article could not be saved.");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <Link
              href="/admin/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Articles
            </Link>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Article editor
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {originalSlug ? "Edit article" : "Create article"}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Shape the brief, draft in Markdown, review on-page quality, and publish directly to
              Neon.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[32rem]">
            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                State
              </p>
              <div className="mt-2">
                <AdminStatusBadge draft={post.draft} />
              </div>
            </div>
            <div className="rounded-md border border-border bg-background p-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Clock3 aria-hidden="true" className="size-3.5" />
                Reading
              </p>
              <p className="mt-2 text-sm font-semibold">{post.readingTime || 0} min</p>
            </div>
            <div className="rounded-md border border-border bg-background p-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Globe2 aria-hidden="true" className="size-3.5" />
                URL
              </p>
              <p className="mt-2 truncate text-sm font-semibold">{publicUrl}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <section className={sectionClass}>
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                <FileText aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Core brief
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">Article details</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Start with the title, keyword, URL, and summary. These fields drive the review
                  feedback and public preview.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5">
              <label className={fieldLabelClass}>
                Article title
                <input
                  value={post.title}
                  onChange={(event) => update("title", event.target.value)}
                  className={`${inputClass} text-base`}
                  maxLength={120}
                  placeholder="How AI Search Improves Shopify Product Discovery"
                />
              </label>
              <BlogAuditFeedback checks={feedbackFor("title-keyword")} />

              <label className={fieldLabelClass}>
                Focus keyword
                <input
                  value={post.focusKeyword ?? ""}
                  onChange={(event) => update("focusKeyword", event.target.value)}
                  className={inputClass}
                  maxLength={100}
                  placeholder="Shopify conversion rate optimization"
                />
                <span className="text-xs font-normal leading-5 text-muted-foreground">
                  Choose one specific phrase this article should target. It powers the content
                  review.
                </span>
              </label>
              <BlogAuditFeedback checks={feedbackFor("focus-keyword")} />
              <BlogKeywordIdeas
                title="Related keyword angles"
                description="Use only the ideas that genuinely fit the article. They are writing prompts, not phrases to repeat mechanically."
                ideas={auditResult?.keywordIdeas.secondary ?? []}
              />

              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <label className={fieldLabelClass}>
                  URL slug
                  <input
                    value={post.slug}
                    onChange={(event) => update("slug", slugFromTitle(event.target.value))}
                    className={inputClass}
                    placeholder="how-ai-search-improves-shopify-product-discovery"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => update("slug", slugFromTitle(post.title))}
                  className={secondaryButtonClass}
                >
                  <Hash aria-hidden="true" className="size-4" />
                  Generate slug
                </button>
              </div>
              <BlogAuditFeedback checks={feedbackFor("slug-keyword")} />

              <div className="flex min-w-0 items-center gap-2 rounded-md border border-border bg-background px-3 py-2.5 text-sm text-muted-foreground">
                <Globe2 aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">Public URL: {publicUrl}</span>
              </div>

              <label className={fieldLabelClass}>
                Excerpt
                <textarea
                  value={post.excerpt}
                  onChange={(event) => update("excerpt", event.target.value)}
                  className={`${textareaClass} min-h-28`}
                  maxLength={350}
                  placeholder="A concise summary shown on blog cards and used as the default description."
                />
                <span className="text-xs font-normal text-muted-foreground">
                  {post.excerpt.length}/350 characters
                </span>
              </label>
              <BlogAuditFeedback checks={feedbackFor("excerpt-keyword")} />
            </div>
          </section>

          <section className={sectionClass}>
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                <CalendarDays aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Publishing details
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  Ownership and taxonomy
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className={fieldLabelClass}>
                <span className="inline-flex items-center gap-2">
                  <UserRound aria-hidden="true" className="size-4" /> Author
                </span>
                <input
                  value={post.author}
                  onChange={(event) => update("author", event.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={fieldLabelClass}>
                <span className="inline-flex items-center gap-2">
                  <Tag aria-hidden="true" className="size-4" /> Category
                </span>
                <input
                  value={post.category}
                  onChange={(event) => update("category", event.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={fieldLabelClass}>
                Publish date
                <input
                  type="date"
                  value={post.publishedAt}
                  onChange={(event) => update("publishedAt", event.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={fieldLabelClass}>
                Reading time (minutes)
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={post.readingTime}
                  onChange={(event) => update("readingTime", Number(event.target.value))}
                  className={inputClass}
                />
              </label>
            </div>

            <div className="mt-5 grid gap-5">
              <label className={fieldLabelClass}>
                Tags
                <input
                  value={tagsText}
                  onChange={(event) => setTagsText(event.target.value)}
                  className={inputClass}
                  placeholder="Shopify, AI Search, Product Discovery"
                />
                <span className="text-xs font-normal text-muted-foreground">
                  Separate tags with commas. Maximum 10 tags.
                </span>
              </label>
              <BlogAuditFeedback checks={feedbackFor("tag-keywords")} />

              <label className={fieldLabelClass}>
                <span className="inline-flex items-center gap-2">
                  <ImageIcon aria-hidden="true" className="size-4" /> Cover image path or URL
                </span>
                <input
                  value={post.coverImage}
                  onChange={(event) => update("coverImage", event.target.value)}
                  className={inputClass}
                  placeholder="/images/blog/ai-search.jpg or https://..."
                />
              </label>
            </div>
          </section>

          <section className={sectionClass}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Markdown draft
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">Article content</h2>
              </div>
              <span className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                H2 sections recommended
              </span>
            </div>

            <label className={`${fieldLabelClass} mt-6`}>
              Article content
              <textarea
                value={post.content}
                onChange={(event) => update("content", event.target.value)}
                className={`${textareaClass} min-h-[34rem] font-mono leading-7`}
                spellCheck={false}
              />
            </label>
            <div className="mt-4">
              <BlogAuditFeedback
                checks={feedbackFor(
                  "content-depth",
                  "content-keyword",
                  "intro-keyword",
                  "heading-coverage",
                  "question-coverage",
                )}
              />
            </div>
            <div className="mt-4">
              <BlogKeywordIdeas
                title="Questions to answer in the article"
                description="Turn the most relevant questions into H2 sections, then answer each directly in the first paragraph below it."
                ideas={auditResult?.keywordIdeas.questions ?? []}
              />
            </div>
          </section>

          <section className={sectionClass}>
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                <Globe2 aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Search and social
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">SEO preview</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  These fields control the document title, meta description, social preview, and
                  Article schema.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5">
              <label className={fieldLabelClass}>
                SEO title
                <input
                  value={post.seoTitle}
                  onChange={(event) => update("seoTitle", event.target.value)}
                  maxLength={70}
                  className={inputClass}
                  placeholder={post.title || "SEO title"}
                />
                <span className="text-xs font-normal text-muted-foreground">
                  {post.seoTitle.length}/70 characters
                </span>
              </label>
              <BlogAuditFeedback checks={feedbackFor("seo-title-keyword")} />

              <label className={fieldLabelClass}>
                SEO description
                <textarea
                  value={post.seoDescription}
                  onChange={(event) => update("seoDescription", event.target.value)}
                  maxLength={180}
                  className={`${textareaClass} min-h-28`}
                  placeholder={post.excerpt || "SEO description"}
                />
                <span className="text-xs font-normal text-muted-foreground">
                  {post.seoDescription.length}/180 characters
                </span>
              </label>
              <BlogAuditFeedback checks={feedbackFor("seo-description-keyword")} />

              <div className="rounded-md border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Search preview
                </p>
                <p className="mt-3 truncate text-lg font-semibold text-primary">
                  {post.seoTitle || post.title || "Article title"}
                </p>
                <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
                  www.niagarat.com{publicUrl}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {post.seoDescription || post.excerpt || "Your description will appear here."}
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit space-y-4 xl:sticky xl:top-24">
          <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                <Send aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold">Publishing</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Saving writes directly to Neon and refreshes the public article route immediately.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={() => save("draft")}
                disabled={saving !== null}
                className={secondaryButtonClass}
              >
                {saving === "draft" ? (
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                ) : (
                  <Save aria-hidden="true" className="size-4" />
                )}
                {saving === "draft" ? "Saving draft..." : "Save draft"}
              </button>
              <button
                type="button"
                onClick={() => save("publish")}
                disabled={saving !== null}
                className={primaryButtonClass}
              >
                {saving === "publish" ? (
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                ) : (
                  <Send aria-hidden="true" className="size-4" />
                )}
                {saving === "publish" ? "Publishing..." : "Publish article"}
              </button>
            </div>
          </div>

          <ContentAiAssistant
            module="blog"
            title={post.title}
            focusKeyword={post.focusKeyword}
            existingContent={post.content}
            onAppendToContent={appendGeneratedContent}
          />

          <BlogAuditPanel article={auditArticle} result={auditResult} onResult={setAuditResult} />

          {error ? (
            <p className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-950 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-50">
              {error}
            </p>
          ) : null}
          {success ? (
            <p className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">
              {success}
            </p>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
