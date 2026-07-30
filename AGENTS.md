<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project

**Simpra** — Inventory & Warehouse Platform. Bun workspace monorepo with Clean Architecture.

```
simpra/
├── apps/
│   ├── web/     Next.js 16 (React 19, TS, Tailwind v4, shadcn/ui)
│   └── api/     Hono HTTP API
├── packages/
│   ├── domain/       Entities, value objects
│   ├── application/  Use cases, ports (repository interfaces)
│   ├── infrastructure DB (Drizzle), auth (Better Auth), R2, events, observability
│   └── shared/       Zod schemas, shared TS types
├── docs/       11 tracked docs (01–11)
└── infra/      Docker, Coolify config
```

## Commands

```bash
bun dev         # Next.js dev server on :3000
bun run api:dev # Hono API dev server on :3001
bun build       # production build (apps/web)
bun start       # production start (apps/web)
bun lint        # ESLint flat config on apps/web/src/
bun run typecheck # apps/web tsc --noEmit
bun run test    # vitest run (no config yet — see gotchas)
bun db:generate # drizzle-kit generate
bun db:migrate  # drizzle-kit migrate
bun db:push     # drizzle-kit push (dev)
bun db:studio   # drizzle-kit studio
```

## Entrypoints

### Web (`apps/web/`)
- Root layout: `apps/web/src/app/layout.tsx` (sidebar + topbar + cmdk)
- Routes are in **route groups**: `(dashboard)` and `(marketing)`. Group names are not part of the URL.
- Better Auth server: `apps/web/src/lib/auth.ts`; API route handler: `apps/web/src/app/api/auth/[...all]/route.ts`
- UI lib: `apps/web/src/components/ui/` (shadcn, base-nova style)
- Shared utility: `apps/web/src/lib/utils.ts` — `cn()` via `clsx` + `tailwind-merge`

### API (`apps/api/`)
- Entry: `apps/api/src/index.ts` → `apps/api/src/app.ts`
- Base path `/api/v1`, CORS + logger middleware
- Health check: `/api/v1/health`

### Packages
- Shared schemas: `packages/shared/validation/` (e.g. `organizationSchema`, `inventoryItemSchema`)
- DB schema: `packages/infrastructure/db/schema/*.ts`
- Migrations: `packages/infrastructure/db/migrations`

## Path Aliases

| Config file | `@/*` | `@simpra/*` |
|---|---|---|
| `apps/web/tsconfig.json` | `./src/*` | `../../packages/*` |
| root `tsconfig.json` | `./apps/web/src/*` | `./packages/*` |

Next.js resolves via `apps/web/tsconfig.json`. **Do not rely on root `tsconfig.json` `@/*` for web imports.** Monorepo packages (`@simpra/*`) are relative from each app's tsconfig.

## Key Gotchas

- **Next.js 16 + React 19** — preservethe `BEGIN:nextjs-agent-rules` / `END:nextjs-agent-rules` block exactly. Read `node_modules/next/dist/docs/` before writing code.
- **Route groups, not directories** — `(dashboard)` and `(marketing)` are route groups. Shared layouts/templates live inside them. Do not import from group directories expecting a re-exported page.
- **`apps/web/src/app/page.tsx` is deleted** — the marketing landing page moved to `(marketing)/page.tsx` in the working tree.
- **No test config files exist** — `vitest` and `playwright` are installed but `vitest.config.*` and `playwright.config.*` are absent. Do not run `bun test` until configs exist.
- **Tests need PostgreSQL** — CI test job starts an ephemeral `postgres:17-alpine` service with `DATABASE_URL`. Local tests need the same.
- **Conflicting `@/*` definitions** — root tsconfig vs web tsconfig differ. Use `@/*` only inside `apps/web/`; never mix root aliases into web imports.
- **shadcn/ui aliases must not have leading space** — `components.json` aliases and generated components use `"@/"` exactly. A leading space causes build-time "Module not found".
- **Partial Radix / base-ui migration** — many `@radix-ui/*` primitives remain in `package.json` and the codebase alongside `@base-ui/react`. Do not assume all interactive components use base-ui.
- **`apps/web/next-env.d.ts`** is auto-generated — do not edit.
- **ESLint flat config** — `apps/web/eslint.config.mjs` uses `eslint-config-next/core-web-vitals` + `typescript`. Covers only `apps/web/src/`. API is TypeScript-strict but not linted by `eslint-config-next`.
- **`apps/web/package.json`** has `ignoreScripts: ["sharp", "unrs-resolver"]` and `trustedDependencies: ["sharp", "unrs-resolver"]`.
- **Docker** — root `Dockerfile` for the monorepo; `apps/api/Dockerfile` for Hono API image. API listens on `3001`.
- **CI/CD** — `.github/workflows/ci.yml` runs `bun install --frozen-lockfile`, then lint, typecheck, and tests (with Postgres service).
- **11 of 20 docs done** — docs 01–11 are tracked; docs 12–20 (Testing Strategy, Future Expansion Strategy, Pricing Strategy, etc.) are pending.

## Repo Context

Standalone project inside `/home/riu/Projects/Monorepo/showcase/` alongside siblings (`Kanairo`, `mpro`, `Pulse`). Has its own `bun.lock` — it is **not** a parent workspace for those repos.