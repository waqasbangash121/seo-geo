import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  throw new Error("DATABASE_URL is required to generate or run database migrations.");
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
