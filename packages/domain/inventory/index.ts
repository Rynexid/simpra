export interface InventoryItem {
  id: string;
  organizationId: string;
  sku: string;
  name: string;
  category: string | null;
  unitOfMeasure: string;
  barcode: string | null;
  reorderThreshold: number | null;
  isArchived: boolean;
  createdAt: string;
}

export interface CreateInventoryItemInput {
  organizationId: string;
  sku: string;
  name: string;
  category: string | null;
  unitOfMeasure: string;
  barcode: string | null;
  reorderThreshold: number | null;
}

export interface UpdateInventoryItemInput {
  id: string;
  organizationId: string;
  sku?: string;
  name?: string;
  category?: string | null;
  unitOfMeasure?: string;
  barcode?: string | null;
  reorderThreshold?: number | null;
  isArchived?: boolean;
}
