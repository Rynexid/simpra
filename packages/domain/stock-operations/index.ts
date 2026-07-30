export type StockTransactionType = "stock_in" | "stock_out" | "transfer_out" | "transfer_in" | "adjustment";

export interface StockTransaction {
  id: string;
  organizationId: string;
  inventoryItemId: string;
  warehouseId: string;
  type: StockTransactionType;
  quantity: number;
  reasonCode: string | null;
  note: string | null;
  performedBy: string;
  createdAt: string;
}

export interface CreateStockTransactionInput {
  organizationId: string;
  inventoryItemId: string;
  warehouseId: string;
  type: StockTransactionType;
  quantity: number;
  reasonCode?: string | null;
  note?: string | null;
  performedBy: string;
}

export interface StockTransferInput {
  organizationId: string;
  inventoryItemId: string;
  sourceWarehouseId: string;
  destinationWarehouseId: string;
  quantity: number;
  note?: string | null;
  performedBy: string;
}
