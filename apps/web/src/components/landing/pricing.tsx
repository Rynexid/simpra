import { MarketingSection, SectionBadge, SectionHeading, SectionDescription } from "./marketing-section";

const PLANS = [
  {
    name: "Starter",
    description: "For small teams getting started with inventory management.",
    price: "Free",
    pricePeriod: "",
    features: [
      "Up to 500 SKUs",
      "1 warehouse",
      "Stock in/out operations",
      "Basic reports",
      "Email support",
    ],
    cta: "Get Started",
    variant: "outline" as const,
  },
  {
    name: "Business",
    description: "For growing businesses with multiple warehouses and teams.",
    price: "49",
    pricePeriod: "/user/month",
    features: [
      "Unlimited SKUs",
      "Up to 10 warehouses",
      "Purchase orders",
      "Advanced analytics",
      "Barcode scanning",
      "Audit log",
      "Priority support",
    ],
    cta: "Start Free Trial",
    variant: "default" as const,
  },
  {
    name: "Enterprise",
    description: "For organizations that need full control and customization.",
    price: "Custom",
    pricePeriod: "",
    features: [
      "Everything in Business",
      "Unlimited warehouses",
      "Custom roles & permissions",
      "API access",
      "SSO / SAML",
      "Dedicated support",
      "SLA guarantee",
      "Onboarding assistance",
    ],
    cta: "Contact Sales",
    variant: "default" as const,
  },
];

export function Pricing() {
  return (
    <MarketingSection id="pricing">
      <div className="text-center">
        <SectionBadge>Pricing</SectionBadge>
        <SectionHeading>Simple, transparent pricing</SectionHeading>
        <SectionDescription>
          Choose the plan that fits your business. Upgrade anytime.
        </SectionDescription>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-8 ${
              plan.variant === "default"
                ? "border-primary bg-card shadow-lg shadow-primary/5"
                : "border-border bg-card"
            }`}
          >
            {plan.name === "Business" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                Most Popular
              </div>
            )}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {plan.description}
            </p>
            <div className="mt-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.pricePeriod && (
                <span className="text-sm text-muted-foreground">
                  {plan.pricePeriod}
                </span>
              )}
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <svg
                    className="h-4 w-4 text-primary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
             <div className="mt-8">
               {plan.variant === "default" ? (
                  <a
                    href="/register"
                   className="flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                 >
                   {plan.cta}
                 </a>
               ) : (
                 <a
                   href="/contact"
                   className="flex h-10 w-full items-center justify-center rounded-lg border border-input bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                 >
                   {plan.cta}
                 </a>
               )}
             </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-card p-8">
        <h3 className="text-lg font-semibold text-center">
          Frequently Asked Questions
        </h3>
        <div className="mt-6 space-y-4">
          <FAQ
            question="Can I upgrade or downgrade my plan?"
            answer="Yes, you can change plans anytime. Changes take effect at the next billing cycle."
          />
          <FAQ
            question="Is there a free trial?"
            answer="The Starter plan is free forever. Business plan includes a 14-day free trial."
          />
          <FAQ
            question="What happens if I exceed my SKU limit?"
            answer="We'll notify you and you can upgrade at any time. No hidden overage fees."
          />
          <FAQ
            question="Do you offer annual billing?"
            answer="Yes, annual billing saves 20% compared to monthly. Contact us for enterprise pricing."
          />
        </div>
      </div>
    </MarketingSection>
  );
}

function FAQ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{question}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{answer}</p>
    </div>
  );
}
