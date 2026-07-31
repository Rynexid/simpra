import { Card } from "@simpra/ui/components/card";
import { Badge } from "@simpra/ui/components/badge";
import { Input } from "@simpra/ui/components/input";
import {
  ArrowRightLeftIcon,
  SearchIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ArrowRightIcon,
} from "lucide-react";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const typeConfig = {
  "stock-in": { label: "Stock In", icon: TrendingUpIcon, className: "bg-success/10 text-success" },
  "stock-out": { label: "Stock Out", icon: TrendingDownIcon, className: "bg-destructive/10 text-destructive" },
  "transfer": { label: "Transfer", icon: ArrowRightIcon, className: "bg-primary/10 text-primary" },
  "adjustment": { label: "Adjustment", icon: ArrowRightLeftIcon, className: "bg-warning/10 text-warning" },
} as const;

type TransactionType = keyof typeof typeConfig;

export default async function StockPage() {
  const cookieStore = await cookies();
  const res = await fetch(`${API_BASE}/api/v1/stock-transactions?pageSize=20`, {
    headers: { cookie: cookieStore.toString() },
    cache: "no-store",
  });

  let transactions = [];
  if (res.ok) {
    const data = await res.json();
    transactions = data.data ?? [];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Operations</h1>
          <p className="mt-1 text-muted-foreground">
            Record stock movements, transfers, and adjustments.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="pl-8" />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">ID</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-(--card-spacing) py-2.5 text-right font-medium text-muted-foreground">Qty</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Warehouse</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Note</th>
                <th className="px-(--card-spacing) py-2.5 text-left font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-(--card-spacing) py-8 text-center text-muted-foreground">
                    No transactions yet. Create your first stock transaction to get started.
                  </td>
                </tr>
              ) : (
                transactions.map((tx: {
                  id: string;
                  type: string;
                  quantity: number;
                  warehouseId: string;
                  note: string | null;
                  createdAt: string;
                }) => {
                  const config = typeConfig[tx.type as TransactionType] ?? typeConfig.adjustment;
                  const TypeIcon = config.icon;
                  return (
                    <tr key={tx.id} className="hover:bg-muted/50">
                      <td className="px-(--card-spacing) py-3 font-mono text-xs">{tx.id}</td>
                      <td className="px-(--card-spacing) py-3">
                        <Badge className={config.className} variant="ghost">
                          <TypeIcon className="size-3" />
                          {config.label}
                        </Badge>
                      </td>
                      <td className={`px-(--card-spacing) py-3 text-right font-medium tabular-nums ${
                        tx.type === "stock-in" || tx.type === "adjustment" ? "text-success" : tx.type === "stock-out" ? "text-destructive" : ""
                      }`}>{tx.quantity > 0 ? `+${tx.quantity}` : tx.quantity}</td>
                      <td className="px-(--card-spacing) py-3 text-muted-foreground">{tx.warehouseId}</td>
                      <td className="px-(--card-spacing) py-3 text-muted-foreground max-w-[200px] truncate">{tx.note ?? "-"}</td>
                      <td className="px-(--card-spacing) py-3 text-muted-foreground whitespace-nowrap">{new Date(tx.createdAt).toLocaleString()}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
