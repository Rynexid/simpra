export interface PurchaseOrder {
  id: string;
  organizationId: string;
  supplierId: string;
  orderNumber: string;
  status: string;
  expectedDate: string | null;
  notes: string | null;
  items: PurchaseOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrderItem {
  id: string;
  purchaseOrderId: string;
  inventoryItemId: string;
  quantity: number;
  unitPrice: string;
  receivedQuantity: number;
}

export interface CreatePurchaseOrderInput {
  organizationId: string;
  supplierId: string;
  orderNumber: string;
  status?: string;
  expectedDate?: string | null;
  notes?: string | null;
  items?: CreatePurchaseOrderItemInput[];
}

export interface CreatePurchaseOrderItemInput {
  inventoryItemId: string;
  quantity: number;
  unitPrice: string;
}

export interface UpdatePurchaseOrderInput {
  id: string;
  organizationId: string;
  supplierId?: string;
  orderNumber?: string;
  status?: string;
  expectedDate?: string | null;
  notes?: string | null;
}
