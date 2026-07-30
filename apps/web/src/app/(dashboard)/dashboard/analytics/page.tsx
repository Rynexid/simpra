import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
import {
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react";

const kpis = [
  { label: "Inventory Turnover", value: "4.2", change: "+0.8", trend: "up", period: "vs last quarter" },
  { label: "Stock Accuracy", value: "97.3%", change: "+1.2%", trend: "up", period: "vs last month" },
  { label: "Avg Order Fulfillment", value: "2.4 days", change: "-0.3", trend: "down", period: "vs last month" },
  { label: "Warehouse Utilization", value: "72%", change: "+5%", trend: "up", period: "vs last quarter" },
];

const topCategories = [
  { name: "Electronics", value: 35, revenue: "$42,000", trend: "up" },
  { name: "Hardware", value: 25, revenue: "$28,500", trend: "up" },
  { name: "Raw Materials", value: 20, revenue: "$18,200", trend: "down" },
  { name: "Seals & Gaskets", value: 12, revenue: "$9,800", trend: "up" },
  { name: "Packaging", value: 8, revenue: "$5,400", trend: "down" },
];

const monthlyTrends = [
  { month: "Nov", in: 12, out: 10 },
  { month: "Dec", in: 15, out: 13 },
  { month: "Jan", in: 18, out: 14 },
  { month: "Feb", in: 14, out: 16 },
  { month: "Mar", in: 20, out: 12 },
];

export default function AnalyticsPage() {
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
            <div className="flex items-end gap-3 h-40">
              {monthlyTrends.map((month) => {
                const maxVal = Math.max(...monthlyTrends.flatMap(m => [m.in, m.out]));
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
            <CardDescription>Distribution of items across categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCategories.map((cat) => (
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
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
