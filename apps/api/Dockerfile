FROM oven/bun:1.3

WORKDIR /app

COPY bun.lockb package.json* ./
RUN bun install --frozen-lockfile

COPY apps/api/ apps/api/
COPY packages/ packages/
COPY tsconfig.json tsconfig.json

EXPOSE 3001

CMD ["bun", "run", "dev"]
