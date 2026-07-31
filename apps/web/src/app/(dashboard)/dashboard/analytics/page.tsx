import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@simpra/ui/components/card";
import { Progress, ProgressIndicator, ProgressTrack } from "@simpra/ui/components/progress";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  Loader2Icon,
} from "lucide-react";

async function getKPIData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/v1/analytics/kpi`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch KPI data");
  return res.json();
}

async function getCategoryData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/v1/analytics/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch category data");
  return res.json();
}

async function getTrendData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/v1/analytics/trends?months=5`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch trend data");
  return res.json();
}

export default async function AnalyticsPage() {
  const [kpiData, categoryData, trendData] = await Promise.all([
    getKPIData().catch(() => null),
    getCategoryData().catch(() => []),
    getTrendData().catch(() => []),
  ]);

  const kpis = kpiData
    ? [
        { label: "Inventory Turnover", value: kpiData.inventoryTurnover.value.toFixed(1), change: "current", trend: "up" as const, period: "current period" },
        { label: "Stock Accuracy", value: `${kpiData.stockAccuracy.value}%`, change: `${kpiData.stockAccuracy.positiveAdjustments}/${kpiData.stockAccuracy.totalTransactions}`, trend: kpiData.stockAccuracy.value >= 95 ? "up" : "down", period: "all transactions" },
        { label: "Warehouse Utilization", value: `${kpiData.warehouseUtilization.utilizationPercentage}%`, change: `${kpiData.warehouseUtilization.totalStock}/${kpiData.warehouseUtilization.totalCapacity}`, trend: kpiData.warehouseUtilization.utilizationPercentage >= 70 ? "up" : "down", period: "total capacity" },
      ]
    : [
        { label: "Inventory Turnover", value: "--", change: "--", trend: "up" as const, period: "no data" },
        { label: "Stock Accuracy", value: "--", change: "--", trend: "up" as const, period: "no data" },
        { label: "Warehouse Utilization", value: "--", change: "--", trend: "up" as const, period: "no data" },
      ];

  const topCategories = (categoryData as { category: string; count: number; percentage: number }[]).map((cat) => ({
    name: cat.category,
    value: Math.round(cat.percentage),
    revenue: `${cat.count} items`,
    trend: "up" as const,
  }));

  const monthlyTrends = (trendData as { month: string; stockIn: number; stockOut: number }[]).map((m) => ({
    month: m.month.slice(5),
    in: m.stockIn,
    out: m.stockOut,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="mt-1 text-muted-foreground">
          Insights and trends for your inventory and warehouse operations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} size="sm">
            <CardHeader>
              <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                {kpi.trend === "up" && <TrendingUpIcon className="size-3 text-success" />}
                {kpi.trend === "down" && <TrendingDownIcon className="size-3 text-destructive" />}
                <span className={kpi.trend === "up" ? "text-success" : "text-destructive"}>
                  {kpi.change}
                </span>
                <span className="text-muted-foreground">{kpi.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Stock Movement (Last 5 Months)</CardTitle>
            <CardDescription>Monthly stock-in vs stock-out volume</CardDescription>
          </CardHeader>
          <CardContent>
            {monthlyTrends.length === 0 ? (
              <div className="flex h-40 items-center justify-center text-muted-foreground text-sm">No trend data available</div>
            ) : (
              <>
                <div className="flex items-end gap-3 h-40">
                  {monthlyTrends.map((month) => {
                    const maxVal = Math.max(...monthlyTrends.flatMap((m) => [m.in, m.out]), 1);
                    return (
                      <div key={month.month} className="flex flex-1 flex-col items-center gap-1">
                        <div className="flex w-full items-end justify-center gap-0.5">
                          <div
                            className="w-3 rounded-t bg-success/80 transition-all"
                            style={{ height: `${(month.in / maxVal) * 100}%` }}
                          />
                          <div
                            className="w-3 rounded-t bg-destructive/60 transition-all"
                            style={{ height: `${(month.out / maxVal) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{month.month}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm bg-success/80" />
                    <span className="text-muted-foreground">Stock In</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm bg-destructive/60" />
                    <span className="text-muted-foreground">Stock Out</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
            <CardDescription>Distribution of items across categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCategories.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-muted-foreground text-sm">No category data available</div>
            ) : (
              topCategories.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{cat.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{cat.revenue}</span>
                      {cat.trend === "up"
                        ? <TrendingUpIcon className="size-3 text-success" />
                        : <TrendingDownIcon className="size-3 text-destructive" />
                      }
                    </div>
                  </div>
                  <Progress value={cat.value}>
                    <ProgressTrack className="h-2">
                      <ProgressIndicator className={cat.trend === "up" ? "bg-success" : "bg-warning"} />
                    </ProgressTrack>
                  </Progress>
                  <div className="mt-0.5 text-xs text-muted-foreground">{cat.value}% of total items</div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
