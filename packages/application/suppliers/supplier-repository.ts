import type { Supplier, CreateSupplierInput, UpdateSupplierInput } from "@simpra/domain/suppliers";

export interface SupplierRepository {
  findById(id: string, organizationId: string): Promise<Supplier | null>;
  findByName(name: string, organizationId: string): Promise<Supplier | null>;
  list(
    organizationId: string,
    params: { page: number; pageSize: number; sort?: string }
  ): Promise<{ data: Supplier[]; total: number }>;
  create(input: CreateSupplierInput): Promise<Supplier>;
  update(input: UpdateSupplierInput): Promise<Supplier>;
}
