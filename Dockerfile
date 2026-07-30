FROM oven/bun:1.3 AS base

WORKDIR /app

COPY bun.lockb package.json* ./
RUN bun install --frozen-lockfile

COPY apps/web/ apps/web/
COPY apps/api/ apps/api/
COPY packages/ packages/
COPY tsconfig.json tsconfig.json
COPY postcss.config.mjs postcss.config.mjs
COPY eslint.config.mjs eslint.config.mjs
COPY next.config.ts next.config.ts
COPY components.json components.json
COPY .env.example .env.example

EXPOSE 3000

CMD ["bun", "run", "dev"]
