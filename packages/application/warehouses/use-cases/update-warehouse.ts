import type { Warehouse, UpdateWarehouseInput } from "@simpra/domain/warehouses";

export async function updateWarehouse(
  input: UpdateWarehouseInput,
  repository: { update: (input: UpdateWarehouseInput) => Promise<Warehouse> }
): Promise<Warehouse> {
  return repository.update(input);
}
