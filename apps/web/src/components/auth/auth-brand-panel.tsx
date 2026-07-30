import { Package, Warehouse, ShoppingCart, BarChart3, Shield } from "lucide-react"

export function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-background border-r border-border">
      <div className="absolute inset-0 -z-10">
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="brand-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brand-grid)" />
        </svg>
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[120px]" />
      </div>

      <div className="flex flex-col justify-between w-full p-12">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">S</span>
            </div>
            <span className="text-xl font-semibold">Simpra</span>
          </div>
        </div>

        <div className="max-w-md">
          <h2 className="text-3xl font-bold tracking-tight leading-[1.1]">
            Inventory & Warehouse,
            <br />
            <span className="text-primary">finally simple.</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Stop losing stock to spreadsheets. Manage inventory, warehouses,
            suppliers, and purchasing from one platform built for speed.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { icon: Package, label: "12K+ SKUs" },
              { icon: Warehouse, label: "Multi-Warehouse" },
              { icon: ShoppingCart, label: "Auto PO Receipt" },
              { icon: BarChart3, label: "Real-time Analytics" },
              { icon: Shield, label: "Audit Trail" },
              { icon: BarChart3, label: "Barcode Scanning" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 border border-border bg-card/50 p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-background">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Built with Next.js, Hono, and Bun</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <span>v1.0 Beta</span>
        </div>
      </div>
    </div>
  )
}
