import { NextResponse } from "next/server";

import { ManagedContentInputError, parseManagedContentInput } from "@/lib/content-admin";
import { revalidateContentRoutes } from "@/lib/content-revalidation";
import { ContentStoreError, saveManagedContent } from "@/lib/content-store";
import { currentEditor } from "@/lib/editor-session";

export const runtime = "nodejs";

function sameOrigin(request: Request): boolean {
  return request.headers.get("origin") === new URL(request.url).origin;
}

export async function POST(request: Request) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  try {
    const item = parseManagedContentInput(await request.json(), "comparison");
    const saved = await saveManagedContent(item, editor.login);

    revalidateContentRoutes("comparison", saved.slug);
    return NextResponse.json({ slug: saved.slug });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The comparison could not be saved.";
    const status = error instanceof ManagedContentInputError || error instanceof ContentStoreError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
