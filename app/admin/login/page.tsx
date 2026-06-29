import Link from "next/link";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const errorMessages: Record<string, string> = {
  "sign-in-unavailable": "GitHub sign-in is not configured yet.",
  "invalid-sign-in-request": "Your sign-in request expired. Please try again.",
  "github-sign-in-failed": "GitHub could not complete the sign-in request.",
  "not-authorized": "This GitHub account is not allowed to access the blog editor.",
};

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10 text-foreground">
      <section className="w-full max-w-md rounded-2xl border border-border bg-surface p-7 shadow-[0_20px_45px_-28px_hsl(var(--shadow)/0.65)] sm:p-9">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Private workspace</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Hyper Blog Editor</h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          Sign in with an approved GitHub account to create drafts, publish articles, and update SEO metadata.
        </p>

        {error ? (
          <p className="mt-5 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">
            {errorMessages[error] ?? "Sign-in was not completed."}
          </p>
        ) : null}

        <a
          href="/api/admin/auth/login"
          className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Continue with GitHub
        </a>

        <Link href="/blog" className="mt-6 block text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          Return to the public blog
        </Link>
      </section>
    </main>
  );
}
