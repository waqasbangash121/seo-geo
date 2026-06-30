"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";

type ContentType = "blog" | "comparison" | "resource";

type DeleteContentButtonProps = {
  type: ContentType;
  slug: string;
  title: string;
  redirectTo: string;
  compact?: boolean;
};

function contentLabel(type: ContentType): string {
  if (type === "blog") return "article";
  return type;
}

export function DeleteContentButton({
  type,
  slug,
  title,
  redirectTo,
  compact = false,
}: DeleteContentButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const label = contentLabel(type);
  const confirmed = confirmation === "DELETE";

  function close() {
    if (deleting) return;
    setOpen(false);
    setConfirmation("");
    setError("");
  }

  async function remove() {
    if (!confirmed || deleting) return;

    setDeleting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/content/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, slug }),
      });
      const body = await response.json() as { error?: string };

      if (!response.ok) {
        throw new Error(body.error || `The ${label} could not be deleted.`);
      }

      router.push(redirectTo);
      router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : `The ${label} could not be deleted.`);
      setDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          compact
            ? "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 text-sm font-semibold text-rose-800 transition-colors hover:border-rose-300 hover:bg-rose-100 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-100 dark:hover:bg-rose-400/15"
            : "inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-800 transition-colors hover:border-rose-300 hover:bg-rose-100 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-100 dark:hover:bg-rose-400/15"
        }
      >
        <Trash2 aria-hidden="true" className="size-4" />
        Delete {label}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm" role="presentation">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-content-title"
            className="w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex size-11 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-100">
                <AlertTriangle aria-hidden="true" className="size-5" />
              </span>
              <button
                type="button"
                onClick={close}
                disabled={deleting}
                className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed"
                aria-label="Close deletion confirmation"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>

            <h2 id="delete-content-title" className="mt-5 text-xl font-semibold tracking-tight">
              Delete this {label}?
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              <span className="font-semibold text-foreground">{title}</span> will be removed from Neon and its public page will be revalidated immediately.
            </p>
            <p className="mt-3 rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
              Slug: <span className="font-mono text-foreground">{slug}</span>
            </p>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              This action removes the active content record. Restore it only from a database backup.
            </p>

            <label className="mt-5 grid gap-2 text-sm font-semibold">
              Type <span className="font-mono text-rose-700 dark:text-rose-200">DELETE</span> to confirm
              <input
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                disabled={deleting}
                autoComplete="off"
                className="h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none ring-ring transition focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>

            {error ? (
              <p className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-3 text-sm text-rose-950 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-50">
                {error}
              </p>
            ) : null}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={close}
                disabled={deleting}
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={remove}
                disabled={!confirmed || deleting}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-rose-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-rose-500 dark:text-slate-950 dark:hover:bg-rose-400"
              >
                {deleting ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <Trash2 aria-hidden="true" className="size-4" />}
                {deleting ? "Deleting..." : `Delete ${label}`}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
