import type { InventoryItem } from "@simpra/domain/inventory";
import type { InventoryItemRepository } from "../inventory-item-repository";

export async function listInventoryItems(
  organizationId: string,
  params: { page: number; pageSize: number; sort?: string },
  repository: InventoryItemRepository
): Promise<{ data: InventoryItem[]; total: number }> {
  return repository.list(organizationId, params);
}
