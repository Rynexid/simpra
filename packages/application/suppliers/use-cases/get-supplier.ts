import type { Supplier } from "@simpra/domain/suppliers";
import type { SupplierRepository } from "../supplier-repository";

export async function getSupplier(
  id: string,
  organizationId: string,
  repository: SupplierRepository
): Promise<Supplier | null> {
  return repository.findById(id, organizationId);
}
