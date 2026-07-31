import { Card, CardContent, CardHeader, CardTitle } from "@simpra/ui/components/card";
import { Badge } from "@simpra/ui/components/badge";
import { Input } from "@simpra/ui/components/input";
import {
  TruckIcon,
  SearchIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  PlusIcon,
} from "lucide-react";

const suppliers = [
  {
    name: "PT Global Parts Indonesia",
    contact: "Hendra Wijaya",
    email: "hendra@globalparts.co.id",
    phone: "+62 21 5555 0101",
    location: "Jakarta",
    category: "Electronics",
    status: "active" as const,
    since: "2024",
  },
  {
    name: "CV Maju Jaya Hardware",
    contact: "Sari Dewi",
    email: "sari@majujaya.com",
    phone: "+62 31 5555 0202",
    location: "Surabaya",
    category: "Hardware",
    status: "active" as const,
    since: "2024",
  },
  {
    name: "PT Sentosa Logistik",
    contact: "Agus Pranoto",
    email: "agus@sentosalogistic.co.id",
    phone: "+62 21 5555 0303",
    location: "Tangerang",
    category: "Logistics",
    status: "active" as const,
    since: "2023",
  },
  {
    name: "UD Berkah Sejahtera",
    contact: "Putri Ayu",
    email: "putri@berkahsejahtera.com",
    phone: "+62 22 5555 0404",
    location: "Bandung",
    category: "Packaging",
    status: "inactive" as const,
    since: "2024",
  },
  {
    name: "PT Indalum Metal Works",
    contact: "Dwi Hartanto",
    email: "dwi@indalum.co.id",
    phone: "+62 24 5555 0505",
    location: "Semarang",
    category: "Raw Materials",
    status: "active" as const,
    since: "2023",
  },
  {
    name: "CV Teknindo Solusindo",
    contact: "Rina Marlina",
    email: "rina@teknindo.co.id",
    phone: "+62 61 5555 0606",
    location: "Medan",
    category: "Electronics",
    status: "active" as const,
    since: "2025",
  },
];

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="mt-1 text-muted-foreground">
            Manage supplier information, contracts, and performance.
          </p>
        </div>
        <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80">
          <PlusIcon className="size-4" />
          Add Supplier
        </button>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search suppliers..." className="pl-8" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier) => (
          <Card key={supplier.name}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <TruckIcon className="size-5" />
                  </div>
                  <div>
                    <CardTitle>{supplier.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{supplier.category}</p>
                  </div>
                </div>
                <Badge variant={supplier.status === "active" ? "default" : "secondary"} className={supplier.status === "active" ? "" : "capitalize"}>
                  {supplier.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Contact:</span>
                <span className="font-medium">{supplier.contact}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MailIcon className="size-3.5 shrink-0" />
                <span className="truncate">{supplier.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneIcon className="size-3.5 shrink-0" />
                <span>{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon className="size-3.5 shrink-0" />
                <span>{supplier.location}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Partner since {supplier.since}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
