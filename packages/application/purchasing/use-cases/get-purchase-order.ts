import type { PurchaseOrder } from "@simpra/domain/purchasing";
import type { PurchaseOrderRepository } from "../purchase-order-repository";

export async function getPurchaseOrder(
  id: string,
  organizationId: string,
  repository: PurchaseOrderRepository
): Promise<PurchaseOrder | null> {
  return repository.findById(id, organizationId);
}
