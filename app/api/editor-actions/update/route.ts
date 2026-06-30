import { NextResponse } from "next/server";

import { BlogInputError, parseBlogPostInput } from "@/lib/blog-admin";
import { revalidateContentRoutes } from "@/lib/content-revalidation";
import { ContentStoreError, saveBlogPost } from "@/lib/content-store";
import { currentEditor } from "@/lib/editor-session";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });

  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const post = parseBlogPostInput(await request.json());
    const previousSlug = new URL(request.url).searchParams.get("current") || undefined;
    const saved = await saveBlogPost(post, editor.login, previousSlug);

    revalidateContentRoutes("blog", saved.slug, previousSlug);
    return NextResponse.json({ slug: saved.slug });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The article could not be saved.";
    const status = error instanceof BlogInputError || error instanceof ContentStoreError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
