# Neon CMS foundation

This branch introduces the database schema and server-only helpers needed to move Content Studio from GitHub/MDX to Neon PostgreSQL.

## Scope of this phase

- Adds the future CMS tables for content, revisions, workspace settings, and encrypted settings secrets.
- Adds a server-only Neon database client.
- Adds AES-256-GCM helpers for encrypting future user API keys before storage.
- Does **not** change public pages, the admin editor, GitHub publishing, or the current AI generator yet.

## Required environment variables

```env
DATABASE_URL="postgresql://..."
SETTINGS_ENCRYPTION_KEY="base64-encoded-32-byte-secret"
```

`SETTINGS_ENCRYPTION_KEY` is an application secret. It is not an OpenAI API key and must not be changed after encrypted secrets have been stored, unless those secrets are first decrypted and re-encrypted with the new key.

Generate it once with:

```bash
openssl rand -base64 32
```

## Local setup

Install the dependencies:

```bash
pnpm add @neondatabase/serverless drizzle-orm
pnpm add -D drizzle-kit dotenv
```

Add the environment variables to `.env.local`. Never commit `.env.local`.

Generate the first migration from `db/schema.ts`:

```bash
pnpm db:generate
```

Review the generated SQL under `db/migrations/`, then run it against the Neon database:

```bash
pnpm db:migrate
```

Check that the tables exist with:

```bash
pnpm db:studio
```

## Deployment setup

Add the same two variables to Vercel for Preview and Production:

- `DATABASE_URL`
- `SETTINGS_ENCRYPTION_KEY`

Do not use a `NEXT_PUBLIC_` prefix for either variable.

## Next phase

After the migration succeeds, the next change adds `/admin/settings`, stores an encrypted OpenAI API key in `workspace_secrets`, and updates the AI generation route to use the stored workspace key.
