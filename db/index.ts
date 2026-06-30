import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

type Database = NeonHttpDatabase<typeof schema>;

let database: Database | undefined;

function databaseUrl(): string {
  const value = process.env.DATABASE_URL?.trim();
  if (!value) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return value;
}

export function getDb(): Database {
  if (!database) {
    database = drizzle(neon(databaseUrl()), { schema });
  }

  return database;
}
