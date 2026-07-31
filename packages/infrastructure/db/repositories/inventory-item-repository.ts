import { db } from "@simpra/infrastructure/db";
import { inventoryItems } from "@simpra/infrastructure/db/schema";
import { eq, and, desc, count } from "drizzle-orm";
import type { InventoryItem, CreateInventoryItemInput, UpdateInventoryItemInput } from "@simpra/domain/inventory";
import type { InventoryItemRepository } from "@simpra/application/inventory/inventory-item-repository";

function mapRow(row: typeof inventoryItems.$inferSelect): InventoryItem {
  return {
    id: row.id,
    organizationId: row.organizationId,
    sku: row.sku,
    name: row.name,
    category: row.category,
    unitOfMeasure: row.unitOfMeasure,
    barcode: row.barcode,
    reorderThreshold: row.reorderThreshold,
    currentStock: row.currentStock,
    isArchived: row.isArchived,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

const SORT_COLUMNS = {
  created_at: inventoryItems.createdAt,
  updated_at: inventoryItems.updatedAt,
  name: inventoryItems.name,
  sku: inventoryItems.sku,
} as const;

type SortColumn = keyof typeof SORT_COLUMNS;

export class DrizzleInventoryItemRepository implements InventoryItemRepository {
  async findById(id: string, organizationId: string): Promise<InventoryItem | null> {
    const [item] = await db
      .select()
      .from(inventoryItems)
      .where(and(eq(inventoryItems.id, id), eq(inventoryItems.organizationId, organizationId)))
      .limit(1);
    return item ? mapRow(item) : null;
  }

  async findBySku(sku: string, organizationId: string): Promise<InventoryItem | null> {
    const [item] = await db
      .select()
      .from(inventoryItems)
      .where(and(eq(inventoryItems.sku, sku), eq(inventoryItems.organizationId, organizationId)))
      .limit(1);
    return item ? mapRow(item) : null;
  }

  async findByBarcode(barcode: string, organizationId: string): Promise<InventoryItem | null> {
    const [item] = await db
      .select()
      .from(inventoryItems)
      .where(and(eq(inventoryItems.barcode, barcode), eq(inventoryItems.organizationId, organizationId)))
      .limit(1);
    return item ? mapRow(item) : null;
  }

  async list(
    organizationId: string,
    params: { page: number; pageSize: number; sort?: string }
  ): Promise<{ data: InventoryItem[]; total: number }> {
    const { page, pageSize, sort = "created_at" } = params;
    const offset = (page - 1) * pageSize;
    const sortColumn = SORT_COLUMNS[(sort as SortColumn) ?? "created_at"] ?? SORT_COLUMNS.created_at;

    const where = eq(inventoryItems.organizationId, organizationId);

    const [data, [{ total }]] = await Promise.all([
      db.select().from(inventoryItems).where(where).orderBy(desc(sortColumn)).limit(pageSize).offset(offset),
      db.select({ total: count() }).from(inventoryItems).where(where),
    ]);

    return { data: data.map(mapRow), total: Number(total) };
  }

  async create(input: CreateInventoryItemInput): Promise<InventoryItem> {
    const [item] = await db.insert(inventoryItems).values({
      ...input,
      currentStock: 0,
    }).returning();
    return mapRow(item);
  }

  async update(input: UpdateInventoryItemInput): Promise<InventoryItem> {
    const { id, organizationId, ...updates } = input;
    const [item] = await db
      .update(inventoryItems)
      .set(updates)
      .where(and(eq(inventoryItems.id, id), eq(inventoryItems.organizationId, organizationId)))
      .returning();
    return mapRow(item);
  }

  async archive(id: string, organizationId: string): Promise<void> {
    await db.update(inventoryItems).set({ isArchived: true }).where(and(eq(inventoryItems.id, id), eq(inventoryItems.organizationId, organizationId)));
  }
}
