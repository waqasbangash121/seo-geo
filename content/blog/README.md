# Writing a Hyper blog post

Every published blog post is a local `.mdx` file. This keeps content in Git, makes Vercel deployment automatic, and removes the need for a database or CMS server.

## 1. Create the article file

Duplicate the first article and rename it with a lowercase, hyphenated slug:

```text
content/blog/your-article-slug.mdx
```

At the top of the new file, update the metadata export:

```mdx
export const metadata = {
  title: "Your article title",
  slug: "your-article-slug",
  excerpt: "A concise 1–2 sentence summary used on the blog index and in search metadata.",
  publishedAt: "2026-06-29",
  updatedAt: "2026-06-29",
  author: "Hyper Team",
  category: "AI Commerce",
  tags: ["Shopify", "AI Commerce"],
  seoTitle: "Your SEO title",
  seoDescription: "Your 150–160 character search description.",
  readingTime: 5,
  draft: true,
};

## Your first heading

Write the article here using normal Markdown and optional React components.
```

The `slug` must exactly match the filename. Keep `draft: true` until the article is ready to publish.

## 2. Register the article

Open `content/blog/posts.ts`.

First, add this import directly below the existing MDX import. Replace `your-article-slug` with your actual filename:

```ts
import YourArticle, * as yourArticleModule from "./your-article-slug.mdx";
```

Then add this metadata constant above `blogPostEntries`:

```ts
const yourArticleMetadata = (
  yourArticleModule as unknown as { metadata: BlogPostMetadata }
).metadata;
```

Finally, add the post object inside the `blogPostEntries` array. Put the newest post first:

```ts
export const blogPostEntries: BlogPostEntry[] = [
  {
    ...yourArticleMetadata,
    Content: YourArticle,
  },
  // Keep existing posts below this line.
];
```

## 3. Publish

When your article is ready, change `draft` to `false`. Then check the site locally:

```bash
pnpm typecheck
pnpm build
pnpm dev
```

Open:

```text
http://localhost:3000/blog/your-article-slug
```

Then commit and push:

```bash
git add content/blog
git commit -m "Add your article title"
git push
```

Vercel will deploy the article at `/blog/your-article-slug`, add it to the sitemap, and render its canonical URL, social metadata, and Article JSON-LD automatically.
