export interface Warehouse {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  address: string | null;
  capacity: number | null;
  isActive: boolean;
  createdAt: string;
}

export interface CreateWarehouseInput {
  organizationId: string;
  name: string;
  code: string;
  address?: string | null;
  capacity?: number | null;
}

export interface UpdateWarehouseInput {
  id: string;
  organizationId: string;
  name?: string;
  code?: string;
  address?: string | null;
  capacity?: number | null;
  isActive?: boolean;
}
