import type { PurchaseOrder } from "@simpra/domain/purchasing";
import type { PurchaseOrderRepository } from "../purchase-order-repository";

export async function listPurchaseOrders(
  organizationId: string,
  params: { page: number; pageSize: number; sort?: string },
  repository: PurchaseOrderRepository
): Promise<{ data: PurchaseOrder[]; total: number }> {
  return repository.list(organizationId, params);
}
