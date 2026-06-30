import "server-only";

import { drizzle } from "drizzle-orm/neon-http";

import {
  contentItems,
  contentRevisions,
  workspaces,
  workspaceSecrets,
  workspaceSettings,
} from "@/db/schema";

const databaseSchema = {
  workspaces,
  workspaceSettings,
  workspaceSecrets,
  contentItems,
  contentRevisions,
};

function databaseUrl(): string {
  const value = process.env.DATABASE_URL?.trim();
  if (!value) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return value;
}

function createDatabase() {
  return drizzle(databaseUrl(), { schema: databaseSchema });
}

let database: ReturnType<typeof createDatabase> | undefined;

export function getDb() {
  return (database ??= createDatabase());
}
