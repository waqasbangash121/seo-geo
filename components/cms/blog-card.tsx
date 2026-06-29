import Link from "next/link";

import { toCmsMediaUrl } from "@/lib/cms/strapi-client";
import type { BlogPost } from "@/lib/cms/types";

type BlogCardProps = {
  post: BlogPost;
};

function formatPublishedDate(value?: string | null) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? null
    : new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
}

export function BlogCard({ post }: BlogCardProps) {
  const coverImage = toCmsMediaUrl(post.coverImage?.url);
  const publishedDate = formatPublishedDate(post.publishedAt);

  return (
    <article className="overflow-hidden rounded-[10px] border border-border bg-surface">
      {coverImage ? (
        // Strapi hosts editor-managed media on a runtime-configured domain.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={post.coverImage?.alternativeText || post.title}
          className="aspect-[16/9] w-full border-b border-border object-cover"
          height={post.coverImage?.height ?? undefined}
          loading="lazy"
          src={coverImage}
          width={post.coverImage?.width ?? undefined}
        />
      ) : null}

      <div className="p-6">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
          {post.category ? <span>{post.category}</span> : null}
          {post.category && publishedDate ? <span aria-hidden="true">•</span> : null}
          {publishedDate ? <time dateTime={post.publishedAt ?? undefined}>{publishedDate}</time> : null}
        </div>

        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
          <Link className="transition-colors hover:text-primary" href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {post.excerpt ? <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p> : null}

        <Link
          className="mt-5 inline-flex text-sm font-medium text-primary underline underline-offset-4"
          href={`/blog/${post.slug}`}
        >
          Read article
        </Link>
      </div>
    </article>
  );
}
