import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";

export const organizations = pgTable("organizations", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  logo: text("logo"),
  status: varchar("status", { length: 20 }).notNull().default("active"),
  defaultTimezone: varchar("default_timezone", { length: 100 }).notNull().default("Asia/Jakarta"),
  teamName: text("team_name"),
  industry: text("industry"),
  companySize: text("company_size"),
  currency: varchar("currency", { length: 3 }).notNull().default("IDR"),
  preferences: jsonb("preferences").notNull().default({}),
  notificationSettings: jsonb("notification_settings").notNull().default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
