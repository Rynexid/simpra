import type { StockTransaction, CreateStockTransactionInput, StockTransferInput } from "@simpra/domain/stock-operations";

export interface StockTransactionRepository {
  create(input: CreateStockTransactionInput): Promise<StockTransaction>;
  transfer(input: StockTransferInput): Promise<{ transferOut: StockTransaction; transferIn: StockTransaction }>;
  listByOrganization(organizationId: string, params: { page: number; pageSize: number; sort?: string }): Promise<{ data: StockTransaction[]; total: number }>;
}
