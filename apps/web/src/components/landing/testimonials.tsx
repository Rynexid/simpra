import { MarketingSection, SectionBadge, SectionHeading } from "./marketing-section";

const TESTIMONIALS = [
  {
    name: "Budi Santoso",
    role: "Operations Manager, PT Guna Jaya",
    quote: "Simpra cut our stock discrepancy rate by 40% in the first month. The audit trail alone was worth the investment.",
    company: "PT Guna Jaya",
    avatar: "BS",
  },
  {
    name: "Sarah Wijaya",
    role: "Founder, CargoLink Logistics",
    quote: "We manage 3 warehouses and 12,000+ SKUs Simpra handles it effortlessly. The barcode scanning on mobile is a game-changer.",
    company: "CargoLink Logistics",
    avatar: "SW",
  },
  {
    name: "Andi Prasetyo",
    role: "CFO, Mitra Sejahtera Distributor",
    quote: "Finally, warehouse data we can trust. Procurement decisions are now backed by real-time inventory numbers.",
    company: "Mitra Sejahtera Distributor",
    avatar: "AP",
  },
];

export function Testimonials() {
  return (
    <MarketingSection id="testimonials">
      <div className="text-center">
        <SectionBadge>Customers</SectionBadge>
        <SectionHeading>Trusted by growing businesses</SectionHeading>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.name}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex items-center gap-1 text-primary">
              {"★★★★★".split("").map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
              <blockquote className="mt-4 text-lg leading-relaxed">
                {testimonial.quote}
              </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {testimonial.avatar}
              </div>
              <div>
                <p className="text-sm font-medium">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {[
          { value: "150+", label: "Businesses onboarded" },
          { value: "12K+", label: "SKUs managed" },
          { value: "99.9%", label: "Uptime SLA" },
          { value: "24/7", label: "Support coverage" },
        ].map((stat) => (
          <div key={stat.value} className="text-center">
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </MarketingSection>
  );
}
