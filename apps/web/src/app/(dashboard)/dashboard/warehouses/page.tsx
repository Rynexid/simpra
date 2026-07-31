import { Card, CardContent, CardHeader, CardTitle } from "@simpra/ui/components/card";
import { Badge } from "@simpra/ui/components/badge";
import { Progress, ProgressIndicator, ProgressTrack } from "@simpra/ui/components/progress";
import {
  WarehouseIcon,
  MapPinIcon,
  PlusIcon,
} from "lucide-react";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default async function WarehousesPage() {
  const cookieStore = await cookies();
  const res = await fetch(`${API_BASE}/api/v1/warehouses`, {
    headers: { cookie: cookieStore.toString() },
    cache: "no-store",
  });

  let warehouses = [];
  if (res.ok) {
    warehouses = await res.json();
  }

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
        {warehouses.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No warehouses yet. Create your first warehouse to get started.
            </CardContent>
          </Card>
        ) : (
          warehouses.map((wh: {
            id: string;
            name: string;
            code: string;
            address: string | null;
            capacity: number | null;
            isActive: boolean;
          }) => (
            <Card key={wh.id}>
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
                  <Badge variant={wh.isActive ? "default" : "secondary"} className={wh.isActive ? "" : "capitalize"}>
                    {wh.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinIcon className="size-3.5 shrink-0" />
                  <span className="truncate">{wh.address ?? "No address"}</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-medium">{wh.capacity ?? 0}%</span>
                  </div>
                  <Progress value={wh.capacity ?? 0}>
                    <ProgressTrack className="h-2">
                      <ProgressIndicator
                        className={(wh.capacity ?? 0) > 80 ? "bg-warning" : (wh.capacity ?? 0) > 50 ? "bg-primary" : "bg-success"}
                      />
                    </ProgressTrack>
                  </Progress>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
