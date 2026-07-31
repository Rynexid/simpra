import { db } from "@simpra/infrastructure/db";
import { purchaseOrders, purchaseOrderItems } from "@simpra/infrastructure/db/schema";
import { eq, and, desc, count, inArray } from "drizzle-orm";
import type {
  PurchaseOrder,
  PurchaseOrderItem,
  CreatePurchaseOrderInput,
  UpdatePurchaseOrderInput,
} from "@simpra/domain/purchasing";
import type { PurchaseOrderRepository } from "@simpra/application/purchasing/purchase-order-repository";

function mapItemRow(row: typeof purchaseOrderItems.$inferSelect): PurchaseOrderItem {
  return {
    id: row.id,
    purchaseOrderId: row.purchaseOrderId,
    inventoryItemId: row.inventoryItemId,
    quantity: row.quantity,
    unitPrice: row.unitPrice,
    receivedQuantity: row.receivedQuantity,
  };
}

function mapRow(row: typeof purchaseOrders.$inferSelect, items: PurchaseOrderItem[]): PurchaseOrder {
  return {
    id: row.id,
    organizationId: row.organizationId,
    supplierId: row.supplierId,
    orderNumber: row.orderNumber,
    status: row.status,
    expectedDate: row.expectedDate ? row.expectedDate.toISOString() : null,
    notes: row.notes,
    items,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

const SORT_COLUMNS = {
  created_at: purchaseOrders.createdAt,
  updated_at: purchaseOrders.updatedAt,
  order_number: purchaseOrders.orderNumber,
  expected_date: purchaseOrders.expectedDate,
  status: purchaseOrders.status,
} as const;

type SortColumn = keyof typeof SORT_COLUMNS;

export class DrizzlePurchaseOrderRepository implements PurchaseOrderRepository {
  async findById(id: string, organizationId: string): Promise<PurchaseOrder | null> {
    const [order] = await db
      .select()
      .from(purchaseOrders)
      .where(and(eq(purchaseOrders.id, id), eq(purchaseOrders.organizationId, organizationId)))
      .limit(1);

    if (!order) return null;

    const items = await this.findItemsByOrderId(order.id);
    return mapRow(order, items);
  }

  private async findItemsByOrderId(purchaseOrderId: string): Promise<PurchaseOrderItem[]> {
    const rows = await db
      .select()
      .from(purchaseOrderItems)
      .where(eq(purchaseOrderItems.purchaseOrderId, purchaseOrderId));
    return rows.map(mapItemRow);
  }

  async findByOrderNumber(orderNumber: string, organizationId: string): Promise<PurchaseOrder | null> {
    const [order] = await db
      .select()
      .from(purchaseOrders)
      .where(and(eq(purchaseOrders.orderNumber, orderNumber), eq(purchaseOrders.organizationId, organizationId)))
      .limit(1);

    if (!order) return null;

    const items = await this.findItemsByOrderId(order.id);
    return mapRow(order, items);
  }

  async list(
    organizationId: string,
    params: { page: number; pageSize: number; sort?: string }
  ): Promise<{ data: PurchaseOrder[]; total: number }> {
    const { page, pageSize, sort = "created_at" } = params;
    const offset = (page - 1) * pageSize;
    const sortColumn = SORT_COLUMNS[(sort as SortColumn) ?? "created_at"] ?? SORT_COLUMNS.created_at;

    const where = eq(purchaseOrders.organizationId, organizationId);

    const [orders, [{ total }]] = await Promise.all([
      db.select().from(purchaseOrders).where(where).orderBy(desc(sortColumn)).limit(pageSize).offset(offset),
      db.select({ total: count() }).from(purchaseOrders).where(where),
    ]);

    const itemsByOrderId = await this.findItemsForOrders(orders.map((o) => o.id));

    const data = orders.map((order) => mapRow(order, itemsByOrderId.get(order.id) ?? []));
    return { data, total: Number(total) };
  }

  private async findItemsForOrders(orderIds: string[]): Promise<Map<string, PurchaseOrderItem[]>> {
    if (orderIds.length === 0) return new Map();

    const rows = await db
      .select()
      .from(purchaseOrderItems)
      .where(inArray(purchaseOrderItems.purchaseOrderId, orderIds));

    const map = new Map<string, PurchaseOrderItem[]>();
    for (const row of rows) {
      const existing = map.get(row.purchaseOrderId) ?? [];
      existing.push(mapItemRow(row));
      map.set(row.purchaseOrderId, existing);
    }
    return map;
  }

  async create(input: CreatePurchaseOrderInput): Promise<PurchaseOrder> {
    const { items: inputItems, expectedDate, ...orderInput } = input;
    const [order] = await db.insert(purchaseOrders).values({
      ...orderInput,
      expectedDate: expectedDate ? new Date(expectedDate) : null,
    }).returning();

    if (inputItems && inputItems.length > 0) {
      await db.insert(purchaseOrderItems).values(
        inputItems.map((item) => ({
          purchaseOrderId: order.id,
          inventoryItemId: item.inventoryItemId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }))
      );
    }

    const items = await this.findItemsByOrderId(order.id);
    return mapRow(order, items);
  }

  async update(input: UpdatePurchaseOrderInput): Promise<PurchaseOrder> {
    const { id, organizationId, expectedDate, ...updates } = input;
    const [order] = await db
      .update(purchaseOrders)
      .set({
        ...updates,
        ...(expectedDate !== undefined
          ? { expectedDate: expectedDate ? new Date(expectedDate) : null }
          : {}),
      })
      .where(and(eq(purchaseOrders.id, id), eq(purchaseOrders.organizationId, organizationId)))
      .returning();

    const items = await this.findItemsByOrderId(order.id);
    return mapRow(order, items);
  }
}
