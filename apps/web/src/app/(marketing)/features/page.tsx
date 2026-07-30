import {
  Package,
  Warehouse,
  ShoppingCart,
  Search,
  Truck,
  Shield,
  Users,
  Bell,
  FileText,
  BarChart3,
  Plug,
  QrCode,
} from "lucide-react"

export const metadata = {
  title: "Features",
  description: "Everything you need to manage inventory, warehouses, suppliers, and more.",
}

const FEATURES = [
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Track every SKU with full lifecycle support. Variants, bulk import/export, and low-stock alerts that actually work.",
  },
  {
    icon: Warehouse,
    title: "Warehouse Operations",
    description:
      "Multi-warehouse with sub-locations, zones, and racks. Assign staff to specific warehouses for scoped visibility.",
  },
  {
    icon: ShoppingCart,
    title: "Supplier & Purchasing",
    description:
      "Supplier records with payment terms and history. Purchase orders that auto-generate stock-in entries on receipt.",
  },
  {
    icon: Search,
    title: "Stock Opname",
    description:
      "Physical count reconciliation with automatic discrepancy detection. Route adjustments for approval.",
  },
  {
    icon: Truck,
    title: "Stock Transfer",
    description:
      "Atomic transfers between warehouses. Row-level locking ensures no lost updates under concurrent access.",
  },
  {
    icon: Shield,
    title: "Audit Log",
    description:
      "Immutable, append-only trail of every stock-affecting and access-affecting action. Viewable with full filter support.",
  },
  {
    icon: Users,
    title: "Role & Permissions",
    description:
      "Five built-in roles — Owner, Admin, Manager, Staff, Viewer. Server-side enforcement at every mutating request.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "In-app notifications for low stock, pending approvals, and completed opname sessions. Configurable preferences.",
  },
  {
    icon: FileText,
    title: "Reports & Exports",
    description:
      "Stock levels, movement history, discrepancy summaries. Export to CSV/PDF with async generation.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Visual dashboards with trends, top-moving items, warehouse comparisons, and stock accuracy metrics.",
  },
  {
    icon: Plug,
    title: "API Integration",
    description:
      "Versioned REST API with idempotency keys, tenant-scoped auth, and standard error shapes.",
  },
  {
    icon: QrCode,
    title: "Barcode & QR",
    description:
      "Generate and scan barcodes/QR codes. Support for camera scanning and external hardware scanners.",
  },
]

export default function FeaturesPage() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 inline-flex border border-primary/30 px-4 py-1 text-sm font-medium text-primary">
            Features
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl leading-[1.05]">
            Everything you need, nothing you don&apos;t
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            From procurement to reporting — Simpra covers the full inventory
            lifecycle in a single, unified platform.
          </p>
        </div>

        <div className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-3 border border-border bg-border">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="bg-card p-8">
              <div className="flex h-10 w-10 items-center justify-center border border-border bg-background">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
