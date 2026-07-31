export interface StockTransaction {
  id: string;
  organizationId: string;
  inventoryItemId: string;
  warehouseId: string;
  type: string;
  quantity: number;
  referenceNumber: string | null;
  reasonCode: string | null;
  note: string | null;
  performedBy: string;
  createdAt: string;
}

export interface CreateStockTransactionInput {
  organizationId: string;
  inventoryItemId: string;
  warehouseId: string;
  type: string;
  quantity: number;
  referenceNumber?: string | null;
  reasonCode?: string | null;
  note?: string | null;
  performedBy: string;
}
