# Getting Started

This guide walks you through setting up Simpra locally and connecting it to a PostgreSQL database.

## Prerequisites

- **Bun** >= 1.3
- **Node.js** >= 20
- **PostgreSQL** (local or Neon)

## Installation

```bash
bun install
```

## Environment variables

Copy `.env.example` to `.env` in the project root, or use the values provided during onboarding.

Required keys:
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_APP_URL`

## Run development servers

```bash
bun dev          # Next.js FE on :3000
bun run api:dev  # Hono API server on :3001
```

## Database migrations

```bash
bun run db:push
```

## Next steps

- Read [Architecture](/guide/architecture)
- Explore [Features](/features/)
- Review [API](/api/)
