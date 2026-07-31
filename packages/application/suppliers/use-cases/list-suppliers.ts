import type { Supplier } from "@simpra/domain/suppliers";
import type { SupplierRepository } from "../supplier-repository";

export async function listSuppliers(
  organizationId: string,
  params: { page: number; pageSize: number; sort?: string },
  repository: SupplierRepository
): Promise<{ data: Supplier[]; total: number }> {
  return repository.list(organizationId, params);
}
