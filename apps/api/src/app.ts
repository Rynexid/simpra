import { z } from "zod";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { swaggerUI } from "@hono/swagger-ui";
import { auth } from "./auth";

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

app.get("/openapi.json", async (c) => {
  return c.json(await (app as any).getOpenAPIDocument());
});

app.get("/docs", swaggerUI({ url: "/api/v1/openapi.json" }));

app.all("/auth/*", async (c) => {
  const url = new URL(c.req.url);
  url.pathname = url.pathname.replace(/^\/api\/v1\/auth/, "");
  const request = new Request(url.toString(), c.req.raw as Request);
  const response = await auth.handler(request);
  return response;
});

export default app;
