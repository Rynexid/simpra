import type { Supplier, CreateSupplierInput } from "@simpra/domain/suppliers";
import type { SupplierRepository } from "../supplier-repository";

export async function createSupplier(
  input: CreateSupplierInput,
  repository: SupplierRepository
): Promise<Supplier> {
  const existing = await repository.findByName(input.name, input.organizationId);
  if (existing) {
    throw new Error(`Supplier with name ${input.name} already exists`);
  }

  return repository.create(input);
}
