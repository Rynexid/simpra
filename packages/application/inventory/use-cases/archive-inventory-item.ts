import type { InventoryItemRepository } from "../inventory-item-repository";

export async function archiveInventoryItem(
  id: string,
  organizationId: string,
  repository: InventoryItemRepository
): Promise<void> {
  const existing = await repository.findById(id, organizationId);
  if (!existing) {
    throw new Error("Inventory item not found");
  }
  await repository.archive(id, organizationId);
}
