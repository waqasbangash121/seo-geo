import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

import type { BlogPost } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[10px] border border-border bg-surface p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_-28px_hsl(var(--shadow)/0.65)] sm:p-8">
      <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-primary">{post.category}</span>
        <span aria-hidden="true">•</span>
        <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
      </div>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors hover:text-primary focus-visible:rounded-sm"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-4 leading-7 text-muted-foreground">{post.excerpt}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-5 text-sm">
        <span className="inline-flex items-center gap-2 text-muted-foreground">
          <Clock3 aria-hidden="true" className="size-4" />
          {post.readingTime} min read
        </span>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary focus-visible:rounded-sm"
        >
          Read article
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
