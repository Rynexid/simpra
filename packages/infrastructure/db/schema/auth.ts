import { pgTable, uuid, varchar, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { organizations } from "./organizations";

export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  permissions: jsonb("permissions").notNull().default([]),
  isSystemDefault: boolean("is_system_default").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userOrgMemberships = pgTable("user_org_memberships", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  roleId: uuid("role_id").references(() => roles.id),
  status: varchar("status", { length: 20 }).notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
