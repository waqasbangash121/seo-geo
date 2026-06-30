import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const editorSessionName = "hyper_blog_editor";
export const editorStateName = "hyper_blog_state";
export const editorSessionSeconds = 60 * 60 * 8;

export type AdminAuthMode = "local" | "github" | "hybrid";

type EditorIdentity = {
  login: string;
  expiresAt: number;
};

function sessionKey(): string {
  const value = process.env.ADMIN_SESSION_SECRET;

  if (!value || value.length < 32) {
    throw new Error("Set ADMIN_SESSION_SECRET to at least 32 characters.");
  }

  return value;
}

function safeEquals(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function encode(value: string): string {
  return Buffer.from(value).toString("base64url");
}

function signature(value: string): string {
  return createHmac("sha256", sessionKey()).update(value).digest("base64url");
}

function githubUsers(): string[] {
  return (process.env.ADMIN_ALLOWED_GITHUB_USERS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function localUsername(): string {
  return process.env.ADMIN_LOCAL_USERNAME?.trim() ?? "";
}

function localPassword(): string {
  return process.env.ADMIN_LOCAL_PASSWORD ?? "";
}

export function adminAuthMode(): AdminAuthMode {
  const mode = (process.env.ADMIN_AUTH_MODE ?? "github").trim().toLowerCase();

  if (mode === "local" || mode === "github" || mode === "hybrid") {
    return mode;
  }

  throw new Error("ADMIN_AUTH_MODE must be local, github, or hybrid.");
}

export function localAuthEnabled(): boolean {
  const mode = adminAuthMode();
  return mode === "local" || mode === "hybrid";
}

export function githubAuthEnabled(): boolean {
  const mode = adminAuthMode();
  return mode === "github" || mode === "hybrid";
}

export function localCredentialsConfigured(): boolean {
  return Boolean(localUsername() && localPassword());
}

export function isPermittedGitHubEditor(login: string): boolean {
  return githubUsers().includes(login.toLowerCase());
}

export function isLocalEditor(login: string): boolean {
  const configuredUsername = localUsername();

  return (
    Boolean(configuredUsername) &&
    safeEquals(login.trim().toLowerCase(), configuredUsername.toLowerCase())
  );
}

export function isPermittedEditor(login: string): boolean {
  if (localAuthEnabled() && isLocalEditor(login)) {
    return true;
  }

  if (githubAuthEnabled() && isPermittedGitHubEditor(login)) {
    return true;
  }

  return false;
}

export function verifyLocalCredentials(username: unknown, password: unknown): string | null {
  if (!localAuthEnabled()) {
    return null;
  }

  if (!localCredentialsConfigured()) {
    throw new Error(
      "Set ADMIN_LOCAL_USERNAME and ADMIN_LOCAL_PASSWORD before enabling local sign-in.",
    );
  }

  if (typeof username !== "string" || typeof password !== "string") {
    return null;
  }

  const configuredUsername = localUsername();

  const usernameMatches = safeEquals(
    username.trim().toLowerCase(),
    configuredUsername.toLowerCase(),
  );

  const passwordMatches = safeEquals(password, localPassword());

  return usernameMatches && passwordMatches ? configuredUsername : null;
}

export function createEditorIdentity(login: string): string {
  const payload = encode(
    JSON.stringify({
      login,
      expiresAt: Math.floor(Date.now() / 1000) + editorSessionSeconds,
    }),
  );

  return `${payload}.${signature(payload)}`;
}

export function readEditorIdentity(value?: string): EditorIdentity | null {
  if (!value) {
    return null;
  }

  const [payload, providedSignature] = value.split(".");

  if (!payload || !providedSignature) {
    return null;
  }

  const expected = Buffer.from(signature(payload));
  const provided = Buffer.from(providedSignature);

  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
    return null;
  }

  try {
    const identity = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as EditorIdentity;

    if (typeof identity.login !== "string" || typeof identity.expiresAt !== "number") {
      return null;
    }

    if (identity.expiresAt <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return isPermittedEditor(identity.login) ? identity : null;
  } catch {
    return null;
  }
}

export async function currentEditor(): Promise<EditorIdentity | null> {
  const store = await cookies();

  return readEditorIdentity(store.get(editorSessionName)?.value);
}

export async function requireEditor(): Promise<EditorIdentity> {
  const identity = await currentEditor();

  if (!identity) {
    redirect("/admin/login");
  }

  return identity;
}

export function editorCookieOptions(maxAge = editorSessionSeconds) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export type { EditorIdentity };
