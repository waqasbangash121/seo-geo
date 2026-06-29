import "server-only";

import type { BlogPostInput } from "@/lib/blog-admin-types";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export class BlogInputError extends Error {}

function requiredString(value: unknown, label: string, maxLength: number): string {
  if (typeof value !== "string") {
    throw new BlogInputError(`${label} is required.`);
  }

  const result = value.trim();

  if (!result) {
    throw new BlogInputError(`${label} is required.`);
  }

  if (result.length > maxLength) {
    throw new BlogInputError(`${label} must be ${maxLength} characters or fewer.`);
  }

  return result;
}

function optionalString(value: unknown, label: string, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  const result = value.trim();

  if (result.length > maxLength) {
    throw new BlogInputError(`${label} must be ${maxLength} characters or fewer.`);
  }

  return result;
}

function validDate(value: string, label: string): string {
  if (!datePattern.test(value) || Number.isNaN(new Date(`${value}T12:00:00.000Z`).getTime())) {
    throw new BlogInputError(`${label} must use YYYY-MM-DD.`);
  }

  return value;
}

function normalizeTags(value: unknown): string[] {
  const tags = Array.isArray(value) ? value : [];

  if (tags.length > 10) {
    throw new BlogInputError("Use a maximum of 10 tags.");
  }

  return [...new Set(tags.map((tag) => requiredString(tag, "Each tag", 40)))];
}

function normalizeImage(value: unknown): string {
  const image = optionalString(value, "Cover image", 500);

  if (!image) {
    return "";
  }

  if (image.startsWith("/") || image.startsWith("https://")) {
    return image;
  }

  throw new BlogInputError("Cover image must start with / or https://.");
}

export function parseBlogPostInput(value: unknown): BlogPostInput {
  if (!value || typeof value !== "object") {
    throw new BlogInputError("Invalid blog form data.");
  }

  const input = value as Record<string, unknown>;
  const slug = requiredString(input.slug, "Slug", 120).toLowerCase();

  if (!slugPattern.test(slug)) {
    throw new BlogInputError("Slug can use lowercase letters, numbers, and hyphens only.");
  }

  const readingTime = Number(input.readingTime);
  if (!Number.isInteger(readingTime) || readingTime < 1 || readingTime > 120) {
    throw new BlogInputError("Reading time must be a whole number between 1 and 120.");
  }

  const content = requiredString(input.content, "Article content", 120000);

  return {
    title: requiredString(input.title, "Title", 120),
    slug,
    excerpt: requiredString(input.excerpt, "Excerpt", 350),
    publishedAt: validDate(requiredString(input.publishedAt, "Publish date", 10), "Publish date"),
    updatedAt: optionalString(input.updatedAt, "Updated date", 10),
    author: requiredString(input.author, "Author", 120),
    category: requiredString(input.category, "Category", 80),
    tags: normalizeTags(input.tags),
    focusKeyword: optionalString(input.focusKeyword, "Focus keyword", 100),
    seoTitle: optionalString(input.seoTitle, "SEO title", 70),
    seoDescription: optionalString(input.seoDescription, "SEO description", 180),
    coverImage: normalizeImage(input.coverImage),
    readingTime,
    draft: Boolean(input.draft),
    content,
  };
}

export function serializeMdxPost(post: BlogPostInput): string {
  const metadata = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt || undefined,
    author: post.author,
    category: post.category,
    tags: post.tags,
    focusKeyword: post.focusKeyword || undefined,
    seoTitle: post.seoTitle || undefined,
    seoDescription: post.seoDescription || undefined,
    coverImage: post.coverImage || undefined,
    readingTime: post.readingTime,
    draft: post.draft,
  };

  return `export const metadata = ${JSON.stringify(metadata, null, 2)};\n\n${post.content.trim()}\n`;
}

export function parseMdxPost(source: string): BlogPostInput {
  const match = source.match(/^export const metadata = (\{[\s\S]*?\});\s*\n\n/);

  if (!match) {
    throw new BlogInputError("This article does not use the admin-compatible MDX metadata format.");
  }

  let metadata: Record<string, unknown>;

  try {
    metadata = JSON.parse(match[1]) as Record<string, unknown>;
  } catch {
    throw new BlogInputError("This article metadata is not valid JSON.");
  }

  return parseBlogPostInput({
    ...metadata,
    content: source.slice(match[0].length),
  });
}

function getIdentifier(slug: string): string {
  return `Post${slug
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join("")}`;
}

export function createBlogRegistry(posts: BlogPostInput[]): string {
  const orderedPosts = [...posts].sort(
    (left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );

  const imports = orderedPosts
    .map((post) => {
      const identifier = getIdentifier(post.slug);
      return `import ${identifier}, * as ${identifier}Module from "./${post.slug}.mdx";`;
    })
    .join("\n");

  const metadata = orderedPosts
    .map((post) => {
      const identifier = getIdentifier(post.slug);
      return `const ${identifier}Metadata = (${identifier}Module as unknown as { metadata: BlogPostMetadata }).metadata;`;
    })
    .join("\n");

  const entries = orderedPosts
    .map((post) => {
      const identifier = getIdentifier(post.slug);
      return `  { ...${identifier}Metadata, Content: ${identifier} },`;
    })
    .join("\n");

  return `import type { ComponentType } from "react";\n\n${imports}\n\nexport type BlogPostMetadata = {\n  title: string;\n  slug: string;\n  excerpt: string;\n  publishedAt: string;\n  updatedAt?: string;\n  author: string;\n  category: string;\n  tags: string[];\n  focusKeyword?: string;\n  seoTitle?: string;\n  seoDescription?: string;\n  coverImage?: string;\n  readingTime: number;\n  draft?: boolean;\n};\n\nexport type BlogPostEntry = BlogPostMetadata & {\n  Content: ComponentType;\n};\n\n${metadata}\n\nexport const blogPostEntries: BlogPostEntry[] = [\n${entries}\n];\n`;
}
