import { db } from "@simpra/infrastructure/db";
import { suppliers } from "@simpra/infrastructure/db/schema";
import { eq, and, desc, count } from "drizzle-orm";
import type { Supplier, CreateSupplierInput, UpdateSupplierInput } from "@simpra/domain/suppliers";
import type { SupplierRepository } from "@simpra/application/suppliers/supplier-repository";

function mapRow(row: typeof suppliers.$inferSelect): Supplier {
  return {
    id: row.id,
    organizationId: row.organizationId,
    name: row.name,
    contactName: row.contactName,
    email: row.email,
    phone: row.phone,
    address: row.address,
    category: row.category,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

const SORT_COLUMNS = {
  created_at: suppliers.createdAt,
  updated_at: suppliers.updatedAt,
  name: suppliers.name,
  status: suppliers.status,
} as const;

type SortColumn = keyof typeof SORT_COLUMNS;

export class DrizzleSupplierRepository implements SupplierRepository {
  async findById(id: string, organizationId: string): Promise<Supplier | null> {
    const [item] = await db
      .select()
      .from(suppliers)
      .where(and(eq(suppliers.id, id), eq(suppliers.organizationId, organizationId)))
      .limit(1);
    return item ? mapRow(item) : null;
  }

  async findByName(name: string, organizationId: string): Promise<Supplier | null> {
    const [item] = await db
      .select()
      .from(suppliers)
      .where(and(eq(suppliers.name, name), eq(suppliers.organizationId, organizationId)))
      .limit(1);
    return item ? mapRow(item) : null;
  }

  async list(
    organizationId: string,
    params: { page: number; pageSize: number; sort?: string }
  ): Promise<{ data: Supplier[]; total: number }> {
    const { page, pageSize, sort = "created_at" } = params;
    const offset = (page - 1) * pageSize;
    const sortColumn = SORT_COLUMNS[(sort as SortColumn) ?? "created_at"] ?? SORT_COLUMNS.created_at;

    const where = eq(suppliers.organizationId, organizationId);

    const [data, [{ total }]] = await Promise.all([
      db.select().from(suppliers).where(where).orderBy(desc(sortColumn)).limit(pageSize).offset(offset),
      db.select({ total: count() }).from(suppliers).where(where),
    ]);

    return { data: data.map(mapRow), total: Number(total) };
  }

  async create(input: CreateSupplierInput): Promise<Supplier> {
    const [item] = await db.insert(suppliers).values(input).returning();
    return mapRow(item);
  }

  async update(input: UpdateSupplierInput): Promise<Supplier> {
    const { id, organizationId, ...updates } = input;
    const [item] = await db
      .update(suppliers)
      .set(updates)
      .where(and(eq(suppliers.id, id), eq(suppliers.organizationId, organizationId)))
      .returning();
    return mapRow(item);
  }
}
