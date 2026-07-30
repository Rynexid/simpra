import { z } from "zod";

export const organizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(100),
  status: z.enum(["active", "suspended", "deactivated"]),
  defaultTimezone: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(255),
  createdAt: z.string(),
});

export const inventoryItemSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  sku: z.string().min(1).max(100),
  name: z.string().min(1).max(255),
  category: z.string().max(100).nullable(),
  unitOfMeasure: z.string().min(1).max(50),
  barcode: z.string().max(100).nullable(),
  reorderThreshold: z.number().nullable(),
  isArchived: z.boolean(),
  createdAt: z.string(),
});

export const stockTransactionSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  inventoryItemId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  type: z.enum(["stock_in", "stock_out", "transfer_out", "transfer_in", "adjustment"]),
  quantity: z.number().positive(),
  reasonCode: z.string().max(100).nullable(),
  note: z.string().nullable(),
  performedBy: z.string().uuid(),
  createdAt: z.string(),
});

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().min(1).max(200).default(25),
  sort: z.string().optional(),
});

export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
});