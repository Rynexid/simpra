import { api } from "./api-client";
import type { PaginatedResult } from "@simpra/shared/types";

type Warehouse = {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  address: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type WarehouseZone = {
  id: string;
  warehouseId: string;
  name: string;
  code: string;
  capacity: number | null;
  createdAt: string;
};

export const warehouseService = {
  list: (params?: { page?: number; pageSize?: number }) =>
    api.get<PaginatedResult<Warehouse>>(
      `/warehouses?${new URLSearchParams(params as Record<string, string>).toString()}`,
    ),

  get: (id: string) => api.get<Warehouse>(`/warehouses/${id}`),

  getZones: (warehouseId: string) =>
    api.get<WarehouseZone[]>(`/warehouses/${warehouseId}/zones`),

  create: (data: Omit<Warehouse, "id" | "organizationId" | "createdAt" | "updatedAt">) =>
    api.post<Warehouse>("/warehouses", data),

  update: (id: string, data: Partial<Warehouse>) =>
    api.patch<Warehouse>(`/warehouses/${id}`, data),

  delete: (id: string) => api.delete<void>(`/warehouses/${id}`),
};
