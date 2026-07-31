import type {
  PurchaseOrder,
  CreatePurchaseOrderInput,
  UpdatePurchaseOrderInput,
} from "@simpra/domain/purchasing";

export interface PurchaseOrderRepository {
  findById(id: string, organizationId: string): Promise<PurchaseOrder | null>;
  findByOrderNumber(orderNumber: string, organizationId: string): Promise<PurchaseOrder | null>;
  list(
    organizationId: string,
    params: { page: number; pageSize: number; sort?: string }
  ): Promise<{ data: PurchaseOrder[]; total: number }>;
  create(input: CreatePurchaseOrderInput): Promise<PurchaseOrder>;
  update(input: UpdatePurchaseOrderInput): Promise<PurchaseOrder>;
}
