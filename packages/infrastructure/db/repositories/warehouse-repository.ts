import { db } from "@simpra/infrastructure/db";
import { warehouses } from "@simpra/infrastructure/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Warehouse, CreateWarehouseInput, UpdateWarehouseInput } from "@simpra/domain/warehouses";
import type { WarehouseRepository } from "@simpra/application/warehouses/warehouse-repository";

function mapRow(row: typeof warehouses.$inferSelect): Warehouse {
  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
  };
}

export class DrizzleWarehouseRepository implements WarehouseRepository {
  async findById(id: string, organizationId: string): Promise<Warehouse | null> {
    const [item] = await db.select().from(warehouses).where(eq(warehouses.id, id)).limit(1);
    if (!item || item.organizationId !== organizationId) return null;
    return mapRow(item);
  }

  async findByCode(code: string, organizationId: string): Promise<Warehouse | null> {
    const [item] = await db
      .select()
      .from(warehouses)
      .where(eq(warehouses.code, code))
      .limit(1);
    if (!item || item.organizationId !== organizationId) return null;
    return mapRow(item);
  }

  async list(organizationId: string): Promise<Warehouse[]> {
    const items = await db.select().from(warehouses).where(eq(warehouses.organizationId, organizationId)).orderBy(desc(warehouses.createdAt));
    return items.map(mapRow);
  }

  async create(input: CreateWarehouseInput): Promise<Warehouse> {
    const [item] = await db.insert(warehouses).values(input).returning();
    return mapRow(item);
  }

  async update(input: UpdateWarehouseInput): Promise<Warehouse> {
    const { id, organizationId, ...updates } = input;
    const existing = await db.select().from(warehouses).where(eq(warehouses.id, id)).limit(1);
    if (!existing[0] || existing[0].organizationId !== organizationId) {
      throw new Error("Warehouse not found");
    }
    const [item] = await db.update(warehouses).set(updates).where(eq(warehouses.id, id)).returning();
    return mapRow(item);
  }
}
