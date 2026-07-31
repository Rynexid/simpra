import { pgTable, uuid, varchar, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { organizations } from "./organizations";

export const inventoryItems = pgTable("inventory_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  sku: varchar("sku", { length: 100 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }),
  unitOfMeasure: varchar("unit_of_measure", { length: 50 }).notNull(),
  barcode: varchar("barcode", { length: 100 }),
  reorderThreshold: integer("reorder_threshold"),
  currentStock: integer("current_stock").notNull().default(0),
  isArchived: boolean("is_archived").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
