import { NextResponse } from "next/server";

import { revalidateContentRoutes } from "@/lib/content-revalidation";
import { ContentStoreError, deleteStoredContent } from "@/lib/content-store";
import { currentEditor } from "@/lib/editor-session";

export const runtime = "nodejs";

type ContentType = "blog" | "comparison" | "resource";

function sameOrigin(request: Request): boolean {
  return request.headers.get("origin") === new URL(request.url).origin;
}

function validSlug(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function validType(value: unknown): value is ContentType {
  return value === "blog" || value === "comparison" || value === "resource";
}

export async function POST(request: Request) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  try {
    const body = await request.json() as { type?: unknown; slug?: unknown };

    if (!validType(body.type) || !validSlug(body.slug)) {
      return NextResponse.json({ error: "Choose a valid content item to delete." }, { status: 400 });
    }

    const deleted = await deleteStoredContent(body.type, body.slug);
    revalidateContentRoutes(deleted.type, deleted.slug);

    return NextResponse.json({
      deleted: true,
      title: deleted.title,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The content item could not be deleted.";
    const status = error instanceof ContentStoreError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
