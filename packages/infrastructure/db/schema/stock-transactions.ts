import { pgTable, uuid, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";
import { organizations } from "./organizations";
import { inventoryItems } from "./inventory";
import { warehouses } from "./warehouses";

export const stockTransactions = pgTable("stock_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  inventoryItemId: uuid("inventory_item_id").notNull().references(() => inventoryItems.id, { onDelete: "cascade" }),
  warehouseId: uuid("warehouse_id").notNull().references(() => warehouses.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 20 }).notNull(),
  quantity: integer("quantity").notNull(),
  referenceNumber: varchar("reference_number", { length: 100 }),
  reasonCode: varchar("reason_code", { length: 100 }),
  note: text("note"),
  performedBy: varchar("performed_by", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
