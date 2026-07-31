# Deployment

This guide covers deploying Simpra to production.

## Frontend (Vercel)

The Next.js frontend is deployed to Vercel.

- **Root directory**: `apps/web`
- **Install command**: `bun install`
- **Build command**: `next build`
- **Output**: auto-detected by Vercel

Required environment variables:
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_AUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

## Docs (Vercel)

The VitePress docs site is deployed as a static site to Vercel.

- **Root directory**: `apps/docs`
- **Install command**: `bun install`
- **Build command**: `npx vitepress build apps/docs`
- **Output directory**: `apps/docs/.vitepress/dist`

## Database (Neon)

Use Neon Postgres for hosted database.

- **Non-pooled**: for migrations and local dev
- **Pooled**: for Vercel Functions / serverless runtime
