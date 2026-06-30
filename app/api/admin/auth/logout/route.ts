import { NextResponse } from "next/server";

import {
  editorCookieOptions,
  editorSessionName,
  editorStateName,
} from "@/lib/editor-session";

export const runtime = "nodejs";

function signedOutResponse(request: Request) {
  const url = new URL("/admin/login", request.url);
  url.searchParams.set("signedOut", "1");

  const response = NextResponse.redirect(url);
  response.cookies.set(editorSessionName, "", editorCookieOptions(0));
  response.cookies.set(editorStateName, "", editorCookieOptions(0));

  return response;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");

  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return signedOutResponse(request);
}

export async function GET(request: Request) {
  return signedOutResponse(request);
}
