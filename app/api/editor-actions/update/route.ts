import { NextResponse } from "next/server";

import { BlogInputError, parseBlogPostInput } from "@/lib/blog-admin";
import { currentEditor } from "@/lib/editor-session";
import { githubCommitUrl, saveRemotePost } from "@/lib/editor-github";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const post = parseBlogPostInput(await request.json());
    const current = new URL(request.url).searchParams.get("current") ?? undefined;
    const commit = await saveRemotePost(post, current);
    return NextResponse.json({ slug: post.slug, commitUrl: githubCommitUrl(commit.sha) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The article could not be saved.";
    return NextResponse.json({ error: message }, { status: error instanceof BlogInputError ? 400 : 500 });
  }
}
