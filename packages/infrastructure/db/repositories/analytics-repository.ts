import { db } from "@simpra/infrastructure/db";
import { inventoryItems, stockTransactions, warehouses } from "@simpra/infrastructure/db/schema";
import { eq, sql, and, gte } from "drizzle-orm";
import type { AnalyticsRepository, KPISummary, CategoryDistribution, MonthlyTrend } from "@simpra/application/analytics";

function toMonthKey(date: Date): string {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export class DrizzleAnalyticsRepository implements AnalyticsRepository {
  async getKPISummary(organizationId: string): Promise<KPISummary> {
    const [stockOutResult, avgStockResult, positiveAdjResult, totalTxResult, totalStockResult, totalCapacityResult] = await Promise.all([
      db.select({ total: sql<number>`COALESCE(SUM(${stockTransactions.quantity}), 0)` }).from(stockTransactions).where(and(eq(stockTransactions.organizationId, organizationId), eq(stockTransactions.type, "stock_out"))),
      db.select({ total: sql<number>`AVG(${inventoryItems.currentStock})` }).from(inventoryItems).where(eq(inventoryItems.organizationId, organizationId)),
      db.select({ total: sql<number>`COUNT(*)` }).from(stockTransactions).where(and(eq(stockTransactions.organizationId, organizationId), eq(stockTransactions.type, "adjustment"), sql`${stockTransactions.quantity} > 0`)),
      db.select({ total: sql<number>`COUNT(*)` }).from(stockTransactions).where(eq(stockTransactions.organizationId, organizationId)),
      db.select({ total: sql<number>`COALESCE(SUM(${inventoryItems.currentStock}), 0)` }).from(inventoryItems).where(eq(inventoryItems.organizationId, organizationId)),
      db.select({ total: sql<number>`COALESCE(SUM(${warehouses.capacity}), 0)` }).from(warehouses).where(eq(warehouses.organizationId, organizationId)),
    ]);

    const stockOut = Number(stockOutResult[0]?.total ?? 0);
    const avgStock = Number(avgStockResult[0]?.total ?? 0);
    const inventoryTurnover = avgStock > 0 ? Number((stockOut / avgStock).toFixed(2)) : 0;

    const positiveAdjustments = Number(positiveAdjResult[0]?.total ?? 0);
    const totalTransactions = Number(totalTxResult[0]?.total ?? 0);
    const stockAccuracy = totalTransactions > 0 ? Number(((positiveAdjustments / totalTransactions) * 100).toFixed(2)) : 0;

    const totalStock = Number(totalStockResult[0]?.total ?? 0);
    const totalCapacity = Number(totalCapacityResult[0]?.total ?? 0);
    const utilizationPercentage = totalCapacity > 0 ? Number(((totalStock / totalCapacity) * 100).toFixed(2)) : 0;

    return {
      inventoryTurnover: {
        value: inventoryTurnover,
        period: "current",
      },
      stockAccuracy: {
        value: stockAccuracy,
        positiveAdjustments,
        totalTransactions,
      },
      warehouseUtilization: {
        totalStock,
        totalCapacity,
        utilizationPercentage,
      },
    };
  }

  async getCategoryDistribution(organizationId: string): Promise<CategoryDistribution[]> {
    const result = await db.select({
      category: inventoryItems.category,
      count: sql<number>`COUNT(*)`,
    }).from(inventoryItems).where(and(eq(inventoryItems.organizationId, organizationId), sql`${inventoryItems.category} IS NOT NULL`)).groupBy(inventoryItems.category);

    const total = result.reduce((sum, row) => sum + Number(row.count), 0);

    return result.map((row) => ({
      category: row.category as string,
      count: Number(row.count),
      percentage: total > 0 ? Number(((Number(row.count) / total) * 100).toFixed(2)) : 0,
    }));
  }

  async getMonthlyTrends(organizationId: string, months = 6): Promise<MonthlyTrend[]> {
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - months);

    const result = await db.select({
      month: sql<string>`TO_CHAR(${stockTransactions.createdAt}, 'YYYY-MM')`,
      stockIn: sql<number>`COALESCE(SUM(CASE WHEN ${stockTransactions.type} = 'stock_in' THEN ${stockTransactions.quantity} ELSE 0 END), 0)`,
      stockOut: sql<number>`COALESCE(SUM(CASE WHEN ${stockTransactions.type} = 'stock_out' THEN ${stockTransactions.quantity} ELSE 0 END), 0)`,
    }).from(stockTransactions).where(and(eq(stockTransactions.organizationId, organizationId), gte(stockTransactions.createdAt, cutoffDate))).groupBy(sql`TO_CHAR(${stockTransactions.createdAt}, 'YYYY-MM')`).orderBy(sql`TO_CHAR(${stockTransactions.createdAt}, 'YYYY-MM')`);

    const trends: MonthlyTrend[] = [];
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = toMonthKey(d);
      const found = result.find((r) => r.month === key);
      trends.push({
        month: key,
        stockIn: Number(found?.stockIn ?? 0),
        stockOut: Number(found?.stockOut ?? 0),
      });
    }

    return trends;
  }
}
