import Link from "next/link"
import {
  ArrowRight,
  Package,
  Warehouse,
  ShoppingCart,
  Truck,
  BarChart3,
  Scan,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@simpra/ui/components/button"

export const metadata = {
  title: "Simpra — Modern Inventory & Warehouse Management",
  description:
    "Simpra is a modern Inventory & Warehouse Management SaaS platform. Manage inventory, warehouses, suppliers, purchasing, stock movement, and reporting from one cloud platform.",
  keywords: ["inventory management", "warehouse management", "stock tracking", "SME inventory", "warehouse software", "Simpra", "Rynex Studio", "Indonesia inventory software"],
  authors: [{ name: "Rynex Studio" }],
  creator: "Rynex Studio",
  publisher: "Rynex Studio",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://simpra.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: {
      default: "Simpra — Modern Inventory & Warehouse Platform",
      template: "%s | Simpra",
    },
    description:
      "Manage inventory, warehouses, suppliers, purchasing, and stock movement from one modern platform.",
    url: "/",
    siteName: "Simpra",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Simpra — Modern Inventory & Warehouse Platform",
      template: "%s | Simpra",
    },
    description:
      "Manage inventory, warehouses, suppliers, purchasing, and stock movement from one modern platform.",
  },
};

const FEATURES = [
  {
    icon: Package,
    title: "Inventory",
    desc: "Track every SKU, variant, and batch with real-time counts updated on every transaction. Low-stock alerts that actually work.",
  },
  {
    icon: Warehouse,
    title: "Warehouses",
    desc: "Multi-warehouse with sub-locations, zones, and racks. Assign staff to specific warehouses for scoped visibility.",
  },
  {
    icon: ShoppingCart,
    title: "Purchasing",
    desc: "Supplier records with payment terms and history. Purchase orders that auto-generate stock-in entries on receipt.",
  },
  {
    icon: Truck,
    title: "Transfers",
    desc: "Atomic transfers between warehouses. Row-level locking ensures no lost updates under concurrent access.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    desc: "Visual dashboards with trends, top-moving items, warehouse comparisons, and stock accuracy metrics.",
  },
  {
    icon: Scan,
    title: "Barcode & QR",
    desc: "Generate and scan barcodes/QR codes. Support for camera scanning and external hardware scanners.",
  },
]

const STEPS = [
  { icon: ShoppingCart, label: "Purchase", desc: "Create orders linked to suppliers" },
  { icon: Package, label: "Receive", desc: "Record goods received automatically" },
  { icon: Warehouse, label: "Stock", desc: "Assign to warehouses and zones" },
  { icon: BarChart3, label: "Analyze", desc: "Reports, trends, and decisions" },
]

const TESTIMONIALS = [
  {
    quote: "Simpra cut our stock discrepancy rate by 40% in the first month. The audit trail alone was worth the investment.",
    name: "Budi Santoso",
    role: "Operations Manager, PT Guna Jaya",
    initial: "BS",
  },
  {
    quote: "We manage 3 warehouses and 12,000+ SKUs. Simpra handles it effortlessly.",
    name: "Sarah Wijaya",
    role: "Founder, CargoLink Logistics",
    initial: "SW",
  },
  {
    quote: "Procurement decisions are now backed by real-time inventory numbers. Finally, warehouse data we can trust.",
    name: "Andi Prasetyo",
    role: "CFO, Mitra Sejahtera",
    initial: "AP",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <svg className="absolute inset-0 h-full w-full opacity-[0.03]" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/[0.04] blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-32 lg:pt-40 lg:pb-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 border border-primary/30 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Now in Public Beta
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl leading-[1.05]">
              Inventory & Warehouse,
              <br />
              <span className="text-primary">finally simple.</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Stop losing stock to spreadsheets. Manage inventory, warehouses,
              suppliers, and purchasing from one platform built for speed.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-base">
                  Start Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                  Explore Features
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              {[
                "Free to start",
                "No credit card",
                "Setup in minutes",
              ].map((text, i) => (
                <div key={text} className={`flex items-center gap-2 ${i === 0 ? "" : "hidden sm:flex"}`}>
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Hero visualization */}
          <div className="mt-16 mx-auto max-w-5xl">
            <div className="border border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-destructive/80" />
                <div className="h-3 w-3 rounded-full bg-warning/80" />
                <div className="h-3 w-3 rounded-full bg-primary/80" />
                <span className="ml-3 text-xs text-muted-foreground">simpra.io/dashboard</span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Total SKUs", value: "12,847", change: "+3.2%" },
                    { label: "In Stock", value: "98.4%", change: "+1.1%" },
                    { label: "Pending PO", value: "23", change: "-5" },
                  ].map((stat) => (
                    <div key={stat.label} className="border border-border bg-background/50 p-4">
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="mt-1 text-2xl font-bold tracking-tight">{stat.value}</p>
                      <p className="mt-1 text-xs text-primary">{stat.change}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border border-border bg-background/50 p-4">
                  <svg viewBox="0 0 600 120" className="w-full h-24 sm:h-32">
                    <defs>
                      <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(155, 100%, 30%)" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="hsl(155, 100%, 30%)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 100 Q40 80 80 85 T160 70 T240 75 T320 50 T400 55 T480 30 T560 35 T600 20 L600 120 L0 120 Z"
                      fill="url(#chart-gradient)"
                    />
                    <path
                      d="M0 100 Q40 80 80 85 T160 70 T240 75 T320 50 T400 55 T480 30 T560 35 T600 20"
                      fill="none" stroke="hsl(155, 100%, 30%)" strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 inline-flex border border-primary/30 px-4 py-1 text-sm font-medium text-primary">
              Core Capabilities
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.1]">
              Built for how you actually work
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every feature designed to remove friction from your inventory operations.
            </p>
          </div>

          <div className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-3 border border-border bg-border">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="bg-card p-8 group">
                <div className="flex h-10 w-10 items-center justify-center border border-border bg-background">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 inline-flex border border-primary/30 px-4 py-1 text-sm font-medium text-primary">
              Workflow
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.1]">
              From purchase to insight
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Simpra tracks every step of your inventory journey — automatically.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.label} className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border bg-background">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Step {i + 1}</p>
                    <h3 className="text-base font-semibold">{step.label}</h3>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground pl-16">
                  {step.desc}
                </p>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-12 w-[calc(100%-3rem)] h-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 inline-flex border border-primary/30 px-4 py-1 text-sm font-medium text-primary">
              Customers
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.1]">
              Trusted by growing businesses
            </h2>
          </div>

          <div className="mt-16 grid gap-px md:grid-cols-3 border border-border bg-border">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-card p-8 flex flex-col">
                <blockquote className="flex-1 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border">
                  <div className="flex h-9 w-9 items-center justify-center border border-border bg-background text-xs font-semibold">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.1]">
              Ready to simplify your inventory?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join 150+ businesses already managing their warehouses with Simpra.
              Start free — no credit card required.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-base">
                  Start Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                  Book Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
