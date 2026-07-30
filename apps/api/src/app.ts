import { z } from "zod";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new OpenAPIHono().basePath("/api/v1");

app.use("*", cors());
app.use("*", logger());

const healthSchema = z.object({
  status: z.literal("ok"),
  timestamp: z.string(),
});

const healthRoute = createRoute({
  method: "get",
  path: "/health",
  tags: ["Health"],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: healthSchema,
        },
      },
      description: "Health check",
    },
  },
});

app.openapi(healthRoute, async (c) => {
  return c.json({
    status: "ok" as const,
    timestamp: new Date().toISOString(),
  });
});

export default app;
