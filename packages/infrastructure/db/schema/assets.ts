import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { organizations } from "./organizations";
import { warehouses } from "./warehouses";
import { user } from "./better-auth";

export const assets = pgTable("assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  warehouseId: uuid("warehouse_id").references(() => warehouses.id, { onDelete: "set null" }),
  name: varchar("name", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("in_use"),
  assignedTo: text("assigned_to").references(() => user.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
