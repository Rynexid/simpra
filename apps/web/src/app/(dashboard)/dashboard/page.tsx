import { Card, CardContent, CardHeader, CardTitle } from "@simpra/ui/components/card";
import { Badge } from "@simpra/ui/components/badge";
import {
  PackageIcon,
  WarehouseIcon,
  TruckIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
} from "lucide-react";

const stats = [
  { label: "Total SKUs", value: "2,847", icon: PackageIcon, change: "+12%", trend: "up" },
  { label: "Warehouses", value: "4", icon: WarehouseIcon, change: "0", trend: "neutral" },
  { label: "Active Suppliers", value: "38", icon: TruckIcon, change: "+3", trend: "up" },
  { label: "Open POs", value: "12", icon: ShoppingCartIcon, change: "-2", trend: "down" },
];

const recentActivity = [
  { action: "Stock In", item: "Widget A-100", qty: "+500", warehouse: "Main Warehouse", time: "2 min ago", type: "in" },
  { action: "Stock Out", item: "Bolt M8 x 30", qty: "-50", warehouse: "East Zone", time: "15 min ago", type: "out" },
  { action: "Transfer", item: "Sensor Kit v2", qty: "200", warehouse: "Main -> West", time: "1 hr ago", type: "transfer" },
  { action: "Adjustment", item: "Rubber Gasket", qty: "+10", warehouse: "Main Warehouse", time: "3 hr ago", type: "adjust" },
  { action: "Stock In", item: "LED Panel 24V", qty: "+1,000", warehouse: "West Zone", time: "5 hr ago", type: "in" },
];

const lowStockItems = [
  { sku: "WH-001", name: "Widget A-100", qty: 12, threshold: 50 },
  { sku: "WH-045", name: "Bolt M8 x 30", qty: 8, threshold: 100 },
  { sku: "WH-102", name: "Sensor Kit v2", qty: 3, threshold: 25 },
  { sku: "WH-078", name: "Rubber Gasket", qty: 20, threshold: 40 },
];

const topItems = [
  { name: "LED Panel 24V", revenue: "$24,500", units: 1200, trend: "up" },
  { name: "Widget A-100", revenue: "$18,200", units: 980, trend: "up" },
  { name: "Sensor Kit v2", revenue: "$12,800", units: 340, trend: "down" },
  { name: "Bolt M8 x 30", revenue: "$8,400", units: 4200, trend: "up" },
  { name: "Rubber Gasket", revenue: "$5,600", units: 1800, trend: "down" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back. Here is your inventory overview.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5">
            <span className="size-1.5 rounded-full bg-success" />
            All systems normal
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} size="sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{stat.label}</CardTitle>
                  <Icon className="size-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  {stat.trend === "up" && <TrendingUpIcon className="size-3 text-success" />}
                  {stat.trend === "down" && <TrendingDownIcon className="size-3 text-destructive" />}
                  <span className={
                    stat.trend === "up" ? "text-success" :
                    stat.trend === "down" ? "text-destructive" :
                    "text-muted-foreground"
                  }>
                    {stat.change} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="divide-y divide-border">
              {recentActivity.map((activity) => (
                <div key={activity.item + activity.time} className="flex items-center gap-3 px-(--card-spacing) py-3">
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                    activity.type === "in" ? "bg-success/10 text-success" :
                    activity.type === "out" ? "bg-destructive/10 text-destructive" :
                    "bg-primary/10 text-primary"
                  }`}>
                    {activity.type === "in" && <TrendingUpIcon className="size-4" />}
                    {activity.type === "out" && <TrendingDownIcon className="size-4" />}
                    {activity.type === "transfer" && <ArrowRightIcon className="size-4" />}
                    {activity.type === "adjust" && <PackageIcon className="size-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.item}</p>
                    <p className="text-xs text-muted-foreground">{activity.action} - {activity.warehouse}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      activity.type === "in" ? "text-success" :
                      activity.type === "out" ? "text-destructive" :
                      ""
                    }`}>{activity.qty}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangleIcon className="size-4 text-warning" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="divide-y divide-border">
                {lowStockItems.map((item) => (
                  <div key={item.sku} className="flex items-center justify-between px-(--card-spacing) py-2.5">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-warning">{item.qty}</p>
                      <p className="text-xs text-muted-foreground">min {item.threshold}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Moving Items</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="divide-y divide-border">
                {topItems.map((item) => (
                  <div key={item.name} className="flex items-center justify-between px-(--card-spacing) py-2.5">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.units} units</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.revenue}</p>
                      {item.trend === "up" ? (
                        <TrendingUpIcon className="ml-auto size-3 text-success" />
                      ) : (
                        <TrendingDownIcon className="ml-auto size-3 text-destructive" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
