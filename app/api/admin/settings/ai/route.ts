import { NextResponse } from "next/server";

import {
  AiSettingsError,
  getAiSettingsSummary,
  removeOpenAiSettings,
  saveOpenAiSettings,
  testSavedOpenAiSettings,
} from "@/lib/ai-settings";
import { currentEditor } from "@/lib/editor-session";

export const runtime = "nodejs";
export const maxDuration = 20;

function sameOrigin(request: Request): boolean {
  return request.headers.get("origin") === new URL(request.url).origin;
}

function errorResponse(error: unknown, fallback: string) {
  if (error instanceof AiSettingsError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode });
  }

  return NextResponse.json({ error: fallback }, { status: 500 });
}

async function requireAuthenticatedEditor() {
  const editor = await currentEditor();
  if (!editor) {
    return null;
  }

  return editor;
}

export async function GET() {
  const editor = await requireAuthenticatedEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });

  try {
    return NextResponse.json({ settings: await getAiSettingsSummary() });
  } catch (error) {
    return errorResponse(error, "AI settings could not be loaded.");
  }
}

export async function PUT(request: Request) {
  const editor = await requireAuthenticatedEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  try {
    const settings = await saveOpenAiSettings(await request.json());
    return NextResponse.json({ settings });
  } catch (error) {
    return errorResponse(error, "AI settings could not be saved.");
  }
}

export async function POST(request: Request) {
  const editor = await requireAuthenticatedEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  try {
    await testSavedOpenAiSettings();
    return NextResponse.json({ verified: true });
  } catch (error) {
    return errorResponse(error, "The saved AI configuration could not be verified.");
  }
}

export async function DELETE(request: Request) {
  const editor = await requireAuthenticatedEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  try {
    await removeOpenAiSettings();
    return NextResponse.json({ settings: await getAiSettingsSummary() });
  } catch (error) {
    return errorResponse(error, "AI settings could not be removed.");
  }
}
