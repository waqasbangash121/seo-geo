import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  GitBranch,
  Home,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import {
  githubAuthEnabled,
  localAuthEnabled,
  localCredentialsConfigured,
} from "@/lib/editor-session";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; signedOut?: string }>;
};

const errorMessages: Record<string, string> = {
  "sign-in-unavailable": "GitHub sign-in is not configured yet.",
  "invalid-sign-in-request": "Your sign-in request expired or was not valid. Please try again.",
  "github-sign-in-failed": "GitHub could not complete the sign-in request.",
  "not-authorized": "This GitHub account is not allowed to access the Content Studio.",
  "github-sign-in-disabled": "GitHub sign-in is disabled for this environment.",
  "invalid-local-credentials": "The username or password is incorrect.",
  "local-sign-in-disabled": "Local sign-in is disabled for this environment.",
  "local-sign-in-unavailable": "Local sign-in is not configured correctly.",
  "too-many-sign-in-attempts": "Too many failed attempts. Please wait 15 minutes and try again.",
};

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error, signedOut } = await searchParams;

  const localEnabled = localAuthEnabled();
  const githubEnabled = githubAuthEnabled();
  const localConfigured = localCredentialsConfigured();

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-6 lg:grid-cols-[minmax(0,1fr)_28rem]">
        <section className="hidden rounded-lg border border-border bg-surface p-7 shadow-sm lg:block">
          <div className="inline-flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck aria-hidden="true" className="size-6" />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Private workspace
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight">Hyper Content Studio</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Sign in to manage articles, comparisons, resources, SEO metadata, reviews, and GitHub-backed publishing.
          </p>

          <div className="mt-8 grid gap-3">
            {[
              "Create and edit content drafts",
              "Run keyword and metadata review",
              "Publish through the existing repository workflow",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold">
                <span className="inline-flex size-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-50">
                  <ShieldCheck aria-hidden="true" className="size-4" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-7">
          <div className="flex items-start gap-3">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
              <LockKeyhole aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Admin access
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Sign in to continue</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Use your configured local credentials or GitHub access to open the content workspace.
              </p>
            </div>
          </div>

          {error ? (
            <p className="mt-5 flex gap-3 rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-950 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-50">
              <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {errorMessages[error] ?? "Sign-in was not completed."}
            </p>
          ) : null}

          {!error && signedOut ? (
            <p className="mt-5 flex gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              You have been signed out.
            </p>
          ) : null}

          {localEnabled ? (
            localConfigured ? (
              <form action="/api/admin/auth/local" method="post" className="mt-7 grid gap-4">
                <label className="grid gap-2 text-sm font-semibold">
                  Username
                  <span className="relative">
                    <UserRound aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-3 text-sm outline-none ring-ring transition focus:ring-2"
                    />
                  </span>
                </label>

                <label className="grid gap-2 text-sm font-semibold">
                  Password
                  <span className="relative">
                    <LockKeyhole aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-3 text-sm outline-none ring-ring transition focus:ring-2"
                    />
                  </span>
                </label>

                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Sign in
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </form>
            ) : (
              <p className="mt-7 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-50">
                Local login is enabled but its server environment variables have not been configured.
              </p>
            )
          ) : null}

          {localEnabled && githubEnabled ? (
            <div className="my-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              Or
              <span className="h-px flex-1 bg-border" />
            </div>
          ) : null}

          {githubEnabled ? (
            <a
              href="/api/admin/auth/login"
              className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <GitBranch aria-hidden="true" className="size-4" />
              Continue with GitHub
            </a>
          ) : null}

          <Link
            href="/"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <Home aria-hidden="true" className="size-4" />
            Return to website
          </Link>
        </section>
      </div>
    </main>
  );
}







