import type { PurchaseOrder, UpdatePurchaseOrderInput } from "@simpra/domain/purchasing";
import type { PurchaseOrderRepository } from "../purchase-order-repository";

export async function updatePurchaseOrder(
  input: UpdatePurchaseOrderInput,
  repository: PurchaseOrderRepository
): Promise<PurchaseOrder> {
  const existing = await repository.findById(input.id, input.organizationId);
  if (!existing) {
    throw new Error("Purchase order not found");
  }
  return repository.update(input);
}
