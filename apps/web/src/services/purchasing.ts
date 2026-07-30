import { api } from "./api-client";
import type { PaginatedResult } from "@simpra/shared/types";

type PurchaseOrder = {
  id: string;
  organizationId: string;
  supplierId: string;
  orderNumber: string;
  status: "draft" | "sent" | "confirmed" | "received" | "cancelled";
  expectedDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

type PurchaseOrderLineItem = {
  id: string;
  purchaseOrderId: string;
  inventoryItemId: string;
  quantity: number;
  unitPrice: number;
  receivedQuantity: number;
};

export const purchasingService = {
  list: (params?: { page?: number; pageSize?: number; status?: string }) =>
    api.get<PaginatedResult<PurchaseOrder>>(
      `/purchasing?${new URLSearchParams(params as Record<string, string>).toString()}`,
    ),

  get: (id: string) => api.get<PurchaseOrder>(`/purchasing/${id}`),

  getLineItems: (orderId: string) =>
    api.get<PurchaseOrderLineItem[]>(`/purchasing/${orderId}/items`),

  create: (data: Omit<PurchaseOrder, "id" | "organizationId" | "createdAt" | "updatedAt">) =>
    api.post<PurchaseOrder>("/purchasing", data),

  update: (id: string, data: Partial<PurchaseOrder>) =>
    api.patch<PurchaseOrder>(`/purchasing/${id}`, data),
};
