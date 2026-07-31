# Architecture

Simpra uses a **Bun workspace monorepo** with **Clean Architecture** to keep domain logic independent from frameworks and infrastructure.

## Monorepo structure

```
simpra/
├── apps/
│   ├── web/     Next.js 16 (React 19, TS, Tailwind v4, shadcn/ui)
│   └── docs/    VitePress documentation site
├── packages/
│   ├── domain/       Entities, value objects
│   ├── application/  Use cases, ports (repository interfaces)
│   ├── infrastructure DB (Drizzle), auth (Better Auth), R2, events, observability
│   ├── shared/       Zod schemas, shared TS types
│   └── ui/           shadcn/ui components (base-ui), hooks, lib/utils
├── docs/       11 tracked docs (01–11)
└── infra/      Docker, Coolify config
```

## Layers

| Layer | Location | Responsibility |
|---|---|---|
| **Presentation** | `apps/web` | Next.js routes, pages, server actions, UI |
| **Application** | `packages/application` | Use cases, orchestration, ports |
| **Domain** | `packages/domain` | Entities, value objects, domain services |
| **Infrastructure** | `packages/infrastructure` | DB (Drizzle), auth (Better Auth), R2, events |

## Key decisions

- **FE and docs are deployable independently**
- **Auth runs on the web app** via Better Auth server routes
- **UI components live in `packages/ui`** as a shared package
- **No Radix UI** — base-ui only
- **Tailwind v4** with CSS tokens in `apps/web/src/app/globals.css`
