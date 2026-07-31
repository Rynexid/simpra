import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { captcha, organization } from "better-auth/plugins";
import * as schema from "@simpra/infrastructure/db/schema";

const adapterSchema = { ...schema, organization: schema.organizations };

const db = drizzle(new Pool({ connectionString: process.env.DATABASE_URL }), {
  schema,
});

const plugins: Parameters<typeof betterAuth>[0]["plugins"] = [
  organization({
    schema: {
      organization: {
        additionalFields: {
          status: { type: "string", defaultValue: "active", required: false },
          defaultTimezone: { type: "string", defaultValue: "Asia/Jakarta", required: false },
          teamName: { type: "string", required: false },
          industry: { type: "string", required: false },
          companySize: { type: "string", required: false },
          currency: { type: "string", defaultValue: "IDR", required: false },
          preferences: { type: "json", defaultValue: {}, required: false },
          notificationSettings: { type: "json", defaultValue: {}, required: false },
        },
      },
    },
  }),
];

const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
if (turnstileSecret) {
  plugins.push(
    captcha({
      provider: "cloudflare-turnstile",
      secretKey: turnstileSecret,
      endpoints: ["/sign-up/email", "/sign-in/email"],
    })
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema: adapterSchema }),
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
  },
  plugins,
});
