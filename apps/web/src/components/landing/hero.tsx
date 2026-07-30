"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Truck, Package, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50"
          style={{
            backgroundPosition: `${mousePos.x * 0.02}px ${mousePos.y * 0.02}px`,
          }}
        />
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Now in Public Beta
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl"
          >
            Modern Inventory &{" "}
            <span className="text-primary">Warehouse</span> Management
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground sm:text-xl lg:text-2xl"
          >
            Stop losing stock to spreadsheets. Manage inventory, warehouses, suppliers,
            and purchasing from one cloud platform built for speed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/dashboard">
              <Button size="lg" className="h-12 px-8">
                Start Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-12 px-8">
              Book Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Free to start
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              No credit card
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Setup in minutes
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-black/5">
            <div className="rounded-xl bg-background overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <div className="flex h-3 w-3 rounded-full bg-destructive/80" />
                <div className="flex h-3 w-3 rounded-full bg-warning/80" />
                <div className="flex h-3 w-3 rounded-full bg-primary/80" />
                <span className="ml-3 text-xs text-muted-foreground">simpra.io/dashboard</span>
              </div>
              <div className="relative aspect-video bg-gradient-to-br from-card to-muted/30 p-6">
                <div className="grid h-full grid-cols-3 gap-4">
                  <StatCard
                    label="Total Inventory"
                    value="12,847"
                    change="+12.5%"
                    icon={Package}
                  />
                  <StatCard
                    label="Warehouses"
                    value="8"
                    change="Active"
                    icon={Truck}
                  />
                  <StatCard
                    label="Low Stock Alerts"
                    value="23"
                    change="-8.2%"
                    icon={BarChart3}
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 h-16 rounded-lg bg-muted/50" />
              </div>
            </div>
          </div>

          <div className="absolute -right-4 top-1/4 hidden lg:block">
            <div className="rounded-xl border border-border bg-card p-4 shadow-lg shadow-black/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Audit Log</p>
                  <p className="text-xs text-muted-foreground">2,431 entries today</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-4 top-1/3 hidden lg:block">
            <div className="rounded-xl border border-border bg-card p-4 shadow-lg shadow-black/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Stock Transfer</p>
                  <p className="text-xs text-muted-foreground">Last: WH-A → WH-B</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) {
  const isPositive = change.startsWith("+") || change === "Active";

  return (
    <div className="rounded-lg border border-border bg-card/80 p-4 backdrop-blur">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
      <p
        className={`text-xs font-medium ${
          isPositive ? "text-primary" : "text-destructive"
        }`}
      >
        {change}
      </p>
    </div>
  );
}

export const HeroFloatingCard = ({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) => (
  <StatCard label={label} value={value} change={change} icon={Icon} />
);
