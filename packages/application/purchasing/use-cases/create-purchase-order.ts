import type { PurchaseOrder, CreatePurchaseOrderInput } from "@simpra/domain/purchasing";
import type { PurchaseOrderRepository } from "../purchase-order-repository";

export async function createPurchaseOrder(
  input: CreatePurchaseOrderInput,
  repository: PurchaseOrderRepository
): Promise<PurchaseOrder> {
  const existing = await repository.findByOrderNumber(input.orderNumber, input.organizationId);
  if (existing) {
    throw new Error(`Purchase order with number ${input.orderNumber} already exists`);
  }

  return repository.create(input);
}
