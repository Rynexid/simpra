export interface Supplier {
  id: string;
  organizationId: string;
  name: string;
  contactName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  category: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupplierInput {
  organizationId: string;
  name: string;
  contactName?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  category?: string | null;
}

export interface UpdateSupplierInput {
  id: string;
  organizationId: string;
  name?: string;
  contactName?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  category?: string | null;
  status?: string;
}
