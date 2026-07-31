import { pgTable, uuid, numeric, text, timestamp } from "drizzle-orm/pg-core";
import { organizations } from "./organizations";
import { inventoryItems } from "./inventory";
import { warehouses } from "./warehouses";

export const stockLevels = pgTable("stock_levels", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  inventoryItemId: uuid("inventory_item_id").notNull().references(() => inventoryItems.id, { onDelete: "cascade" }),
  warehouseId: uuid("warehouse_id").notNull().references(() => warehouses.id, { onDelete: "cascade" }),
  quantity: numeric("quantity", { precision: 18, scale: 4 }).notNull().default("0"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
