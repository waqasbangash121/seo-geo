import { config } from "dotenv";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { randomUUID } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

import { contentItems, workspaces, workspaceSettings } from "../db/schema";

config({ path: ".env.local" });
config();

type ContentType = "blog" | "comparison" | "resource";

type LegacyMetadata = {
  title?: unknown;
  slug?: unknown;
  excerpt?: unknown;
  publishedAt?: unknown;
  updatedAt?: unknown;
  author?: unknown;
  category?: unknown;
  tags?: unknown;
  focusKeyword?: unknown;
  seoTitle?: unknown;
  seoDescription?: unknown;
  coverImage?: unknown;
  readingTime?: unknown;
  draft?: unknown;
  competitorName?: unknown;
  decisionSummary?: unknown;
  resourceType?: unknown;
  audience?: unknown;
};

type ParsedMdxContent = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
  focusKeyword: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  coverImage: string | null;
  readingTime: number;
  draft: boolean;
  content: string;
  details: Record<string, string>;
};

const workspace = {
  id: "hyper-default",
  name: "Hyper Content Studio",
} as const;

function databaseUrl(): string {
  const value = process.env.DATABASE_URL?.trim();

  if (!value) {
    throw new Error("DATABASE_URL is missing. Add it to .env.local first.");
  }

  return value;
}

const db = drizzle(databaseUrl());

function requiredString(value: unknown, label: string, maxLength: number): string {
  if (typeof value !== "string") {
    throw new Error(`${label} is required.`);
  }

  const result = value.trim();

  if (!result) {
    throw new Error(`${label} is required.`);
  }

  if (result.length > maxLength) {
    throw new Error(`${label} must be ${maxLength} characters or fewer.`);
  }

  return result;
}

function optionalString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const result = value.trim();

  if (!result) {
    return null;
  }

  if (result.length > maxLength) {
    throw new Error(`Value must be ${maxLength} characters or fewer.`);
  }

  return result;
}

function validDate(value: unknown, label: string): string {
  const result = requiredString(value, label, 10);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(result)) {
    throw new Error(`${label} must use YYYY-MM-DD.`);
  }

  const parsed = new Date(`${result}T12:00:00.000Z`);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${label} is not valid.`);
  }

  return result;
}

function dateAtNoon(value: string): Date {
  return new Date(`${value}T12:00:00.000Z`);
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const tags = value
    .filter((tag): tag is string => typeof tag === "string")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 10);

  return [...new Set(tags)];
}

function normalizeReadingTime(value: unknown): number {
  const readingTime = Number(value);

  if (!Number.isInteger(readingTime) || readingTime < 1 || readingTime > 120) {
    return 1;
  }

  return readingTime;
}

function parseMdx(source: string, type: ContentType): ParsedMdxContent {
  const match = source.match(/^export const metadata = (\{[\s\S]*?\});\s*\n\n/);

  if (!match) {
    throw new Error("The file does not use the expected Content Studio MDX metadata format.");
  }

  let metadata: LegacyMetadata;

  try {
    metadata = JSON.parse(match[1]) as LegacyMetadata;
  } catch {
    throw new Error("The MDX metadata could not be parsed as JSON.");
  }

  const publishedAt = validDate(metadata.publishedAt, "Publish date");
  const updatedAt =
    typeof metadata.updatedAt === "string" && metadata.updatedAt.trim()
      ? validDate(metadata.updatedAt, "Updated date")
      : publishedAt;

  const details: Record<string, string> = {};

  if (type === "comparison") {
    details.competitorName = requiredString(metadata.competitorName, "Competitor name", 120);
    details.decisionSummary = requiredString(metadata.decisionSummary, "Decision summary", 300);
  }

  if (type === "resource") {
    details.resourceType = optionalString(metadata.resourceType, 80) ?? "Guide";

    details.audience = requiredString(metadata.audience, "Audience", 160);
  }

  return {
    title: requiredString(metadata.title, "Title", 120),
    slug: requiredString(metadata.slug, "Slug", 120).toLowerCase(),
    excerpt: requiredString(metadata.excerpt, "Excerpt", 350),
    publishedAt,
    updatedAt,
    author: requiredString(metadata.author, "Author", 120),
    category: requiredString(metadata.category, "Category", 80),
    tags: normalizeTags(metadata.tags),
    focusKeyword: optionalString(metadata.focusKeyword, 100),
    seoTitle: optionalString(metadata.seoTitle, 70),
    seoDescription: optionalString(metadata.seoDescription, 180),
    coverImage: optionalString(metadata.coverImage, 500),
    readingTime: normalizeReadingTime(metadata.readingTime),
    draft: metadata.draft === true,
    content: source.slice(match[0].length).trim(),
    details,
  };
}

async function findMdxFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        return findMdxFiles(fullPath);
      }

      if (entry.isFile() && entry.name.endsWith(".mdx")) {
        return [fullPath];
      }

      return [];
    }),
  );

  return files.flat();
}

async function ensureWorkspace() {
  await db.insert(workspaces).values(workspace).onConflictDoNothing({
    target: workspaces.id,
  });

  await db
    .insert(workspaceSettings)
    .values({
      workspaceId: workspace.id,
    })
    .onConflictDoNothing({
      target: workspaceSettings.workspaceId,
    });
}

async function importFile(
  filePath: string,
  type: ContentType,
): Promise<{ slug: string; status: "draft" | "published" }> {
  const source = await readFile(filePath, "utf8");
  const item = parseMdx(source, type);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) {
    throw new Error(`Invalid slug: ${item.slug}`);
  }

  const status: "draft" | "published" = item.draft ? "draft" : "published";

  const publishedAt = dateAtNoon(item.publishedAt);
  const updatedAt = dateAtNoon(item.updatedAt);

  const values = {
    workspaceId: workspace.id,
    type,
    status,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    bodyMarkdown: item.content,
    authorName: item.author,
    category: item.category,
    tags: item.tags,
    focusKeyword: item.focusKeyword,
    seoTitle: item.seoTitle,
    seoDescription: item.seoDescription,
    coverImageUrl: item.coverImage,
    readingTime: item.readingTime,
    details: item.details,
    publishedAt,
    updatedAt,
  };

  await db
    .insert(contentItems)
    .values({
      id: randomUUID(),
      ...values,
      createdAt: publishedAt,
    })
    .onConflictDoUpdate({
      target: [contentItems.workspaceId, contentItems.type, contentItems.slug],
      set: values,
    });

  return {
    slug: item.slug,
    status,
  };
}

async function countImportedContent(type: ContentType): Promise<number> {
  const rows = await db
    .select({
      id: contentItems.id,
    })
    .from(contentItems)
    .where(and(eq(contentItems.workspaceId, workspace.id), eq(contentItems.type, type)));

  return rows.length;
}

async function main() {
  await ensureWorkspace();

  const projectRoot = process.cwd();

  const sources: Array<{
    type: ContentType;
    directory: string;
  }> = [
    {
      type: "blog",
      directory: join(projectRoot, "content/blog"),
    },
    {
      type: "comparison",
      directory: join(projectRoot, "content/comparisons"),
    },
    {
      type: "resource",
      directory: join(projectRoot, "content/resources"),
    },
  ];

  const imported = {
    blog: 0,
    comparison: 0,
    resource: 0,
  };

  for (const source of sources) {
    const files = await findMdxFiles(source.directory);

    for (const filePath of files) {
      const result = await importFile(filePath, source.type);

      imported[source.type] += 1;

      console.log(
        `[${source.type}] ${result.status.padEnd(9)} ${result.slug} (${relative(
          projectRoot,
          filePath,
        )})`,
      );
    }
  }

  console.log("\nImport complete.");
  console.log(`Imported this run:`);
  console.log(`- Blogs: ${imported.blog}`);
  console.log(`- Comparisons: ${imported.comparison}`);
  console.log(`- Resources: ${imported.resource}`);

  console.log("\nCurrent Neon totals:");
  console.log(`- Blogs: ${await countImportedContent("blog")}`);
  console.log(`- Comparisons: ${await countImportedContent("comparison")}`);
  console.log(`- Resources: ${await countImportedContent("resource")}`);
}

main().catch((error) => {
  console.error("\nContent import failed:\n");
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
