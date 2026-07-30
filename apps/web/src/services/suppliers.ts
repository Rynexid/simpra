import { api } from "./api-client";
import type { PaginatedResult } from "@simpra/shared/types";

type Supplier = {
  id: string;
  organizationId: string;
  name: string;
  contactName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  status: "active" | "inactive" | "blacklisted";
  createdAt: string;
  updatedAt: string;
};

export const supplierService = {
  list: (params?: { page?: number; pageSize?: number; search?: string }) =>
    api.get<PaginatedResult<Supplier>>(
      `/suppliers?${new URLSearchParams(params as Record<string, string>).toString()}`,
    ),

  get: (id: string) => api.get<Supplier>(`/suppliers/${id}`),

  create: (data: Omit<Supplier, "id" | "organizationId" | "createdAt" | "updatedAt">) =>
    api.post<Supplier>("/suppliers", data),

  update: (id: string, data: Partial<Supplier>) =>
    api.patch<Supplier>(`/suppliers/${id}`, data),

  delete: (id: string) => api.delete<void>(`/suppliers/${id}`),
};
