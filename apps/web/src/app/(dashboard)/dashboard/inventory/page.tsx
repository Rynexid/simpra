import { Card } from "@simpra/ui/components/card";
import { Badge } from "@simpra/ui/components/badge";
import { Input } from "@simpra/ui/components/input";
import { PlusIcon, MoreHorizontalIcon } from "lucide-react";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const statusConfig = {
  "in-stock": { label: "In Stock", className: "bg-success/10 text-success" },
  "low": { label: "Low Stock", className: "bg-warning/10 text-warning" },
  "out": { label: "Out of Stock", className: "bg-destructive/10 text-destructive" },
} as const;

export default async function InventoryPage() {
  const cookieStore = await cookies();
  const res = await fetch(`${API_BASE}/api/v1/inventory?pageSize=20`, {
    headers: { cookie: cookieStore.toString() },
    cache: "no-store",
  });

  let inventory = [];
  if (res.ok) {
    const data = await res.json();
    inventory = data.data ?? [];
  }

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
          <Input placeholder="Search by SKU or name..." className="pl-8" />
        </div>
        <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium hover:bg-muted">
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
              {inventory.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-(--card-spacing) py-8 text-center text-muted-foreground">
                    No inventory items yet. Create your first item to get started.
                  </td>
                </tr>
              ) : (
                inventory.map((item: {
                  sku: string;
                  name: string;
                  category: string | null;
                  currentStock: number;
                  unitOfMeasure: string;
                  warehouseName?: string;
                  status?: string;
                }) => {
                  const status = statusConfig[item.status as keyof typeof statusConfig] ?? statusConfig["in-stock"];
                  return (
                    <tr key={item.sku} className="hover:bg-muted/50">
                      <td className="px-(--card-spacing) py-3 font-mono text-xs">{item.sku}</td>
                      <td className="px-(--card-spacing) py-3 font-medium">{item.name}</td>
                      <td className="px-(--card-spacing) py-3 text-muted-foreground">{item.category}</td>
                      <td className={`px-(--card-spacing) py-3 text-right font-medium tabular-nums ${
                        item.currentStock === 0 ? "text-destructive" :
                        item.status === "low" ? "text-warning" : ""
                      }`}>{item.currentStock.toLocaleString()}</td>
                      <td className="px-(--card-spacing) py-3 text-muted-foreground">{item.unitOfMeasure}</td>
                      <td className="px-(--card-spacing) py-3">{item.warehouseName ?? "-"}</td>
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
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-(--card-spacing) py-3">
          <p className="text-xs text-muted-foreground">
            {inventory.length === 0 ? "No items" : `Showing ${inventory.length} item${inventory.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </Card>
    </div>
  );
}