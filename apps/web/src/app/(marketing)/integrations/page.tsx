export const metadata = {
  title: "Integrations",
  description: "Simpra connects with the tools you already use.",
}

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
  { name: "Slack", icon: "💬" },
  { name: "Zapier", icon: "⚡" },
  { name: "Custom", icon: "🔧" },
]

export default function IntegrationsPage() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 inline-flex border border-primary/30 px-4 py-1 text-sm font-medium text-primary">
            Integrations
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl leading-[1.05]">
            Connects with your stack
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Simpra integrates with the tools you already use so your team can
            keep working without disruption.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-4 border border-border bg-border">
          {INTEGRATIONS.map((integration) => (
            <div
              key={integration.name}
              className="bg-card p-8 text-center hover:bg-accent/50 transition-colors"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center border border-border bg-background text-2xl">
                {integration.icon}
              </div>
              <p className="text-sm font-medium">{integration.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-border bg-card p-8 text-center">
          <h3 className="text-lg font-semibold">Need a custom integration?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We offer custom integration support for Enterprise plans.
          </p>
          <a
            href="/contact"
            className="mt-4 inline-flex h-10 items-center justify-center border border-border px-6 text-sm font-medium hover:bg-accent transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
