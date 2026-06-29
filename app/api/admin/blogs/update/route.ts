import { NextResponse } from "next/server";

import { BlogInputError, parseBlogPostInput } from "@/lib/blog-admin";
import { currentEditor } from "@/lib/editor-session";
import { githubCommitUrl, saveRemotePost } from "@/lib/editor-github";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const body = (await request.json()) as { article?: unknown; currentSlug?: string };
    const article = parseBlogPostInput(body.article);
    const commit = await saveRemotePost(article, body.currentSlug);
    return NextResponse.json({ slug: article.slug, commitUrl: githubCommitUrl(commit.sha) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The article could not be saved.";
    return NextResponse.json({ error: message }, { status: error instanceof BlogInputError ? 400 : 500 });
  }
}
