export type Organization = {
  id: string;
  name: string;
  slug: string;
  status: "active" | "suspended" | "deactivated";
  defaultTimezone: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export type InventoryItem = {
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
};

export type StockTransaction = {
  id: string;
  organizationId: string;
  inventoryItemId: string;
  warehouseId: string;
  type: "stock_in" | "stock_out" | "transfer_out" | "transfer_in" | "adjustment";
  quantity: number;
  reasonCode: string | null;
  note: string | null;
  performedBy: string;
  createdAt: string;
};

export type PaginationParams = {
  page: number;
  pageSize: number;
  sort?: string;
};

export type PaginatedResult<T> = {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
};