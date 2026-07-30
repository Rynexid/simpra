"use client";

import { MarketingSection, SectionBadge, SectionHeading, SectionDescription } from "./marketing-section";
import { motion } from "motion/react";

const STEPS = [
  {
    label: "Purchase",
    description: "Create purchase orders linked to suppliers and inventory items.",
    icon: "📋",
  },
  {
    label: "Receiving",
    description: "Record goods received against purchase orders automatically.",
    icon: "📦",
  },
  {
    label: "Warehouse",
    description: "Assign stock to warehouses, sub-locations, zones, and racks.",
    icon: "🏭",
  },
  {
    label: "Inventory",
    description: "Track every SKU, variant, batch, and reorder threshold.",
    icon: "📊",
  },
  {
    label: "Transfer",
    description: "Move stock between warehouses atomically with row-level locking.",
    icon: "🔄",
  },
  {
    label: "Reports",
    description: "Generate operational reports — stock levels, movement history, discrepancies.",
    icon: "📄",
  },
  {
    label: "Analytics",
    description: "Visual dashboards with trends, top-moving items, and comparisons.",
    icon: "📈",
  },
  {
    label: "Growth",
    description: "Data-driven decisions that scale your business across locations.",
    icon: "🚀",
  },
];

export function Workflow() {
  return (
    <MarketingSection id="workflow">
      <div className="text-center">
        <SectionBadge>Workflow</SectionBadge>
        <SectionHeading>From purchase to growth</SectionHeading>
        <SectionDescription>
          Simpra tracks every step of your inventory journey — automatically.
        </SectionDescription>
      </div>

      <div className="mt-16 relative">
        <div className="absolute left-4 top-0 bottom-0 hidden w-px bg-border md:block md:left-1/2 md:-translate-x-px" />

        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
          {STEPS.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`relative flex items-start gap-4 md:flex-col md:items-center md:text-center ${
                  isLeft ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold">{step.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {!isLeft && (
                  <div className="hidden md:block absolute -left-6 top-2 h-2 w-2 rounded-full bg-primary" />
                )}
                {isLeft && (
                  <div className="hidden md:block absolute -right-6 top-2 h-2 w-2 rounded-full bg-primary" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </MarketingSection>
  );
}
