export interface InventoryItem {
  id: string;
  organizationId: string;
  sku: string;
  name: string;
  category: string | null;
  unitOfMeasure: string;
  barcode: string | null;
  reorderThreshold: number | null;
  currentStock: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
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
