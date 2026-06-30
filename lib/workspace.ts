import "server-only";

import { getDb } from "@/db";
import { workspaces, workspaceSettings } from "@/db/schema";

export const defaultWorkspace = {
  id: "hyper-default",
  name: "Hyper Content Studio",
} as const;

export async function ensureDefaultWorkspace(): Promise<string> {
  const db = getDb();

  await db
    .insert(workspaces)
    .values(defaultWorkspace)
    .onConflictDoNothing({ target: workspaces.id });

  await db
    .insert(workspaceSettings)
    .values({ workspaceId: defaultWorkspace.id })
    .onConflictDoNothing({ target: workspaceSettings.workspaceId });

  return defaultWorkspace.id;
}
