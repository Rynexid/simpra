import type { InventoryItem } from "@simpra/domain/inventory";
import type { InventoryItemRepository } from "../inventory-item-repository";

export async function getInventoryItem(
  id: string,
  organizationId: string,
  repository: InventoryItemRepository
): Promise<InventoryItem | null> {
  return repository.findById(id, organizationId);
}
