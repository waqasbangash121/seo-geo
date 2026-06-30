import { NextResponse } from "next/server";

import { BlogInputError } from "@/lib/blog-admin";
import { ManagedContentInputError } from "@/lib/content-admin";
import { currentEditor } from "@/lib/editor-session";
import {
  deleteRemoteManagedContent,
  deleteRemotePost,
  githubCommitUrl,
} from "@/lib/editor-github";

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

    const deleted = body.type === "blog"
      ? await deleteRemotePost(body.slug)
      : await deleteRemoteManagedContent(body.type, body.slug);

    return NextResponse.json({
      deleted: true,
      title: deleted.title,
      commitUrl: githubCommitUrl(deleted.sha),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The content item could not be deleted.";
    const status = error instanceof BlogInputError || error instanceof ManagedContentInputError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
