import { api } from "./api-client";
import type { StockTransaction, PaginatedResult } from "@simpra/shared/types";

export const stockOpsService = {
  list: (params?: { page?: number; pageSize?: number; itemId?: string; warehouseId?: string }) =>
    api.get<PaginatedResult<StockTransaction>>(
      `/stock?${new URLSearchParams(params as Record<string, string>).toString()}`,
    ),

  get: (id: string) => api.get<StockTransaction>(`/stock/${id}`),

  create: (data: Omit<StockTransaction, "id" | "organizationId" | "createdAt" | "performedBy">) =>
    api.post<StockTransaction>("/stock", data),

  transfer: (data: {
    inventoryItemId: string;
    sourceWarehouseId: string;
    destinationWarehouseId: string;
    quantity: number;
    note?: string;
  }) => api.post<StockTransaction>("/stock/transfer", data),
};
