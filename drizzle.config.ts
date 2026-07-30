import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./packages/infrastructure/db/schema/*.ts",
  out: "./packages/infrastructure/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
