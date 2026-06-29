# One-time MDX editor migration

The first blog article was created before the web editor. It uses a handwritten JavaScript metadata object, while the editor writes JSON-compatible metadata so it can safely read and update fields.

Before using the web editor with the existing article, replace the metadata block at the top of:

```text
content/blog/how-ai-search-improves-shopify-product-discovery.mdx
```

with this form:

```mdx
export const metadata = {
  "title": "How AI Search Improves Shopify Product Discovery",
  "slug": "how-ai-search-improves-shopify-product-discovery",
  "excerpt": "Learn how AI-powered product search helps Shopify merchants reduce shopping friction, improve product discovery, and support conversion growth.",
  "publishedAt": "2026-06-29",
  "updatedAt": "2026-06-29",
  "author": "Hyper Team",
  "category": "AI Commerce",
  "tags": ["Shopify", "AI Search", "Product Discovery"],
  "seoTitle": "How AI Search Improves Shopify Product Discovery",
  "seoDescription": "Learn how AI-powered product search helps Shopify merchants improve product discovery, reduce friction, and support conversion growth.",
  "readingTime": 5,
  "draft": false
};
```

Keep the article body below that block unchanged. Commit and push this one-time change. Every article created or saved through `/admin` will already use the editor-compatible metadata format.
