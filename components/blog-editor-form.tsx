"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  BlogAuditFeedback,
  BlogAuditPanel,
  BlogKeywordIdeas,
  type BlogAuditResult,
} from "@/components/blog-audit-panel";
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
  content: "## Start writing your article\n\nWrite your article in Markdown. Use `##` for main sections, normal paragraphs, lists, and links.",
};

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
      const result = (await response.json()) as { error?: string; slug?: string; commitUrl?: string };

      if (!response.ok || !result.slug) {
        throw new Error(result.error || "The article could not be saved.");
      }

      setPost((current) => ({ ...current, ...payload }));
      setSuccess(
        mode === "publish"
          ? "Published to GitHub. Vercel will deploy the new article automatically."
          : "Draft saved to GitHub. It will remain hidden from the public blog.",
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
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-8">
        <section className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {originalSlug ? "Edit article" : "Create article"}
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Write in Markdown. The public article, metadata, structured data, and sitemap update from this form.
              </p>
            </div>
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              {post.draft ? "Draft" : "Published"}
            </span>
          </div>

          <div className="mt-8 grid gap-5">
            <label className="grid gap-2 text-sm font-medium">
              Article title
              <input
                value={post.title}
                onChange={(event) => update("title", event.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-base outline-none ring-ring transition focus:ring-2"
                maxLength={120}
                placeholder="How AI Search Improves Shopify Product Discovery"
              />
            </label>
            <BlogAuditFeedback checks={feedbackFor("title-keyword")} />

            <label className="grid gap-2 text-sm font-medium">
              Focus keyword
              <input
                value={post.focusKeyword ?? ""}
                onChange={(event) => update("focusKeyword", event.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                maxLength={100}
                placeholder="Shopify conversion rate optimization"
              />
              <span className="text-xs font-normal text-muted-foreground">
                Choose one specific phrase this article should target. It is saved with the article and powers the content review.
              </span>
            </label>
            <BlogAuditFeedback checks={feedbackFor("focus-keyword")} />
            <BlogKeywordIdeas
              title="Related keyword angles"
              description="Use only the ideas that genuinely fit the article. They are writing prompts, not phrases to repeat mechanically."
              ideas={auditResult?.keywordIdeas.secondary ?? []}
            />

            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <label className="grid gap-2 text-sm font-medium">
                URL slug
                <input
                  value={post.slug}
                  onChange={(event) => update("slug", slugFromTitle(event.target.value))}
                  className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                  placeholder="how-ai-search-improves-shopify-product-discovery"
                />
              </label>
              <button
                type="button"
                onClick={() => update("slug", slugFromTitle(post.title))}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Generate slug
              </button>
            </div>
            <BlogAuditFeedback checks={feedbackFor("slug-keyword")} />

            <p className="-mt-2 text-xs text-muted-foreground">Public URL: {publicUrl}</p>

            <label className="grid gap-2 text-sm font-medium">
              Excerpt
              <textarea
                value={post.excerpt}
                onChange={(event) => update("excerpt", event.target.value)}
                className="min-h-24 rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                maxLength={350}
                placeholder="A concise summary shown on blog cards and used as the default description."
              />
              <span className="text-xs font-normal text-muted-foreground">{post.excerpt.length}/350 characters</span>
            </label>
            <BlogAuditFeedback checks={feedbackFor("excerpt-keyword")} />

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Author
                <input value={post.author} onChange={(event) => update("author", event.target.value)} className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Category
                <input value={post.category} onChange={(event) => update("category", event.target.value)} className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Publish date
                <input type="date" value={post.publishedAt} onChange={(event) => update("publishedAt", event.target.value)} className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Reading time (minutes)
                <input type="number" min="1" max="120" value={post.readingTime} onChange={(event) => update("readingTime", Number(event.target.value))} className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2" />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium">
              Tags
              <input
                value={tagsText}
                onChange={(event) => setTagsText(event.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                placeholder="Shopify, AI Search, Product Discovery"
              />
              <span className="text-xs font-normal text-muted-foreground">Separate tags with commas. Maximum 10 tags.</span>
            </label>
            <BlogAuditFeedback checks={feedbackFor("tag-keywords")} />

            <label className="grid gap-2 text-sm font-medium">
              Cover image path or URL
              <input
                value={post.coverImage}
                onChange={(event) => update("coverImage", event.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                placeholder="/images/blog/ai-search.jpg or https://..."
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Article content
              <textarea
                value={post.content}
                onChange={(event) => update("content", event.target.value)}
                className="min-h-[32rem] rounded-lg border border-border bg-background px-3 py-3 font-mono text-sm leading-7 outline-none ring-ring transition focus:ring-2"
                spellCheck={false}
              />
            </label>
            <BlogAuditFeedback checks={feedbackFor("content-depth", "content-keyword", "intro-keyword", "heading-coverage", "question-coverage")} />
            <BlogKeywordIdeas
              title="Questions to answer in the article"
              description="Turn the most relevant questions into H2 sections, then answer each directly in the first paragraph below it."
              ideas={auditResult?.keywordIdeas.questions ?? []}
            />
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">SEO and social preview</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            These fields control the document title, meta description, social preview, and Article schema.
          </p>

          <div className="mt-6 grid gap-5">
            <label className="grid gap-2 text-sm font-medium">
              SEO title
              <input
                value={post.seoTitle}
                onChange={(event) => update("seoTitle", event.target.value)}
                maxLength={70}
                className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                placeholder={post.title || "SEO title"}
              />
              <span className="text-xs font-normal text-muted-foreground">{post.seoTitle.length}/70 characters</span>
            </label>
            <BlogAuditFeedback checks={feedbackFor("seo-title-keyword")} />

            <label className="grid gap-2 text-sm font-medium">
              SEO description
              <textarea
                value={post.seoDescription}
                onChange={(event) => update("seoDescription", event.target.value)}
                maxLength={180}
                className="min-h-28 rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                placeholder={post.excerpt || "SEO description"}
              />
              <span className="text-xs font-normal text-muted-foreground">{post.seoDescription.length}/180 characters</span>
            </label>
            <BlogAuditFeedback checks={feedbackFor("seo-description-keyword")} />

            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Search preview</p>
              <p className="mt-3 truncate text-lg font-medium text-primary">{post.seoTitle || post.title || "Article title"}</p>
              <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">www.niagarat.com{publicUrl}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{post.seoDescription || post.excerpt || "Your description will appear here."}</p>
            </div>
          </div>
        </section>
      </div>

      <aside className="h-fit space-y-4 lg:sticky lg:top-6">
        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="font-semibold">Publishing</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Saving creates a GitHub commit. Vercel deploys the changed content automatically.
          </p>
          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={() => save("draft")}
              disabled={saving !== null}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving === "draft" ? "Saving draft…" : "Save draft"}
            </button>
            <button
              type="button"
              onClick={() => save("publish")}
              disabled={saving !== null}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving === "publish" ? "Publishing…" : "Publish article"}
            </button>
          </div>
        </div>

        <BlogAuditPanel article={auditArticle} result={auditResult} onResult={setAuditResult} />

        {error ? <p className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">{error}</p> : null}
        {success ? <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-800 dark:text-emerald-200">{success}</p> : null}
      </aside>
    </div>
  );
}
