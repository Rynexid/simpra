import { pgTable, uuid, varchar, numeric, text, timestamp } from "drizzle-orm/pg-core";
import { organizations } from "./organizations";
import { warehouses } from "./warehouses";
import { inventoryItems } from "./inventory";
import { user } from "./better-auth";

export const stockOpnameSessions = pgTable("stock_opname_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  warehouseId: uuid("warehouse_id").notNull().references(() => warehouses.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 20 }).notNull().default("in_progress"),
  createdBy: text("created_by").notNull().references(() => user.id, { onDelete: "cascade" }),
  finalizedBy: text("finalized_by").references(() => user.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  finalizedAt: timestamp("finalized_at"),
});

export const stockOpnameLines = pgTable("stock_opname_lines", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id").notNull().references(() => stockOpnameSessions.id, { onDelete: "cascade" }),
  inventoryItemId: uuid("inventory_item_id").notNull().references(() => inventoryItems.id, { onDelete: "cascade" }),
  systemQuantity: numeric("system_quantity", { precision: 18, scale: 4 }).notNull(),
  countedQuantity: numeric("counted_quantity", { precision: 18, scale: 4 }).notNull(),
  resultingTransactionId: text("resulting_transaction_id").references(() => organizations.id, { onDelete: "set null" }),
});
