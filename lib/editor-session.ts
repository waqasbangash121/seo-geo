import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const editorSessionName = "hyper_blog_editor";
export const editorStateName = "hyper_blog_state";
export const editorSessionSeconds = 60 * 60 * 8;

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

function encode(value: string): string {
  return Buffer.from(value).toString("base64url");
}

function signature(value: string): string {
  return createHmac("sha256", sessionKey()).update(value).digest("base64url");
}

export function isPermittedEditor(login: string): boolean {
  const names = (process.env.ADMIN_ALLOWED_GITHUB_USERS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return names.includes(login.toLowerCase());
}

export function createEditorIdentity(login: string): string {
  const payload = encode(
    JSON.stringify({ login, expiresAt: Math.floor(Date.now() / 1000) + editorSessionSeconds }),
  );

  return `${payload}.${signature(payload)}`;
}

export function readEditorIdentity(value?: string): EditorIdentity | null {
  if (!value) return null;

  const [payload, providedSignature] = value.split(".");
  if (!payload || !providedSignature) return null;

  const expected = Buffer.from(signature(payload));
  const provided = Buffer.from(providedSignature);

  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) return null;

  try {
    const identity = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as EditorIdentity;
    if (typeof identity.login !== "string" || typeof identity.expiresAt !== "number") return null;
    if (identity.expiresAt <= Math.floor(Date.now() / 1000)) return null;
    return isPermittedEditor(identity.login) ? identity : null;
  } catch {
    return null;
  }
}

export type { EditorIdentity };
