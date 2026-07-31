import { Card } from "@simpra/ui/components/card";
import { Badge } from "@simpra/ui/components/badge";
import {
  PlusIcon,
} from "lucide-react";

const purchaseOrders = [
  { id: "PO-2025-0042", supplier: "PT Global Parts Indonesia", items: 8, total: "$24,500", status: "received" as const, expected: "Mar 28, 2025", created: "Mar 20, 2025" },
  { id: "PO-2025-0041", supplier: "PT Sentosa Logistik", items: 3, total: "$8,200", status: "confirmed" as const, expected: "Apr 05, 2025", created: "Mar 22, 2025" },
  { id: "PO-2025-0040", supplier: "PT Indalum Metal Works", items: 5, total: "$15,800", status: "sent" as const, expected: "Apr 10, 2025", created: "Mar 18, 2025" },
  { id: "PO-2025-0039", supplier: "CV Maju Jaya Hardware", items: 12, total: "$6,750", status: "draft" as const, expected: "Apr 15, 2025", created: "Mar 25, 2025" },
  { id: "PO-2025-0038", supplier: "PT Global Parts Indonesia", items: 4, total: "$12,300", status: "received" as const, expected: "Mar 15, 2025", created: "Mar 10, 2025" },
  { id: "PO-2025-0037", supplier: "CV Teknindo Solusindo", items: 6, total: "$9,450", status: "cancelled" as const, expected: "Mar 30, 2025", created: "Mar 12, 2025" },
  { id: "PO-2025-0036", supplier: "UD Berkah Sejahtera", items: 2, total: "$3,200", status: "draft" as const, expected: "Apr 20, 2025", created: "Mar 26, 2025" },
  { id: "PO-2025-0035", supplier: "PT Sentosa Logistik", items: 10, total: "$18,900", status: "confirmed" as const, expected: "Apr 02, 2025", created: "Mar 19, 2025" },
];

const statusConfig = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  sent: { label: "Sent", className: "bg-primary/10 text-primary" },
  confirmed: { label: "Confirmed", className: "bg-warning/10 text-warning" },
  received: { label: "Received", className: "bg-success/10 text-success" },
  cancelled: { label: "Cancelled", className: "bg-destructive/10 text-destructive" },
} as const;

export default function PurchasingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchasing</h1>
          <p className="mt-1 text-muted-foreground">
            Create and manage purchase orders and procurements.
          </p>
        </div>
        <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80">
          <PlusIcon className="size-4" />
          New Purchase Order
        </button>
      </div>

      <div className="flex gap-1">
        {["All", "Draft", "Sent", "Confirmed", "Received", "Cancelled"].map((tab) => (
          <button
            key={tab}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === "All"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">PO Number</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Supplier</th>
                <th className="px-(--card-spacing) py-2.5 text-right font-medium text-muted-foreground">Items</th>
                <th className="px-(--card-spacing) py-2.5 text-right font-medium text-muted-foreground">Total</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Expected</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {purchaseOrders.map((po) => {
                const status = statusConfig[po.status];
                return (
                  <tr key={po.id} className="hover:bg-muted/50">
                    <td className="px-(--card-spacing) py-3 font-mono text-xs font-medium">{po.id}</td>
                    <td className="px-(--card-spacing) py-3">{po.supplier}</td>
                    <td className="px-(--card-spacing) py-3 text-right tabular-nums">{po.items}</td>
                    <td className="px-(--card-spacing) py-3 text-right font-medium tabular-nums">{po.total}</td>
                    <td className="px-(--card-spacing) py-3">
                      <Badge className={status.className} variant="ghost">{status.label}</Badge>
                    </td>
                    <td className="px-(--card-spacing) py-3 text-muted-foreground whitespace-nowrap">{po.expected}</td>
                    <td className="px-(--card-spacing) py-3 text-muted-foreground whitespace-nowrap">{po.created}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
