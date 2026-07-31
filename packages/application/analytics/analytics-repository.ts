import type { KPISummary, CategoryDistribution, MonthlyTrend, InventoryTurnover, StockAccuracy, WarehouseUtilization } from "@simpra/domain/analytics";

export interface AnalyticsRepository {
  getKPISummary(organizationId: string): Promise<KPISummary>;
  getCategoryDistribution(organizationId: string): Promise<CategoryDistribution[]>;
  getMonthlyTrends(organizationId: string, months?: number): Promise<MonthlyTrend[]>;
}
