import type { Warehouse } from "@simpra/domain/warehouses";

export async function listWarehouses(
  organizationId: string,
  repository: { list: (organizationId: string) => Promise<Warehouse[]> }
): Promise<Warehouse[]> {
  return repository.list(organizationId);
}
