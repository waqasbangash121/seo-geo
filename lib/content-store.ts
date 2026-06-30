import "server-only";

import { randomUUID } from "node:crypto";
import { and, desc, eq, lte, ne } from "drizzle-orm";

import { getDb } from "@/db";
import {
  contentItems,
  contentRevisions,
  workspaces,
  workspaceSettings,
  type ContentItem,
  type ContentType,
} from "@/db/schema";
import type { BlogPostInput } from "@/lib/blog-admin-types";
import type { ManagedContentInput, ManagedContentType } from "@/lib/content-admin-types";

export const CONTENT_WORKSPACE_ID = "hyper-default";

type PublicContentType = ContentType;
type StoredContentInput = BlogPostInput | ManagedContentInput;

export class ContentStoreError extends Error {}

export type SavedContentItem = {
  id: string;
  type: PublicContentType;
  slug: string;
  title: string;
  draft: boolean;
};

function dateAtNoon(value: string): Date {
  return new Date(`${value}T12:00:00.000Z`);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

function detailString(details: Record<string, unknown>, key: string): string {
  const value = details[key];
  return typeof value === "string" ? value : "";
}

function isManagedType(type: PublicContentType): type is ManagedContentType {
  return type === "comparison" || type === "resource";
}

function toBaseInput(item: ContentItem): Omit<BlogPostInput, "draft" | "content"> {
  return {
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    publishedAt: formatDate(item.publishedAt ?? item.createdAt),
    updatedAt: formatDate(item.updatedAt),
    author: item.authorName,
    category: item.category,
    tags: item.tags,
    focusKeyword: item.focusKeyword ?? "",
    seoTitle: item.seoTitle ?? "",
    seoDescription: item.seoDescription ?? "",
    coverImage: item.coverImageUrl ?? "",
    readingTime: item.readingTime,
  };
}

function toBlogPost(item: ContentItem): BlogPostInput {
  return {
    ...toBaseInput(item),
    draft: item.status !== "published",
    content: item.bodyMarkdown,
  };
}

function toManagedContent(item: ContentItem, type: ManagedContentType): ManagedContentInput {
  const common = {
    ...toBaseInput(item),
    type,
    draft: item.status !== "published",
    content: item.bodyMarkdown,
  };

  if (type === "comparison") {
    return {
      ...common,
      type: "comparison",
      competitorName: detailString(item.details, "competitorName"),
      decisionSummary: detailString(item.details, "decisionSummary"),
    };
  }

  return {
    ...common,
    type: "resource",
    resourceType: detailString(item.details, "resourceType") as ManagedContentInput["resourceType"],
    audience: detailString(item.details, "audience"),
  } as ManagedContentInput;
}

async function ensureWorkspace(): Promise<void> {
  const db = getDb();

  await db.insert(workspaces).values({
    id: CONTENT_WORKSPACE_ID,
    name: "Hyper Content Studio",
  }).onConflictDoNothing({ target: workspaces.id });

  await db.insert(workspaceSettings).values({
    workspaceId: CONTENT_WORKSPACE_ID,
  }).onConflictDoNothing({ target: workspaceSettings.workspaceId });
}

async function getStoredItem(
  type: PublicContentType,
  slug: string,
): Promise<ContentItem | null> {
  const db = getDb();
  const [item] = await db
    .select()
    .from(contentItems)
    .where(
      and(
        eq(contentItems.workspaceId, CONTENT_WORKSPACE_ID),
        eq(contentItems.type, type),
        eq(contentItems.slug, slug),
      ),
    )
    .limit(1);

  return item ?? null;
}

async function listStoredItems(
  type: PublicContentType,
  publishedOnly: boolean,
): Promise<ContentItem[]> {
  const db = getDb();
  const conditions = [
    eq(contentItems.workspaceId, CONTENT_WORKSPACE_ID),
    eq(contentItems.type, type),
  ];

  if (publishedOnly) {
    conditions.push(eq(contentItems.status, "published"));
    conditions.push(lte(contentItems.publishedAt, new Date()));
  } else {
    conditions.push(ne(contentItems.status, "archived"));
  }

  return db
    .select()
    .from(contentItems)
    .where(and(...conditions))
    .orderBy(desc(contentItems.publishedAt), desc(contentItems.createdAt));
}

export async function listPublishedBlogPosts(): Promise<BlogPostInput[]> {
  return (await listStoredItems("blog", true)).map(toBlogPost);
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostInput | null> {
  const item = await getStoredItem("blog", slug);

  if (!item || item.status !== "published" || !item.publishedAt || item.publishedAt > new Date()) {
    return null;
  }

  return toBlogPost(item);
}

export async function listPublishedManagedContent(
  type: ManagedContentType,
): Promise<ManagedContentInput[]> {
  return (await listStoredItems(type, true)).map((item) => toManagedContent(item, type));
}

export async function getPublishedManagedContentBySlug(
  type: ManagedContentType,
  slug: string,
): Promise<ManagedContentInput | null> {
  const item = await getStoredItem(type, slug);

  if (!item || item.status !== "published" || !item.publishedAt || item.publishedAt > new Date()) {
    return null;
  }

  return toManagedContent(item, type);
}

export async function listStudioBlogPosts(): Promise<BlogPostInput[]> {
  return (await listStoredItems("blog", false)).map(toBlogPost);
}

export async function getStudioBlogPostBySlug(slug: string): Promise<BlogPostInput | null> {
  const item = await getStoredItem("blog", slug);
  return item && item.status !== "archived" ? toBlogPost(item) : null;
}

export async function listStudioManagedContent(
  type: ManagedContentType,
): Promise<ManagedContentInput[]> {
  return (await listStoredItems(type, false)).map((item) => toManagedContent(item, type));
}

export async function getStudioManagedContentBySlug(
  type: ManagedContentType,
  slug: string,
): Promise<ManagedContentInput | null> {
  const item = await getStoredItem(type, slug);
  return item && item.status !== "archived" ? toManagedContent(item, type) : null;
}

function valuesForContent(input: StoredContentInput, type: PublicContentType) {
  const details =
    type === "comparison"
      ? {
          competitorName: (input as Extract<ManagedContentInput, { type: "comparison" }>).competitorName,
          decisionSummary: (input as Extract<ManagedContentInput, { type: "comparison" }>).decisionSummary,
        }
      : type === "resource"
        ? {
            resourceType: (input as Extract<ManagedContentInput, { type: "resource" }>).resourceType,
            audience: (input as Extract<ManagedContentInput, { type: "resource" }>).audience,
          }
        : {};

  return {
    workspaceId: CONTENT_WORKSPACE_ID,
    type,
    status: input.draft ? "draft" as const : "published" as const,
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    bodyMarkdown: input.content.trim(),
    authorName: input.author,
    category: input.category,
    tags: input.tags,
    focusKeyword: input.focusKeyword || null,
    seoTitle: input.seoTitle || null,
    seoDescription: input.seoDescription || null,
    coverImageUrl: input.coverImage || null,
    readingTime: input.readingTime,
    details,
    publishedAt: dateAtNoon(input.publishedAt),
    updatedAt: dateAtNoon(input.updatedAt || today()),
  };
}

async function saveContent(
  type: PublicContentType,
  input: StoredContentInput,
  editorLogin: string,
  originalSlug?: string,
): Promise<SavedContentItem> {
  await ensureWorkspace();

  const db = getDb();
  const current = originalSlug ? await getStoredItem(type, originalSlug) : null;
  const existingWithNextSlug = await getStoredItem(type, input.slug);

  if (originalSlug && (!current || current.status === "archived")) {
    throw new ContentStoreError("This content item no longer exists.");
  }

  if (existingWithNextSlug && existingWithNextSlug.id !== current?.id) {
    throw new ContentStoreError(`A ${type} with this slug already exists.`);
  }

  const values = valuesForContent(input, type);
  const id = current?.id ?? randomUUID();

  if (current) {
    await db.update(contentItems).set(values).where(eq(contentItems.id, id));
  } else {
    await db.insert(contentItems).values({
      id,
      ...values,
      createdAt: values.publishedAt,
    });
  }

  await db.insert(contentRevisions).values({
    id: randomUUID(),
    contentItemId: id,
    snapshot: {
      ...input,
      type,
      savedAt: new Date().toISOString(),
    },
    createdBy: editorLogin,
  });

  return {
    id,
    type,
    slug: input.slug,
    title: input.title,
    draft: input.draft,
  };
}

export async function saveBlogPost(
  input: BlogPostInput,
  editorLogin: string,
  originalSlug?: string,
): Promise<SavedContentItem> {
  return saveContent("blog", input, editorLogin, originalSlug);
}

export async function saveManagedContent(
  input: ManagedContentInput,
  editorLogin: string,
  originalSlug?: string,
): Promise<SavedContentItem> {
  if (!isManagedType(input.type)) {
    throw new ContentStoreError("Only comparisons and resources can be saved as managed content.");
  }

  return saveContent(input.type, input, editorLogin, originalSlug);
}

export async function deleteStoredContent(
  type: PublicContentType,
  slug: string,
): Promise<{ title: string; slug: string; type: PublicContentType }> {
  const db = getDb();
  const deleted = await db
    .delete(contentItems)
    .where(
      and(
        eq(contentItems.workspaceId, CONTENT_WORKSPACE_ID),
        eq(contentItems.type, type),
        eq(contentItems.slug, slug),
      ),
    )
    .returning({
      title: contentItems.title,
      slug: contentItems.slug,
      type: contentItems.type,
    });

  const item = deleted[0];

  if (!item) {
    throw new ContentStoreError("This content item no longer exists.");
  }

  return item;
}
