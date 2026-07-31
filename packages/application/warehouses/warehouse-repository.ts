import type { Warehouse, CreateWarehouseInput, UpdateWarehouseInput } from "@simpra/domain/warehouses";

export interface WarehouseRepository {
  findById(id: string, organizationId: string): Promise<Warehouse | null>;
  findByCode(code: string, organizationId: string): Promise<Warehouse | null>;
  list(organizationId: string): Promise<Warehouse[]>;
  create(input: CreateWarehouseInput): Promise<Warehouse>;
  update(input: UpdateWarehouseInput): Promise<Warehouse>;
}
