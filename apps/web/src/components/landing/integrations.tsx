import { MarketingSection, SectionBadge, SectionHeading, SectionDescription } from "./marketing-section";

const INTEGRATIONS = [
  { name: "REST API", icon: "🔌" },
  { name: "Barcode Scanner", icon: "📷" },
  { name: "QR Code", icon: "📱" },
  { name: "Email", icon: "✉️" },
  { name: "WhatsApp", icon: "💬" },
  { name: "Accounting", icon: "📊" },
  { name: "POS", icon: "🖥️" },
  { name: "Webhooks", icon: "🪝" },
  { name: "Cloud Storage", icon: "☁️" },
];

export function Integrations() {
  return (
    <MarketingSection id="integrations">
      <div className="text-center">
        <SectionBadge>Integrations</SectionBadge>
        <SectionHeading>Connects with your stack</SectionHeading>
        <SectionDescription>
          Simpra integrates with the tools you already use so your team can
          keep working without disruption.
        </SectionDescription>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {INTEGRATIONS.map((integration) => (
          <div
            key={integration.name}
            className="group rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-md"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
              {integration.icon}
            </div>
            <p className="text-sm font-medium">{integration.name}</p>
          </div>
        ))}
      </div>
    </MarketingSection>
  );
}
