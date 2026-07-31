import { pgTable, uuid, varchar, text, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { organizations } from "./organizations";
import { suppliers } from "./suppliers";
import { inventoryItems } from "./inventory";

export const purchaseOrders = pgTable("purchase_orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  supplierId: uuid("supplier_id").notNull().references(() => suppliers.id, { onDelete: "cascade" }),
  orderNumber: varchar("order_number", { length: 50 }).notNull().unique(),
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  expectedDate: timestamp("expected_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const purchaseOrderItems = pgTable("purchase_order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  purchaseOrderId: uuid("purchase_order_id").notNull().references(() => purchaseOrders.id, { onDelete: "cascade" }),
  inventoryItemId: uuid("inventory_item_id").notNull().references(() => inventoryItems.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 12, scale: 2 }).notNull(),
  receivedQuantity: integer("received_quantity").notNull().default(0),
});
