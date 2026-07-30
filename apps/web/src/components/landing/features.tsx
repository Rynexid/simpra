"use client";

import { MarketingSection, SectionBadge, SectionHeading, SectionDescription } from "./marketing-section";
import Link from "next/link";
import { motion } from "motion/react";

const FEATURES_LIST = [
  {
    title: "Inventory Management",
    description: "Track every SKU with full lifecycle support — create, update, archive. Supports variants, bulk import/export, and low-stock alerts that actually work.",
    icon: "📦",
    href: "/inventory",
  },
  {
    title: "Warehouse Operations",
    description: "Multi-warehouse management with sub-locations, zones, and racks. Assign staff to specific warehouses for scoped visibility and operations.",
    icon: "🏭",
    href: "/warehouses",
  },
  {
    title: "Supplier & Purchasing",
    description: "Maintain supplier records with payment terms and purchase history. Create purchase orders that auto-generate stock-in entries on receipt.",
    icon: "🤝",
    href: "/suppliers",
  },
  {
    title: "Stock Opname",
    description: "Physical count reconciliation with automatic discrepancy detection. Route adjustments for approval when counts exceed configurable thresholds.",
    icon: "🔍",
    href: "/stock-opname",
  },
  {
    title: "Stock Transfer",
    description: "Atomic transfers between warehouses within the same organization. Row-level locking ensures no lost updates even under concurrent access.",
    icon: "🚛",
    href: "/stock/transfer",
  },
  {
    title: "Audit Log",
    description: "Immutable, append-only audit trail of every stock-affecting and access-affecting action. Viewable by Owner/Admin with full filter support.",
    icon: "🔒",
    href: "/audit-log",
  },
  {
    title: "Role & Permission",
    description: "Five built-in roles — Owner, Admin, Manager, Staff, Viewer. Custom roles for Enterprise tier. Server-side enforcement at every mutating request.",
    icon: "🛡️",
    href: "/settings/roles",
  },
  {
    title: "Notifications",
    description: "In-app notifications for low stock, pending approvals, and completed opname sessions. Configurable per-user notification preferences.",
    icon: "🔔",
    href: "/notifications",
  },
  {
    title: "Reports & Exports",
    description: "Standard reports for stock levels, movement history, and discrepancy summaries. Export to CSV/PDF with async generation for large datasets.",
    icon: "📄",
    href: "/reports",
  },
  {
    title: "Analytics Dashboard",
    description: "Visual dashboards with trends over time, top-moving items, warehouse comparisons, and stock accuracy metrics for data-driven decisions.",
    icon: "📈",
    href: "/analytics",
  },
  {
    title: "API Integration",
    description: "Versioned REST API at /api/v1 with idempotency keys, tenant-scoped auth, and standard error shapes. Built for your internal tools and future public integrations.",
    icon: "🔌",
    href: "/api/v1",
  },
  {
    title: "Barcode & QR",
    description: "Generate and scan barcodes/QR codes for inventory items. Support for camera scanning, external hardware scanners, and keyboard-emulation input.",
    icon: "📷",
    href: "/settings/barcode",
  },
];

export function Features() {
  return (
    <MarketingSection id="features">
      <div className="text-center">
        <SectionBadge>Features</SectionBadge>
        <SectionHeading>Everything you need, nothing you don&apos;t</SectionHeading>
        <SectionDescription>
          From procurement to reporting — Simpra covers the full inventory
          lifecycle in a single, unified platform.
        </SectionDescription>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES_LIST.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            viewport={{ once: true }}
            className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="text-2xl mb-3">{feature.icon}</div>
            <h3 className="text-base font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
            <Link
              href={feature.href}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
            >
              Learn more →
            </Link>
          </motion.div>
        ))}
      </div>
    </MarketingSection>
  );
}
