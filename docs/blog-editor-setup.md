# Vercel Blog Editor setup

The blog editor is a private Next.js workspace at `/admin`. It uses two GitHub integrations:

1. A GitHub OAuth App identifies the person signing in.
2. A GitHub App writes only blog content files to this repository.

No personal access token is required.

## 1. Create the GitHub OAuth App

In GitHub, open **Settings → Developer settings → OAuth Apps → New OAuth App**.

Use these production values:

```text
Application name: Hyper Blog Editor
Homepage URL: https://www.niagarat.com
Authorization callback URL: https://www.niagarat.com/api/admin/auth/callback
```

Copy the generated Client ID. Generate a Client Secret and keep it private.

For local development, create a second OAuth App with this callback URL:

```text
http://localhost:3000/api/admin/auth/callback
```

## 2. Create the GitHub App

In GitHub, open **Settings → Developer settings → GitHub Apps → New GitHub App**.

Use:

```text
GitHub App name: Hyper Blog Publisher
Homepage URL: https://www.niagarat.com
Webhook: inactive
```

Repository permissions:

```text
Contents: Read and write
Metadata: Read-only
```

Do not enable broad organization permissions, issues, pull requests, or webhooks.

Create the app, generate a private key, then install the app only on:

```text
waqasbangash121/seo-geo
```

Record the App ID and Installation ID. Base64 encode the downloaded private-key PEM file before adding it to Vercel:

```bash
base64 -w 0 private-key.pem
```

On macOS, use:

```bash
base64 < private-key.pem | tr -d '\n'
```

## 3. Add Vercel environment variables

In the Vercel project, add the following under **Production**. Add separate local-development values to `.env.local` and never commit that file.

```env
ADMIN_GITHUB_CLIENT_ID=your-oauth-client-id
ADMIN_GITHUB_CLIENT_SECRET=your-oauth-client-secret
ADMIN_GITHUB_CALLBACK_URL=https://www.niagarat.com/api/admin/auth/callback

ADMIN_SESSION_SECRET=generate-a-random-value-at-least-32-characters-long
ADMIN_ALLOWED_GITHUB_USERS=waqasbangash121

GITHUB_APP_ID=your-github-app-id
GITHUB_APP_INSTALLATION_ID=your-installation-id
GITHUB_APP_PRIVATE_KEY_BASE64=base64-encoded-private-key

GITHUB_REPO_OWNER=waqasbangash121
GITHUB_REPO_NAME=seo-geo
GITHUB_REPO_BRANCH=main
```

Generate `ADMIN_SESSION_SECRET` locally:

```bash
openssl rand -hex 32
```

Multiple editors can be allowed with a comma-separated list:

```env
ADMIN_ALLOWED_GITHUB_USERS=waqasbangash121,second-editor
```

## 4. Deploy and test

After the branch is merged into `main`, deploy it in Vercel. Then visit:

```text
https://www.niagarat.com/admin/login
```

Sign in with an allowed GitHub account. Create a draft article first, confirm a GitHub commit appears, then publish it. Vercel deploys the commit automatically.

## Security notes

- Keep OAuth and GitHub App credentials in Vercel only.
- Never use a `NEXT_PUBLIC_` prefix for any editor credential.
- The GitHub App should be installed on this repository only.
- The editor creates commits on `main`, so branch protection should allow the GitHub App to update that branch or use a dedicated publishing branch later.
- The `/admin` pages include a robots directive that prevents indexing.
