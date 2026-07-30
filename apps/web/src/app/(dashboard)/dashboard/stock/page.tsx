import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowRightLeftIcon,
  SearchIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ArrowRightIcon,
  PlusIcon,
} from "lucide-react";

const transactions = [
  { id: "TXN-001", item: "Widget A-100", type: "stock-in", qty: "+500", warehouse: "Main", performedBy: "Andi R.", date: "Today, 10:32 AM", note: "Supplier restock" },
  { id: "TXN-002", item: "Bolt M8 x 30", type: "stock-out", qty: "-50", warehouse: "East", performedBy: "Siti N.", date: "Today, 09:15 AM", note: "Production order #PO-042" },
  { id: "TXN-003", item: "Sensor Kit v2", type: "transfer", qty: "200", warehouse: "Main > West", performedBy: "Budi P.", date: "Yesterday, 04:20 PM", note: "Restock West storage" },
  { id: "TXN-004", item: "LED Panel 24V", type: "stock-in", qty: "+1,000", warehouse: "West", performedBy: "Rina W.", date: "Yesterday, 02:45 PM", note: "Bulk import shipment" },
  { id: "TXN-005", item: "Rubber Gasket", type: "adjustment", qty: "+10", warehouse: "Main", performedBy: "Dewi K.", date: "Yesterday, 11:00 AM", note: "Cycle count correction" },
  { id: "TXN-006", item: "Steel Rod 12mm", type: "stock-out", qty: "-200", warehouse: "Main", performedBy: "Andi R.", date: "2 days ago, 03:30 PM", note: "Construction project" },
  { id: "TXN-007", item: "Control Board v3", type: "transfer", qty: "50", warehouse: "East > Main", performedBy: "Siti N.", date: "2 days ago, 01:10 PM", note: "Consolidation" },
  { id: "TXN-008", item: "O-Ring Set", type: "stock-in", qty: "+500", warehouse: "West", performedBy: "Budi P.", date: "3 days ago, 09:00 AM", note: "Monthly restock" },
];

const typeConfig = {
  "stock-in": { label: "Stock In", icon: TrendingUpIcon, className: "bg-success/10 text-success" },
  "stock-out": { label: "Stock Out", icon: TrendingDownIcon, className: "bg-destructive/10 text-destructive" },
  "transfer": { label: "Transfer", icon: ArrowRightIcon, className: "bg-primary/10 text-primary" },
  "adjustment": { label: "Adjustment", icon: ArrowRightLeftIcon, className: "bg-warning/10 text-warning" },
} as const;

type TransactionType = keyof typeof typeConfig;

export default function StockPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Operations</h1>
          <p className="mt-1 text-muted-foreground">
            Record stock movements, transfers, and adjustments.
          </p>
        </div>
        <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80">
          <PlusIcon className="size-4" />
          New Transaction
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="pl-8" />
        </div>
        <div className="flex gap-1">
          {["All", "Stock In", "Stock Out", "Transfer", "Adjustment"].map((tab) => (
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
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">ID</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Item</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-(--card-spacing) py-2.5 text-right font-medium text-muted-foreground">Qty</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Warehouse</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">By</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((tx) => {
                const config = typeConfig[tx.type as TransactionType];
                const TypeIcon = config.icon;
                return (
                  <tr key={tx.id} className="hover:bg-muted/50">
                    <td className="px-(--card-spacing) py-3 font-mono text-xs">{tx.id}</td>
                    <td className="px-(--card-spacing) py-3 font-medium">{tx.item}</td>
                    <td className="px-(--card-spacing) py-3">
                      <Badge className={config.className} variant="ghost">
                        <TypeIcon className="size-3" />
                        {config.label}
                      </Badge>
                    </td>
                    <td className={`px-(--card-spacing) py-3 text-right font-medium tabular-nums ${
                      tx.type === "stock-in" || tx.type === "adjustment" ? "text-success" : tx.type === "stock-out" ? "text-destructive" : ""
                    }`}>{tx.qty}</td>
                    <td className="px-(--card-spacing) py-3 text-muted-foreground">{tx.warehouse}</td>
                    <td className="px-(--card-spacing) py-3 text-muted-foreground">{tx.performedBy}</td>
                    <td className="px-(--card-spacing) py-3 text-muted-foreground whitespace-nowrap">{tx.date}</td>
                    <td className="px-(--card-spacing) py-3 text-muted-foreground max-w-[200px] truncate">{tx.note}</td>
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
