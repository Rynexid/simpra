<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project

**Simpra** — Inventory & Warehouse Platform. Modular Monolith with Clean Architecture.

- Next.js 16 App Router (React 19, TypeScript, Tailwind CSS v4, shadcn/ui) at `apps/web/`
- Hono HTTP API in `apps/api/`
- Bun workspace monorepo with `apps/` and `packages/`

## Architecture (per SAD Doc #5)

```
simpra/
├── apps/
│   ├── web/          Next.js 16 (Presentation)
│   └── api/          Hono HTTP API (Presentation)
├── packages/
│   ├── domain/       Entities, value objects (inventory, stock-ops, procurement, governance, identity)
│   ├── application/  Use cases, ports (repository interfaces)
│   ├── infrastructure DB (Drizzle), auth (Better Auth), storage (R2), events, observability
│   └── shared/       Zod validation schemas, shared TypeScript types
├── docs/             20-doc specification suite (11 done)
├── infra/            Docker, Coolify config
└── .github/workflows CI/CD pipelines
```

## Stack & Config

- **Package manager:** bun (`bun.lock` present, workspaces via `apps/*` and `packages/*`)
- **React Compiler:** enabled in `apps/web/next.config.ts`
- **Path aliases:** `@/*` → `./apps/web/src/*` (apps/web tsconfig); `@simpra/*` → `./packages/*`
- **shadcn/ui:** style `base-nova`, RSC, TSX, lucide icons, aliases in `components.json`
- **UI components:** `apps/web/src/components/ui/` (shadcn-generated, 26+ components)
- **Design system:** Dark mode default, Simpra green primary (`oklch 0.488 0.243 155`), design tokens in `apps/web/src/app/globals.css`
- **App entry:** `apps/web/src/app/layout.tsx` (sidebar + topbar + cmdk)
- **Public page:** `apps/web/src/app/page.tsx`
- **Utilities:** `apps/web/src/lib/utils.ts` — `cn()` wrapper using `clsx` + `tailwind-merge`
- **Auth:** Better Auth (multi-tenant, organization-scoped)
- **Database:** PostgreSQL via Drizzle ORM (`postgres` driver)
- **Validation:** Zod schemas in `packages/shared/validation/` with `z.infer<>` for TS types

## Commands

```bash
bun dev           # dev Next.js server on :3000 (apps/web)
bun build         # production build of apps/web
bun start         # production start
bun lint          # eslint on apps/web/src/
bun run test      # vitest tests (once configured)
bun db:generate   # drizzle-kit generate
bun db:migrate    # drizzle-kit migrate
bun db:push       # drizzle-kit push (dev)
bun db:studio     # drizzle-kit studio
```

## Key Gotchas

- **Next.js 16 + React 19 stack** — the AI rules header at top of this file must be preserved; APIs differ from standard Next.js
- **Path alias `@/*` must match exactly** — no leading space in tsconfig.json or imports
- **`components.json`** aliases and **all shadcn-generated components** must use `"@/…"` without leading space — causes "Module not found" at build time
- **Migrated from Radix UI to `@base-ui/react`** — prop names differ (e.g., `delay` not `delayDuration`)
- **Monorepo path aliases** — `@simpra/shared/*` etc. use relative paths from each app's tsconfig (`../../packages/*`)
- **No test config files exist yet** — `vitest.config.*` and `playwright.config.*` are absent; add them before writing tests
- **`apps/web/next-env.d.ts`** is auto-generated — do not edit it manually
- **ESLint** uses flat config (`eslint.config.mjs`) with `eslint-config-next` plugin overrides; covers apps/web only (API is TypeScript-strict but not eslint-config-next)
- **apps/web/tsconfig.json** includes path mappings for both `@/…` (local) and `@simpra/…` (workspace packages)
- **Docker** — root `Dockerfile` for monorepo; `apps/api/Dockerfile` for Hono API separately
- **CI/CD** — GitHub Actions workflow at `.github/workflows/ci.yml` covers lint, typecheck, and tests with ephemeral PostgreSQL
- **11 of 20 docs done** — docs 01–11 exist; docs 12–20 (Testing Strategy, Future Expansion Strategy, Pricing Strategy, etc.) are pending

## Repo Context

Simpra sits inside `/home/riu/Projects/Monorepo/showcase/` alongside sibling projects (`Kanairo`, `mpro`, `Pulse`), but it is standalone with its own lockfile — not a workspace.