import type { StockTransaction } from "@simpra/domain/stock-operations";

export async function listStockTransactions(
  organizationId: string,
  params: { page: number; pageSize: number },
  repository: { list: (organizationId: string, params: { page: number; pageSize: number }) => Promise<{ data: StockTransaction[]; total: number }> }
): Promise<{ data: StockTransaction[]; total: number }> {
  return repository.list(organizationId, params);
}
