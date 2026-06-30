import Link from "next/link";

import {
  githubAuthEnabled,
  localAuthEnabled,
  localCredentialsConfigured,
} from "@/lib/editor-session";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
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
  const { error } = await searchParams;

  const localEnabled = localAuthEnabled();
  const githubEnabled = githubAuthEnabled();
  const localConfigured = localCredentialsConfigured();

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10 text-foreground">
      <section className="w-full max-w-md rounded-2xl border border-border bg-surface p-7 shadow-[0_20px_45px_-28px_hsl(var(--shadow)/0.65)] sm:p-9">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
          Private workspace
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Hyper Content Studio</h1>

        <p className="mt-4 leading-7 text-muted-foreground">
          Sign in to create drafts, generate content ideas, publish pages, and manage SEO metadata.
        </p>

        {error ? (
          <p className="mt-5 rounded-lg border border-rose-300 bg-rose-50 p-4 text-sm text-rose-950 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-100">
            {errorMessages[error] ?? "Sign-in was not completed."}
          </p>
        ) : null}

        {localEnabled ? (
          localConfigured ? (
            <form action="/api/admin/auth/local" method="post" className="mt-7 grid gap-4">
              <label className="grid gap-2 text-sm font-medium">
                Username
                <input
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="rounded-lg border border-border bg-background px-4 py-3 outline-none ring-ring transition focus:ring-2"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Password
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="rounded-lg border border-border bg-background px-4 py-3 outline-none ring-ring transition focus:ring-2"
                />
              </label>

              <button
                type="submit"
                className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Sign in
              </button>
            </form>
          ) : (
            <p className="mt-7 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-100">
              Local login is enabled but its server environment variables have not been configured.
            </p>
          )
        ) : null}

        {localEnabled && githubEnabled ? (
          <div className="my-7 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            Or continue with
            <span className="h-px flex-1 bg-border" />
          </div>
        ) : null}

        {githubEnabled ? (
          <a
            href="/api/admin/auth/login"
            className="mt-7 inline-flex w-full items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Continue with GitHub
          </a>
        ) : null}

        <Link
          href="/"
          className="mt-6 block text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Return to website
        </Link>
      </section>
    </main>
  );
}
