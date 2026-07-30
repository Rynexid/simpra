import { api } from "./api-client";
import type { InventoryItem, PaginatedResult } from "@simpra/shared/types";

export const inventoryService = {
  list: (params?: { page?: number; pageSize?: number; search?: string }) =>
    api.get<PaginatedResult<InventoryItem>>(
      `/inventory?${new URLSearchParams(params as Record<string, string>).toString()}`,
    ),

  get: (id: string) => api.get<InventoryItem>(`/inventory/${id}`),

  create: (data: Omit<InventoryItem, "id" | "organizationId" | "createdAt">) =>
    api.post<InventoryItem>("/inventory", data),

  update: (id: string, data: Partial<InventoryItem>) =>
    api.patch<InventoryItem>(`/inventory/${id}`, data),

  delete: (id: string) => api.delete<void>(`/inventory/${id}`),
};
