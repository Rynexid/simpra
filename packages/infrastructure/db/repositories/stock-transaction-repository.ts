import { db } from "@simpra/infrastructure/db";
import { stockTransactions } from "@simpra/infrastructure/db/schema";
import { eq, desc, count } from "drizzle-orm";
import type { StockTransaction, CreateStockTransactionInput } from "@simpra/domain/stock-operations";
import type { StockTransactionRepository } from "@simpra/application/stock-operations/stock-transaction-repository";

function mapRow(row: typeof stockTransactions.$inferSelect): StockTransaction {
  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
  };
}

export class DrizzleStockTransactionRepository implements StockTransactionRepository {
  async findById(id: string, organizationId: string): Promise<StockTransaction | null> {
    const [item] = await db
      .select()
      .from(stockTransactions)
      .where(eq(stockTransactions.id, id))
      .limit(1);
    if (!item || item.organizationId !== organizationId) return null;
    return mapRow(item);
  }

  async list(organizationId: string, params: { page: number; pageSize: number }): Promise<{ data: StockTransaction[]; total: number }> {
    const { page, pageSize } = params;
    const offset = (page - 1) * pageSize;

    const where = eq(stockTransactions.organizationId, organizationId);

    const [data, [{ total }]] = await Promise.all([
      db.select().from(stockTransactions).where(where).orderBy(desc(stockTransactions.createdAt)).limit(pageSize).offset(offset),
      db.select({ total: count() }).from(stockTransactions).where(where),
    ]);

    return { data: data.map(mapRow), total: Number(total) };
  }

  async create(input: CreateStockTransactionInput): Promise<StockTransaction> {
    const [item] = await db.insert(stockTransactions).values(input).returning();
    return mapRow(item);
  }
}
