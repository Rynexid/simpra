import { api } from "./api-client";

type Report = {
  id: string;
  name: string;
  type: "inventory_summary" | "stock_movement" | "valuation" | "supplier_performance";
  format: "pdf" | "csv" | "xlsx";
  createdAt: string;
};

type ReportParams = {
  type: Report["type"];
  dateFrom?: string;
  dateTo?: string;
  warehouseId?: string;
};

export const reportService = {
  list: () => api.get<Report[]>("/reports"),

  generate: (params: ReportParams) =>
    api.post<Report>("/reports/generate", params),

  download: (id: string) =>
    api.get<Blob>(`/reports/${id}/download`),
};
