import type { InventoryItem, CreateInventoryItemInput, UpdateInventoryItemInput } from "@simpra/domain/inventory";

export interface InventoryItemRepository {
  findById(id: string, organizationId: string): Promise<InventoryItem | null>;
  findBySku(sku: string, organizationId: string): Promise<InventoryItem | null>;
  findByBarcode(barcode: string, organizationId: string): Promise<InventoryItem | null>;
  list(organizationId: string, params: { page: number; pageSize: number; sort?: string }): Promise<{ data: InventoryItem[]; total: number }>;
  create(input: CreateInventoryItemInput): Promise<InventoryItem>;
  update(input: UpdateInventoryItemInput): Promise<InventoryItem>;
  archive(id: string, organizationId: string): Promise<void>;
}
