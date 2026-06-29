import { NextResponse } from "next/server";

import { generateContentSuggestion } from "@/lib/content-ai";
import { currentEditor } from "@/lib/editor-session";

export const runtime = "nodejs";
export const maxDuration = 30;

const cooldownMs = 12_000;
const lastRequestByEditor = new Map<string, number>();

function sameOrigin(request: Request): boolean {
  return request.headers.get("origin") === new URL(request.url).origin;
}

export async function POST(request: Request) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  const now = Date.now();
  const previous = lastRequestByEditor.get(editor.login) ?? 0;
  const remaining = cooldownMs - (now - previous);
  if (remaining > 0) {
    return NextResponse.json(
      { error: `Please wait ${Math.ceil(remaining / 1000)} seconds before generating again.` },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    lastRequestByEditor.set(editor.login, now);
    const text = await generateContentSuggestion(body);
    return NextResponse.json({ text });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Content generation could not be completed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
