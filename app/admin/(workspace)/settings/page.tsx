import { Database, KeyRound, Settings2, ShieldCheck, SlidersHorizontal } from "lucide-react";

import { AiSettingsForm } from "@/components/admin/ai-settings-form";
import { getAiSettingsSummary } from "@/lib/ai-settings";

const upcomingSettings = [
  {
    title: "Content defaults",
    description: "Set shared author, SEO, and drafting defaults for each content type.",
    Icon: SlidersHorizontal,
  },
  {
    title: "Publishing workflow",
    description: "Review publishing and deployment settings as the CMS migration progresses.",
    Icon: Database,
  },
];

export default async function AdminSettingsPage() {
  const aiSettings = await getAiSettingsSummary();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Settings2 aria-hidden="true" className="size-4 text-primary" />
              Workspace settings
            </span>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Control how Content Studio works.</h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Manage the secure integrations and shared workspace preferences that power drafting, review, and publishing.
            </p>
          </div>
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
            <ShieldCheck aria-hidden="true" className="size-6" />
          </span>
        </div>
      </section>

      <section aria-labelledby="ai-settings-heading">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <KeyRound aria-hidden="true" className="size-4 text-primary" />
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">AI settings</p>
          </div>
          <h2 id="ai-settings-heading" className="mt-2 text-2xl font-semibold tracking-tight">
            Bring your own OpenAI key.
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            The saved key is used only by authenticated server-side Content Studio requests. It is not included in browser code, public pages, or GitHub content.
          </p>
        </div>
        <AiSettingsForm initialSettings={aiSettings} />
      </section>

      <section aria-labelledby="workspace-settings-heading" className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Workspace roadmap</p>
          <h2 id="workspace-settings-heading" className="mt-2 text-xl font-semibold tracking-tight">
            More shared settings will live here.
          </h2>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {upcomingSettings.map(({ title, description, Icon }) => (
            <article key={title} className="rounded-md border border-border bg-background p-4">
              <span className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <h3 className="mt-4 text-sm font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
              <span className="mt-4 inline-flex rounded-md border border-border px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                Planned next
              </span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
