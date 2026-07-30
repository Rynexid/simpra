import Link from "next/link";
import {
  Warehouse,
  ShoppingCart,
  BarChart3,
  RefreshCw,
  Globe,
} from "lucide-react";
import { MarketingSection, SectionBadge, SectionHeading, SectionDescription } from "./marketing-section";
import { BentoGrid } from "./bento-grid";

const FEATURES = [
  {
    icon: Warehouse,
    title: "Smart Inventory",
    description: "Track every SKU, variant, and batch with atomic stock operations. Real-time counts updated on every transaction.",
    href: "/inventory",
  },
  {
    icon: Warehouse,
    title: "Multi-Warehouse",
    description: "Manage multiple locations from a single dashboard. Scope permissions per warehouse and monitor stock across sites.",
    href: "/warehouses",
  },
  {
    icon: ShoppingCart,
    title: "Purchase Orders",
    description: "Create, submit, and track purchase orders linked to suppliers. Auto-receipt generates corresponding stock-in entries.",
    href: "/purchasing",
  },
  {
    icon: RefreshCw,
    title: "Supplier Hub",
    description: "Maintain supplier records, track payment terms, and view purchase history. One place for every vendor relationship.",
    href: "/suppliers",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Visual dashboards with trends over time, top-moving items, warehouse comparisons, and stock accuracy metrics.",
    href: "/analytics",
  },
  {
    icon: Globe,
    title: "Cloud Sync",
    description: "Every operation syncs instantly across devices. Access your data from any browser, desktop, or mobile.",
    href: "/settings",
  },
];

export function ProductOverview() {
  return (
    <MarketingSection id="features">
      <div className="text-center">
        <SectionBadge>Platform</SectionBadge>
        <SectionHeading>Everything to run your warehouse</SectionHeading>
        <SectionDescription>
          From procurement to reporting — Simpra covers the full inventory lifecycle
          in a single, unified platform.
        </SectionDescription>
      </div>

      <div className="mt-16">
        <BentoGrid>
          {FEATURES.slice(0, 3).map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
          <FeatureCard
            key={FEATURES[3].title}
            feature={FEATURES[3]}
            className="sm:col-span-2"
          />
          <FeatureCard key={FEATURES[4].title} feature={FEATURES[4]} />
          <FeatureCard key={FEATURES[5].title} feature={FEATURES[5]} />
        </BentoGrid>
      </div>
    </MarketingSection>
  );
}

function FeatureCard({
  feature,
  className,
}: {
  feature: { icon: React.ElementType; title: string; description: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={`group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${
        className ?? ""
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <feature.icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
      <Link
        href={feature.href}
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
      >
        Learn more →
      </Link>
    </div>
  );
}
