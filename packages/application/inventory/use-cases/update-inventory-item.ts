import type { InventoryItem, UpdateInventoryItemInput } from "@simpra/domain/inventory";
import type { InventoryItemRepository } from "../inventory-item-repository";

export async function updateInventoryItem(
  input: UpdateInventoryItemInput,
  repository: InventoryItemRepository
): Promise<InventoryItem> {
  const existing = await repository.findById(input.id, input.organizationId);
  if (!existing) {
    throw new Error("Inventory item not found");
  }
  return repository.update(input);
}
