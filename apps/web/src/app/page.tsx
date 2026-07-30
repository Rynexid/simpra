import { Navigation } from "@/components/landing/navigation";
import { Hero } from "@/components/landing/hero";
import { ProductOverview } from "@/components/landing/product-overview";
import { Features } from "@/components/landing/features";
import { DashboardShowcase } from "@/components/landing/dashboard-showcase";
import { Workflow } from "@/components/landing/workflow";
import { Integrations } from "@/components/landing/integrations";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FinalCTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export const metadata = {
  title: "Simpra — Modern Inventory & Warehouse Management",
  description:
    "Simpra is a modern Inventory & Warehouse Management SaaS platform by Rynex. Manage inventory, warehouses, suppliers, purchasing, stock movement, and reporting from one cloud platform.",
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      <Hero />
      <ProductOverview />
      <Features />
      <DashboardShowcase />
      <Workflow />
      <Integrations />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
