import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  SearchIcon,
  FilterIcon,
  PlusIcon,
  MoreHorizontalIcon,
} from "lucide-react";

const inventory = [
  { sku: "WH-001", name: "Widget A-100", category: "Components", qty: 1240, warehouse: "Main", uom: "pcs", status: "in-stock" },
  { sku: "WH-002", name: "LED Panel 24V", category: "Electronics", qty: 3800, warehouse: "West", uom: "pcs", status: "in-stock" },
  { sku: "WH-003", name: "Bolt M8 x 30", category: "Hardware", qty: 8, warehouse: "East", uom: "pcs", status: "low" },
  { sku: "WH-004", name: "Sensor Kit v2", category: "Electronics", qty: 0, warehouse: "Main", uom: "pcs", status: "out" },
  { sku: "WH-005", name: "Rubber Gasket", category: "Seals", qty: 20, warehouse: "Main", uom: "pcs", status: "low" },
  { sku: "WH-006", name: "Hydraulic Pump", category: "Machinery", qty: 15, warehouse: "West", uom: "pcs", status: "in-stock" },
  { sku: "WH-007", name: "Control Board v3", category: "Electronics", qty: 6, warehouse: "East", uom: "pcs", status: "in-stock" },
  { sku: "WH-008", name: "Steel Rod 12mm", category: "Raw Materials", qty: 0, warehouse: "Main", uom: "m", status: "out" },
  { sku: "WH-009", name: "O-Ring Set", category: "Seals", qty: 540, warehouse: "West", uom: "set", status: "in-stock" },
  { sku: "WH-010", name: "DC Motor 12V", category: "Electronics", qty: 92, warehouse: "East", uom: "pcs", status: "in-stock" },
];

const statusConfig = {
  "in-stock": { label: "In Stock", className: "bg-success/10 text-success" },
  "low": { label: "Low Stock", className: "bg-warning/10 text-warning" },
  "out": { label: "Out of Stock", className: "bg-destructive/10 text-destructive" },
} as const;

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your inventory items, stock levels, and categories.
          </p>
        </div>
        <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80">
          <PlusIcon className="size-4" />
          Add Item
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by SKU or name..." className="pl-8" />
        </div>
        <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium hover:bg-muted">
          <FilterIcon className="size-4" />
          Filters
        </button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">SKU</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Category</th>
                <th className="px-(--card-spacing) py-2.5 text-right font-medium text-muted-foreground">Qty</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">UOM</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Warehouse</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-(--card-spacing) py-2.5 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventory.map((item) => {
                const status = statusConfig[item.status as keyof typeof statusConfig];
                return (
                  <tr key={item.sku} className="hover:bg-muted/50">
                    <td className="px-(--card-spacing) py-3 font-mono text-xs">{item.sku}</td>
                    <td className="px-(--card-spacing) py-3 font-medium">{item.name}</td>
                    <td className="px-(--card-spacing) py-3 text-muted-foreground">{item.category}</td>
                    <td className={`px-(--card-spacing) py-3 text-right font-medium tabular-nums ${
                      item.qty === 0 ? "text-destructive" :
                      item.status === "low" ? "text-warning" : ""
                    }`}>{item.qty.toLocaleString()}</td>
                    <td className="px-(--card-spacing) py-3 text-muted-foreground">{item.uom}</td>
                    <td className="px-(--card-spacing) py-3">{item.warehouse}</td>
                    <td className="px-(--card-spacing) py-3">
                      <Badge className={status.className} variant="ghost">{status.label}</Badge>
                    </td>
                    <td className="px-(--card-spacing) py-3 text-right">
                      <button className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                        <MoreHorizontalIcon className="size-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-(--card-spacing) py-3">
          <p className="text-xs text-muted-foreground">Showing 10 of 2,847 items</p>
          <div className="flex items-center gap-1">
            <button className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-accent">Previous</button>
            <button className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">1</button>
            <button className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-accent">2</button>
            <button className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-accent">3</button>
            <span className="px-1 text-xs text-muted-foreground">...</span>
            <button className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-accent">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
