import type { Warehouse } from "@simpra/domain/warehouses";

export async function getWarehouse(
  id: string,
  organizationId: string,
  repository: { findById: (id: string, organizationId: string) => Promise<Warehouse | null> }
): Promise<Warehouse | null> {
  return repository.findById(id, organizationId);
}
