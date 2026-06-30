import { NextResponse } from "next/server";

import {
  createEditorIdentity,
  editorCookieOptions,
  editorSessionName,
  editorStateName,
  localAuthEnabled,
  verifyLocalCredentials,
} from "@/lib/editor-session";

export const runtime = "nodejs";

const maxAttempts = 5;
const blockDurationMs = 15 * 60 * 1000;

type AttemptRecord = {
  count: number;
  blockedUntil: number;
};

const attempts = new Map<string, AttemptRecord>();

function loginError(request: Request, reason: string) {
  const url = new URL("/admin/login", request.url);
  url.searchParams.set("error", reason);

  return NextResponse.redirect(url);
}

function requestKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isBlocked(key: string): boolean {
  const record = attempts.get(key);

  if (!record) {
    return false;
  }

  if (record.blockedUntil <= Date.now()) {
    attempts.delete(key);
    return false;
  }

  return record.count >= maxAttempts;
}

function recordFailure(key: string) {
  const current = attempts.get(key);

  const nextCount = (current?.count ?? 0) + 1;

  attempts.set(key, {
    count: nextCount,
    blockedUntil:
      nextCount >= maxAttempts ? Date.now() + blockDurationMs : (current?.blockedUntil ?? 0),
  });
}

export async function POST(request: Request) {
  if (!localAuthEnabled()) {
    return loginError(request, "local-sign-in-disabled");
  }

  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return loginError(request, "invalid-sign-in-request");
  }

  const key = requestKey(request);

  if (isBlocked(key)) {
    return loginError(request, "too-many-sign-in-attempts");
  }

  try {
    const form = await request.formData();

    const login = verifyLocalCredentials(form.get("username"), form.get("password"));

    if (!login) {
      recordFailure(key);
      return loginError(request, "invalid-local-credentials");
    }

    attempts.delete(key);

    const response = NextResponse.redirect(new URL("/admin", request.url));

    response.cookies.set(editorSessionName, createEditorIdentity(login), editorCookieOptions());

    response.cookies.set(editorStateName, "", editorCookieOptions(0));

    return response;
  } catch {
    return loginError(request, "local-sign-in-unavailable");
  }
}
