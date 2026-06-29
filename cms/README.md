# Hyper Strapi CMS

This is a **self-hosted Strapi Community Edition** project. It uses no Docker, no Strapi Cloud, no paid plugins, and no paid hosting add-ons.

## What it powers

- `Blog Post` entries at `https://www.niagarat.com/blog/[slug]`
- `Page` entries at `https://www.niagarat.com/pages/[slug]`
- Editor-managed SEO fields, Open Graph fields, canonical URLs, JSON-LD, and optional Article schema

The public Next.js website reads published content server-side. Editors never need Git, Vercel, Bitbucket, or terminal commands to publish content.

## Requirements

- Node.js 22 LTS
- npm 10 or later
- PostgreSQL 14 or later on a machine you control
- A public HTTPS hostname for the CMS, for example `cms.yourdomain.com`
- An always-on server or computer for production

## Local development setup

1. Create a PostgreSQL database and a dedicated database user.
2. Copy `.env.example` to `.env` and replace every placeholder with unique local values.
3. Install dependencies and start Strapi:

```bash
cd cms
npm install
npm run develop
```

4. Open `http://localhost:1337/admin` and create the first administrator account.
5. Confirm the two content types exist: **Blog Post** and **Page**.

## Security setup

1. Keep the Strapi **Public** role without permissions for Blog Post or Page. The public API must remain closed.
2. In **Settings → API Tokens**, create a read-only token for the Next.js website. Grant only `find` and `findOne` to Blog Post and Page.
3. Set this value as `STRAPI_API_TOKEN` in the Next.js deployment environment. Never expose it through a `NEXT_PUBLIC_` variable.
4. Give non-technical writers an Editor-level Strapi admin account. Do not share the super-admin login.
5. Do not place a public website link to `cms.yourdomain.com/admin`.
6. Recommended free hardening: add HTTP Basic Auth or IP allowlisting for `/admin` in your self-hosted reverse proxy.

## Immediate publish flow

Set up one Strapi webhook in **Settings → Webhooks**:

- **URL:** `https://www.niagarat.com/api/revalidate`
- **Events:** `entry.publish`, `entry.update`, and `entry.unpublish`
- **Models:** Blog Post and Page

`cms/config/server.js` sends the `X-CMS-Webhook-Secret` header automatically. Its `CMS_WEBHOOK_SECRET` must be exactly the same value as `STRAPI_REVALIDATE_SECRET` in the Next.js environment.

Once configured, publishing in Strapi updates the database and calls the Next.js revalidation route. The public blog list, post page, supporting pages, and sitemap refresh without a Git push or Vercel redeploy. The CMS content routes use fresh server reads, so the next public request sees the current published data.

## Search-engine protection

The CMS domain serves this `robots.txt`:

```txt
User-agent: *
Disallow: /admin/
Disallow: /api/
```

The custom `global::noindex` middleware also adds this response header to `/admin` and `/api` responses:

```txt
X-Robots-Tag: noindex, nofollow, noarchive
```

Verify after deployment:

```bash
curl -I https://cms.yourdomain.com/admin
curl -I https://cms.yourdomain.com/api/blog-posts
curl https://cms.yourdomain.com/robots.txt
```

## Production process

Build and run Strapi directly as a Node.js service:

```bash
cd cms
npm ci
npm run build
npm run start
```

Use your operating system's service manager to keep the process running after reboots. Place an HTTPS reverse proxy such as Caddy or Nginx in front of Strapi, terminate TLS there, and route `cms.yourdomain.com` to port `1337`.

## Backups

Back up PostgreSQL regularly and retain a copy of uploaded media from the Strapi uploads directory. These are the only CMS data stores required for recovery.
