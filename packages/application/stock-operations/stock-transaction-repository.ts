import type { StockTransaction, CreateStockTransactionInput } from "@simpra/domain/stock-operations";

export interface StockTransactionRepository {
  findById(id: string, organizationId: string): Promise<StockTransaction | null>;
  list(organizationId: string, params: { page: number; pageSize: number }): Promise<{ data: StockTransaction[]; total: number }>;
  create(input: CreateStockTransactionInput): Promise<StockTransaction>;
}
