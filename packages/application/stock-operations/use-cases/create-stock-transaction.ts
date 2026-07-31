import type { StockTransaction, CreateStockTransactionInput } from "@simpra/domain/stock-operations";
import type { StockTransactionRepository } from "../stock-transaction-repository";

export async function createStockTransaction(
  input: CreateStockTransactionInput,
  repository: StockTransactionRepository
): Promise<StockTransaction> {
  return repository.create(input);
}
