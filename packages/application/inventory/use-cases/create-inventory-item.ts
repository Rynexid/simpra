import type { InventoryItem, CreateInventoryItemInput } from "@simpra/domain/inventory";
import type { InventoryItemRepository } from "../inventory-item-repository";

export async function createInventoryItem(
  repository: InventoryItemRepository,
  input: CreateInventoryItemInput
): Promise<InventoryItem> {
  const existing = await repository.findBySku(input.sku, input.organizationId);
  if (existing) {
    throw new Error(`Inventory item with SKU ${input.sku} already exists`);
  }

  if (input.barcode) {
    const existingBarcode = await repository.findByBarcode(input.barcode, input.organizationId);
    if (existingBarcode) {
      throw new Error(`Inventory item with barcode ${input.barcode} already exists`);
    }
  }

  return repository.create(input);
}
