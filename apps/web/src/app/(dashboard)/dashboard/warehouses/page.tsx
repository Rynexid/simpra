import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
import {
  WarehouseIcon,
  MapPinIcon,
  LayersIcon,
  PlusIcon,
} from "lucide-react";

const warehouses = [
  {
    name: "Main Warehouse",
    code: "WH-MAIN",
    location: "Jakarta Industrial Park, Block A",
    zones: 6,
    capacity: 85,
    items: 1240,
    status: "active" as const,
  },
  {
    name: "West Distribution",
    code: "WH-WEST",
    location: "Tangerang Logistics Hub, Lot 12",
    zones: 4,
    capacity: 62,
    items: 680,
    status: "active" as const,
  },
  {
    name: "East Storage",
    code: "WH-EAST",
    location: "Surabaya Industrial Estate, Unit 5",
    zones: 3,
    capacity: 45,
    items: 320,
    status: "active" as const,
  },
  {
    name: "Overflow Facility",
    code: "WH-OFLO",
    location: "Bekasi Storage Park, Bay 7-9",
    zones: 2,
    capacity: 30,
    items: 150,
    status: "inactive" as const,
  },
];

export default function WarehousesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Warehouses</h1>
          <p className="mt-1 text-muted-foreground">
            Manage warehouse locations, zones, and capacities.
          </p>
        </div>
        <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80">
          <PlusIcon className="size-4" />
          Add Warehouse
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {warehouses.map((wh) => (
          <Card key={wh.code}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <WarehouseIcon className="size-5" />
                  </div>
                  <div>
                    <CardTitle>{wh.name}</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{wh.code}</p>
                  </div>
                </div>
                <Badge variant={wh.status === "active" ? "default" : "secondary"} className={wh.status === "active" ? "" : "capitalize"}>
                  {wh.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon className="size-3.5 shrink-0" />
                <span className="truncate">{wh.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LayersIcon className="size-3.5 shrink-0" />
                <span>{wh.zones} zones</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="font-medium">{wh.capacity}%</span>
                </div>
                <Progress value={wh.capacity}>
                  <ProgressTrack className="h-2">
                    <ProgressIndicator
                      className={wh.capacity > 80 ? "bg-warning" : wh.capacity > 50 ? "bg-primary" : "bg-success"}
                    />
                  </ProgressTrack>
                </Progress>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Items stored: </span>
                <span className="font-medium">{wh.items.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
