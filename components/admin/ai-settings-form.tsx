"use client";

import { useState } from "react";
import { CheckCircle2, KeyRound, LoaderCircle, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";

type AiSettingsSummary = {
  provider: "openai";
  model: string | null;
  configured: boolean;
  last4: string | null;
  updatedAt: string | null;
};

type ApiResponse = {
  error?: string;
  settings?: AiSettingsSummary;
  verified?: boolean;
};

type AiSettingsFormProps = {
  initialSettings: AiSettingsSummary;
};

async function responseBody(response: Response): Promise<ApiResponse> {
  const value = (await response.json().catch(() => ({}))) as ApiResponse;

  if (!response.ok) {
    throw new Error(value.error || "The request could not be completed.");
  }

  return value;
}

export function AiSettingsForm({ initialSettings }: AiSettingsFormProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState(initialSettings.model ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const clearMessages = () => {
    setError("");
    setNotice("");
  };

  async function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearMessages();

    if (!model.trim()) {
      setError("Enter the OpenAI model ID that this key can use.");
      return;
    }

    if (!settings.configured && !apiKey.trim()) {
      setError("Enter an OpenAI API key before saving AI settings.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/settings/ai", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: apiKey.trim() || undefined,
          model: model.trim(),
        }),
      });
      const result = await responseBody(response);

      if (!result.settings) throw new Error("AI settings could not be saved.");

      setSettings(result.settings);
      setApiKey("");
      setNotice("AI settings were saved and the OpenAI configuration was verified.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "AI settings could not be saved.");
    } finally {
      setIsSaving(false);
    }
  }

  async function testSavedSettings() {
    clearMessages();
    setIsTesting(true);

    try {
      const response = await fetch("/api/admin/settings/ai", { method: "POST" });
      await responseBody(response);
      setNotice("The saved OpenAI configuration is working.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The saved AI configuration could not be verified.");
    } finally {
      setIsTesting(false);
    }
  }

  async function removeSettings() {
    if (!window.confirm("Remove the saved OpenAI API key? AI drafting will stop until a new key is connected.")) {
      return;
    }

    clearMessages();
    setIsRemoving(true);

    try {
      const response = await fetch("/api/admin/settings/ai", { method: "DELETE" });
      const result = await responseBody(response);

      if (!result.settings) throw new Error("AI settings could not be removed.");

      setSettings(result.settings);
      setApiKey("");
      setNotice("The saved OpenAI API key was removed.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "AI settings could not be removed.");
    } finally {
      setIsRemoving(false);
    }
  }

  const isBusy = isSaving || isTesting || isRemoving;

  return (
    <form onSubmit={saveSettings} className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
            <KeyRound aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">OpenAI connection</p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              Connect the API key that Content Studio will use for blog, comparison, and resource drafting.
            </p>
          </div>
        </div>

        {settings.configured ? (
          <span className="inline-flex w-fit items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">
            <CheckCircle2 aria-hidden="true" className="size-4" />
            Connected · ••••{settings.last4}
          </span>
        ) : (
          <span className="inline-flex w-fit rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-50">
            Not connected
          </span>
        )}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <label className="grid gap-2 text-sm font-semibold">
          OpenAI API key
          <input
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            type="password"
            name="openai-api-key"
            autoComplete="new-password"
            autoCapitalize="none"
            spellCheck={false}
            disabled={isBusy}
            placeholder={settings.configured ? "Enter a new key only to replace the saved key" : "Paste your OpenAI API key"}
            className="h-11 rounded-md border border-border bg-background px-3 text-sm font-normal text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
          />
          <span className="font-normal leading-5 text-muted-foreground">
            The key is sent once over HTTPS, verified server-side, encrypted before storage, and never shown here again.
          </span>
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Model ID
          <input
            value={model}
            onChange={(event) => setModel(event.target.value)}
            type="text"
            name="openai-model"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            disabled={isBusy}
            placeholder="Enter a model ID available to this key"
            className="h-11 rounded-md border border-border bg-background px-3 text-sm font-normal text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
          />
          <span className="font-normal leading-5 text-muted-foreground">
            Use the exact model identifier available to the OpenAI project associated with this key.
          </span>
        </label>
      </div>

      <div className="mt-5 rounded-md border border-border bg-background p-4">
        <div className="flex gap-3">
          <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-semibold">Key handling</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Your browser never receives a saved API key. Only encrypted ciphertext is stored in Neon, and the key is decrypted only in server memory when a protected AI action needs it.
            </p>
          </div>
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-5 rounded-md border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-800 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-100">
          {error}
        </p>
      ) : null}

      {notice ? (
        <p role="status" className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-100">
          {notice}
        </p>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="submit"
          disabled={isBusy}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <KeyRound aria-hidden="true" className="size-4" />}
          {settings.configured ? "Save changes" : "Save and verify"}
        </button>

        <button
          type="button"
          onClick={testSavedSettings}
          disabled={isBusy || !settings.configured}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isTesting ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <RefreshCw aria-hidden="true" className="size-4" />}
          Test saved connection
        </button>

        {settings.configured ? (
          <button
            type="button"
            onClick={removeSettings}
            disabled={isBusy}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-rose-200 bg-background px-4 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-400/30 dark:text-rose-200 dark:hover:bg-rose-400/10"
          >
            {isRemoving ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <Trash2 aria-hidden="true" className="size-4" />}
            Remove key
          </button>
        ) : null}
      </div>
    </form>
  );
}
