export interface InventoryTurnover {
  value: number;
  period: string;
}

export interface StockAccuracy {
  value: number;
  positiveAdjustments: number;
  totalTransactions: number;
}

export interface WarehouseUtilization {
  totalStock: number;
  totalCapacity: number;
  utilizationPercentage: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
  percentage: number;
}

export interface MonthlyTrend {
  month: string;
  stockIn: number;
  stockOut: number;
}

export interface KPISummary {
  inventoryTurnover: InventoryTurnover;
  stockAccuracy: StockAccuracy;
  warehouseUtilization: WarehouseUtilization;
}
