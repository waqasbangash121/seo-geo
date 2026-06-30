import "server-only";

import { sameValue } from "@/lib/local-access";

export type AdminAuthMode = "local" | "github" | "hybrid";

function localUser(): string {
  return process.env.ADMIN_LOCAL_USERNAME?.trim() ?? "";
}

function localSecret(): string {
  return process.env.ADMIN_LOCAL_SECRET ?? "";
}

function githubUsers(): string[] {
  return (process.env.ADMIN_ALLOWED_GITHUB_USERS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function adminAuthMode(): AdminAuthMode {
  const mode = (process.env.ADMIN_AUTH_MODE ?? "github").trim().toLowerCase();

  if (mode === "local" || mode === "github" || mode === "hybrid") return mode;
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

export function hasLocalCredentials(): boolean {
  return Boolean(localUser() && localSecret());
}

export function isAllowedGithubUser(login: string): boolean {
  return githubUsers().includes(login.toLowerCase());
}

export function isLocalUser(login: string): boolean {
  const configuredUser = localUser();
  return Boolean(configuredUser) && sameValue(login.trim().toLowerCase(), configuredUser.toLowerCase());
}

export function verifyLocalAccess(username: unknown, secret: unknown): string | null {
  if (!localAuthEnabled()) return null;
  if (!hasLocalCredentials()) {
    throw new Error("Set ADMIN_LOCAL_USERNAME and ADMIN_LOCAL_SECRET before enabling local sign-in.");
  }
  if (typeof username !== "string" || typeof secret !== "string") return null;

  const configuredUser = localUser();
  const userMatches = sameValue(username.trim().toLowerCase(), configuredUser.toLowerCase());
  const secretMatches = sameValue(secret, localSecret());

  return userMatches && secretMatches ? configuredUser : null;
}
