import { NextRequest, NextResponse } from "next/server";
import { githubAuthEnabled } from "@/lib/editor-session";
import {
  createEditorIdentity,
  editorCookieOptions,
  editorSessionName,
  editorStateName,
  isPermittedEditor,
} from "@/lib/editor-session";

export const runtime = "nodejs";

type GitHubTokenResponse = {
  access_token?: string;
};

type GitHubProfile = {
  login?: string;
};

function loginError(request: Request, reason: string) {
  const url = new URL("/admin/login", request.url);
  url.searchParams.set("error", reason);
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  if (!githubAuthEnabled()) {
    return loginError(request, "github-sign-in-disabled");
  }
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const clientId = process.env.ADMIN_GITHUB_CLIENT_ID;
  const clientSecret = process.env.ADMIN_GITHUB_CLIENT_SECRET;

  if (!code || !state || !clientId || !clientSecret) {
    return loginError(request, "sign-in-unavailable");
  }

  const storedState = request.cookies.get(editorStateName)?.value;
  if (!storedState || storedState !== state) {
    return loginError(request, "invalid-sign-in-request");
  }

  const callbackUrl =
    process.env.ADMIN_GITHUB_CALLBACK_URL ||
    new URL("/api/admin/auth/callback", request.url).toString();
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: callbackUrl,
    }),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    return loginError(request, "github-sign-in-failed");
  }

  const token = (await tokenResponse.json()) as GitHubTokenResponse;
  if (!token.access_token) {
    return loginError(request, "github-sign-in-failed");
  }

  const profileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token.access_token}`,
      "User-Agent": "Hyper-Blog-Admin",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  const profile = (await profileResponse.json()) as GitHubProfile;
  if (!profileResponse.ok || !profile.login || !isPermittedEditor(profile.login)) {
    return loginError(request, "not-authorized");
  }

  const response = NextResponse.redirect(new URL("/admin/blogs", request.url));
  response.cookies.set(
    editorSessionName,
    createEditorIdentity(profile.login),
    editorCookieOptions(),
  );
  response.cookies.set(editorStateName, "", editorCookieOptions(0));
  return response;
}
