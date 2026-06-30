import { randomBytes } from "node:crypto";
import { githubAuthEnabled } from "@/lib/editor-session";
import { NextResponse } from "next/server";

import { editorCookieOptions, editorStateName } from "@/lib/editor-session";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!githubAuthEnabled()) {
    return NextResponse.redirect(
      new URL("/admin/login?error=github-sign-in-disabled", request.url),
    );
  }
  const clientId = process.env.ADMIN_GITHUB_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json({ error: "Missing ADMIN_GITHUB_CLIENT_ID." }, { status: 500 });
  }

  const callbackUrl =
    process.env.ADMIN_GITHUB_CALLBACK_URL ||
    new URL("/api/admin/auth/callback", request.url).toString();
  const state = randomBytes(32).toString("base64url");
  const authorizationUrl = new URL("https://github.com/login/oauth/authorize");

  authorizationUrl.searchParams.set("client_id", clientId);
  authorizationUrl.searchParams.set("redirect_uri", callbackUrl);
  authorizationUrl.searchParams.set("scope", "read:user");
  authorizationUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizationUrl);
  response.cookies.set(editorStateName, state, editorCookieOptions(10 * 60));
  return response;
}
