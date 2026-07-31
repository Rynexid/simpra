import type { Warehouse, CreateWarehouseInput } from "@simpra/domain/warehouses";
import type { WarehouseRepository } from "../warehouse-repository";

export async function createWarehouse(
  input: CreateWarehouseInput,
  repository: WarehouseRepository
): Promise<Warehouse> {
  const existing = await repository.findByCode(input.code, input.organizationId);
  if (existing) {
    throw new Error(`Warehouse with code ${input.code} already exists`);
  }
  return repository.create(input);
}
