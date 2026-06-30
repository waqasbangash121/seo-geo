import "server-only";

import { and, eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";

import { getDb } from "@/db";
import { workspaceSecrets, workspaceSettings } from "@/db/schema";
import { decryptSettingSecret, encryptSettingSecret } from "@/lib/settings-encryption";
import { ensureDefaultWorkspace } from "@/lib/workspace";

const openAiSecretName = "openai_api_key";
const openAiProvider = "openai";
const connectionTimeoutMs = 12_000;

export type AiSettingsSummary = {
  provider: "openai";
  model: string | null;
  configured: boolean;
  last4: string | null;
  updatedAt: string | null;
};

export class AiSettingsError extends Error {
  constructor(
    message: string,
    readonly statusCode = 400,
  ) {
    super(message);
    this.name = "AiSettingsError";
  }
}

function cleanString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function userFacingProviderError(status: number): AiSettingsError {
  if (status === 401 || status === 403) {
    return new AiSettingsError("OpenAI rejected this API key. Check the key and try again.", 400);
  }

  if (status === 404) {
    return new AiSettingsError("That model is not available to this API key. Update the model ID and try again.", 400);
  }

  if (status === 429) {
    return new AiSettingsError("OpenAI is rate-limiting this key. Wait a moment and try again.", 429);
  }

  return new AiSettingsError("OpenAI could not verify this configuration. Try again shortly.", 502);
}

async function workspaceRecords() {
  const workspaceId = await ensureDefaultWorkspace();
  const db = getDb();

  const [settings] = await db
    .select({
      aiProvider: workspaceSettings.aiProvider,
      aiModel: workspaceSettings.aiModel,
      updatedAt: workspaceSettings.updatedAt,
    })
    .from(workspaceSettings)
    .where(eq(workspaceSettings.workspaceId, workspaceId))
    .limit(1);

  const [secret] = await db
    .select({
      ciphertext: workspaceSecrets.ciphertext,
      iv: workspaceSecrets.iv,
      authTag: workspaceSecrets.authTag,
      last4: workspaceSecrets.last4,
      updatedAt: workspaceSecrets.updatedAt,
    })
    .from(workspaceSecrets)
    .where(
      and(
        eq(workspaceSecrets.workspaceId, workspaceId),
        eq(workspaceSecrets.secretName, openAiSecretName),
      ),
    )
    .limit(1);

  return { workspaceId, settings, secret };
}

export async function getAiSettingsSummary(): Promise<AiSettingsSummary> {
  const { settings, secret } = await workspaceRecords();

  return {
    provider: "openai",
    model: settings?.aiModel ?? null,
    configured: Boolean(secret),
    last4: secret?.last4 ?? null,
    updatedAt: secret?.updatedAt?.toISOString() ?? settings?.updatedAt?.toISOString() ?? null,
  };
}

export async function verifyOpenAiConnection(apiKeyValue: unknown, modelValue: unknown): Promise<void> {
  const apiKey = cleanString(apiKeyValue, 500);
  const model = cleanString(modelValue, 128);

  if (apiKey.length < 20) {
    throw new AiSettingsError("Enter a valid OpenAI API key.");
  }

  if (!model) {
    throw new AiSettingsError("Enter the OpenAI model ID that this key can use.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), connectionTimeoutMs);

  try {
    const response = await fetch(`https://api.openai.com/v1/models/${encodeURIComponent(model)}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) throw userFacingProviderError(response.status);
  } catch (error) {
    if (error instanceof AiSettingsError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new AiSettingsError("OpenAI did not respond in time. Try again.", 504);
    }
    throw new AiSettingsError("OpenAI could not be reached. Check your connection and try again.", 502);
  } finally {
    clearTimeout(timeout);
  }
}

export async function saveOpenAiSettings(value: unknown): Promise<AiSettingsSummary> {
  if (!value || typeof value !== "object") {
    throw new AiSettingsError("Invalid AI settings request.");
  }

  const input = value as Record<string, unknown>;
  const providedApiKey = cleanString(input.apiKey, 500);
  const model = cleanString(input.model, 128);

  if (!model) {
    throw new AiSettingsError("Enter the OpenAI model ID that this key can use.");
  }

  const { workspaceId, secret } = await workspaceRecords();
  let apiKey = providedApiKey;

  if (!apiKey) {
    if (!secret) {
      throw new AiSettingsError("Enter an OpenAI API key before saving AI settings.");
    }

    try {
      apiKey = decryptSettingSecret(secret);
    } catch {
      throw new AiSettingsError("The saved AI key could not be read. Replace it with a new key.", 500);
    }
  }

  await verifyOpenAiConnection(apiKey, model);

  const db = getDb();
  const now = new Date();

  await db
    .update(workspaceSettings)
    .set({
      aiProvider: openAiProvider,
      aiModel: model,
      updatedAt: now,
    })
    .where(eq(workspaceSettings.workspaceId, workspaceId));

  if (providedApiKey) {
    const encrypted = encryptSettingSecret(providedApiKey);

    await db
      .insert(workspaceSecrets)
      .values({
        id: randomUUID(),
        workspaceId,
        secretName: openAiSecretName,
        ...encrypted,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: [workspaceSecrets.workspaceId, workspaceSecrets.secretName],
        set: {
          ciphertext: encrypted.ciphertext,
          iv: encrypted.iv,
          authTag: encrypted.authTag,
          keyVersion: encrypted.keyVersion,
          last4: encrypted.last4,
          updatedAt: now,
        },
      });
  }

  return getAiSettingsSummary();
}

export async function testSavedOpenAiSettings(): Promise<void> {
  const configuration = await getOpenAiWorkspaceConfiguration();
  await verifyOpenAiConnection(configuration.apiKey, configuration.model);
}

export async function removeOpenAiSettings(): Promise<void> {
  const workspaceId = await ensureDefaultWorkspace();
  const db = getDb();

  await db
    .delete(workspaceSecrets)
    .where(
      and(
        eq(workspaceSecrets.workspaceId, workspaceId),
        eq(workspaceSecrets.secretName, openAiSecretName),
      ),
    );
}

export async function getOpenAiWorkspaceConfiguration(): Promise<{ apiKey: string; model: string }> {
  const { settings, secret } = await workspaceRecords();

  if (!settings?.aiModel || !secret) {
    throw new AiSettingsError(
      "AI is not configured. Open Settings to connect an OpenAI API key and choose a model.",
      422,
    );
  }

  try {
    return {
      apiKey: decryptSettingSecret(secret),
      model: settings.aiModel,
    };
  } catch {
    throw new AiSettingsError("The saved AI key could not be read. Replace it in Settings.", 500);
  }
}
