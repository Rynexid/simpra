import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@simpra/ui/components/card";
import { Badge } from "@simpra/ui/components/badge";
import {
  FileTextIcon,
  DownloadIcon,
  TrendingUpIcon,
  PackageIcon,
  TruckIcon,
  DollarSignIcon,
} from "lucide-react";

const reportTemplates = [
  {
    name: "Inventory Summary",
    description: "Complete overview of all inventory items with quantities and values.",
    type: "inventory_summary",
    formats: ["PDF", "CSV", "XLSX"],
    icon: PackageIcon,
  },
  {
    name: "Stock Movement",
    description: "Detailed log of all stock-in, stock-out, transfer, and adjustment transactions.",
    type: "stock_movement",
    formats: ["PDF", "CSV"],
    icon: TrendingUpIcon,
  },
  {
    name: "Inventory Valuation",
    description: "Current valuation of all stock based on weighted average cost.",
    type: "valuation",
    formats: ["PDF", "XLSX"],
    icon: DollarSignIcon,
  },
  {
    name: "Supplier Performance",
    description: "Supplier metrics including lead time, fill rate, and defect rates.",
    type: "supplier_performance",
    formats: ["PDF", "CSV"],
    icon: TruckIcon,
  },
];

const recentReports = [
  { name: "Inventory Summary", date: "Mar 25, 2025", format: "PDF", status: "ready" as const },
  { name: "Stock Movement Q1", date: "Mar 24, 2025", format: "CSV", status: "ready" as const },
  { name: "Supplier Q1 Review", date: "Mar 22, 2025", format: "PDF", status: "ready" as const },
  { name: "Monthly Valuation", date: "Mar 20, 2025", format: "XLSX", status: "generating" as const },
];

export default async function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="mt-1 text-muted-foreground">
          View and export inventory and operational reports.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {reportTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <Card key={template.type} className="hover:border-primary/30 transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription className="mt-1 max-w-sm">{template.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {template.formats.map((fmt) => (
                      <Badge key={fmt} variant="outline" className="text-xs uppercase">{fmt}</Badge>
                    ))}
                  </div>
                  <button className="inline-flex h-7 items-center gap-1 rounded-md border border-border px-2 text-xs font-medium hover:bg-muted">
                    <DownloadIcon className="size-3" />
                    Generate
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="divide-y divide-border">
            {recentReports.map((report) => (
              <div key={report.name + report.date} className="flex items-center justify-between px-(--card-spacing) py-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileTextIcon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{report.name}</p>
                    <p className="text-xs text-muted-foreground">{report.date} - {report.format}</p>
                  </div>
                </div>
                <Badge variant={report.status === "ready" ? "default" : "secondary"} className={report.status === "generating" ? "capitalize" : ""}>
                  {report.status === "ready" ? "Ready" : "Generating..."}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
