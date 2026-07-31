import type { Supplier, UpdateSupplierInput } from "@simpra/domain/suppliers";
import type { SupplierRepository } from "../supplier-repository";

export async function updateSupplier(
  input: UpdateSupplierInput,
  repository: SupplierRepository
): Promise<Supplier> {
  const existing = await repository.findById(input.id, input.organizationId);
  if (!existing) {
    throw new Error("Supplier not found");
  }
  return repository.update(input);
}
