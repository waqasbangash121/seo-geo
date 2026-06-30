import { NextResponse } from "next/server";

import { ManagedContentInputError, parseManagedContentInput } from "@/lib/content-admin";
import { revalidateContentRoutes } from "@/lib/content-revalidation";
import { ContentStoreError, saveManagedContent } from "@/lib/content-store";
import { currentEditor } from "@/lib/editor-session";

export const runtime = "nodejs";

type ResourceUpdateRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function PATCH(request: Request, { params }: ResourceUpdateRouteProps) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const { slug } = await params;
    const item = parseManagedContentInput(await request.json(), "resource");
    const saved = await saveManagedContent(item, editor.login, slug);

    revalidateContentRoutes("resource", saved.slug, slug);
    return NextResponse.json({ slug: saved.slug });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The resource could not be saved.";
    const status = error instanceof ManagedContentInputError || error instanceof ContentStoreError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
