import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { organizations } from "./organizations";
import { user } from "./better-auth";

export const approvalRequests = pgTable("approval_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  entityType: varchar("entity_type", { length: 100 }).notNull(),
  entityId: uuid("entity_id").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  requestedBy: text("requested_by").notNull().references(() => user.id, { onDelete: "cascade" }),
  decidedBy: text("decided_by").references(() => user.id, { onDelete: "set null" }),
  decidedAt: timestamp("decided_at"),
  comment: text("comment"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
