"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Check,
  Clipboard,
  FileText,
  HelpCircle,
  Loader2,
  PanelTop,
  PlusCircle,
  Sparkles,
} from "lucide-react";

type ContentModule = "blog" | "comparison" | "resource";
type GenerationTask = "outline" | "metadata" | "faq" | "section";

type ContentAiAssistantProps = {
  module: ContentModule;
  title: string;
  focusKeyword?: string;
  audience?: string;
  competitorName?: string;
  existingContent?: string;
  onAppendToContent?: (text: string) => void;
};

const actions: Array<{ task: GenerationTask; label: string; description: string; Icon: LucideIcon }> = [
  { task: "outline", label: "Outline", description: "Create a structured H2 flow.", Icon: PanelTop },
  { task: "metadata", label: "Metadata", description: "Draft title, description, excerpt, and tags.", Icon: FileText },
  { task: "faq", label: "FAQs", description: "Suggest direct-answer questions.", Icon: HelpCircle },
  { task: "section", label: "Section", description: "Write one grounded Markdown section.", Icon: PlusCircle },
];

export function ContentAiAssistant({
  module,
  title,
  focusKeyword,
  audience,
  competitorName,
  existingContent,
  onAppendToContent,
}: ContentAiAssistantProps) {
  const [runningTask, setRunningTask] = useState<GenerationTask | null>(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function generate(task: GenerationTask) {
    setRunningTask(task);
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/admin/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module,
          task,
          title,
          focusKeyword,
          audience,
          competitorName,
          existingContent,
        }),
      });
      const body = (await response.json()) as { text?: string; error?: string };
      if (!response.ok || !body.text) throw new Error(body.error || "Content generation could not be completed.");
      setResult(body.text);
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : "Content generation could not be completed.");
    } finally {
      setRunningTask(null);
    }
  }

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
  }

  return (
    <section className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
          <Sparkles aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">AI assistant</p>
          <h2 className="mt-1 font-semibold">Generate a starting point</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Suggestions stay editable. Review claims, adjust the voice, then save or publish when ready.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
        {actions.map((action) => {
          const isRunning = runningTask === action.task;
          const Icon = action.Icon;

          return (
            <button
              key={action.task}
              type="button"
              disabled={runningTask !== null}
              onClick={() => generate(action.task)}
              className="group rounded-md border border-border bg-background px-3 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                {isRunning ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <Icon aria-hidden="true" className="size-4 text-primary" />}
                {isRunning ? "Generating..." : action.label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">{action.description}</span>
            </button>
          );
        })}
      </div>

      {error ? <p className="mt-4 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-950 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-50">{error}</p> : null}

      {result ? (
        <div className="mt-5 rounded-md border border-border bg-background p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold">Generated draft</p>
            <div className="flex gap-2">
              <button type="button" onClick={copyResult} className="inline-flex h-8 items-center gap-2 rounded-md border border-border px-3 text-xs font-semibold hover:bg-muted">
                {copied ? <Check aria-hidden="true" className="size-3.5" /> : <Clipboard aria-hidden="true" className="size-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              {onAppendToContent ? (
                <button
                  type="button"
                  onClick={() => onAppendToContent(result)}
                  className="inline-flex h-8 items-center gap-2 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground"
                >
                  <PlusCircle aria-hidden="true" className="size-3.5" />
                  Append
                </button>
              ) : null}
            </div>
          </div>
          <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-muted/60 p-3 text-xs leading-6 text-foreground">
            {result}
          </pre>
        </div>
      ) : null}
    </section>
  );
}

