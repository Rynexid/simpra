import { MarketingSection, SectionBadge, SectionHeading, SectionDescription } from "./marketing-section";

const DEVICES = [
  {
    name: "Desktop",
    width: "w-[60%]",
    mockup: (
      <div className="aspect-video rounded-lg bg-gradient-to-br from-card to-muted/30 p-4">
        <div className="grid h-full grid-cols-3 gap-3">
          <div className="col-span-2 rounded-lg bg-muted/20 p-3" />
          <div className="flex flex-col gap-3">
            <div className="h-20 rounded-lg bg-muted/20" />
            <div className="h-20 rounded-lg bg-muted/20" />
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Tablet",
    width: "w-[45%]",
    mockup: (
      <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-card to-muted/30 p-4">
        <div className="h-full flex flex-col gap-3">
          <div className="h-12 rounded-lg bg-muted/20" />
          <div className="flex-1 rounded-lg bg-muted/20" />
          <div className="h-16 rounded-lg bg-muted/20" />
        </div>
      </div>
    ),
  },
  {
    name: "Mobile",
    width: "w-[30%]",
    mockup: (
      <div className="aspect-[9/16] rounded-lg bg-gradient-to-br from-card to-muted/30 p-3">
        <div className="h-full flex flex-col gap-2">
          <div className="h-8 rounded-lg bg-muted/20" />
          <div className="flex-1 rounded-lg bg-muted/20" />
          <div className="h-8 rounded-lg bg-muted/20" />
        </div>
      </div>
    ),
  },
];

export function DashboardShowcase() {
  return (
    <MarketingSection id="dashboard">
      <div className="text-center">
        <SectionBadge>Dashboard</SectionBadge>
        <SectionHeading>Built for warehouse teams</SectionHeading>
        <SectionDescription>
          Real-time inventory views that work on every device — from the
          desktop to the warehouse floor.
        </SectionDescription>
      </div>

      <div className="mt-16 flex items-end justify-center gap-6 overflow-x-auto pb-4">
        {DEVICES.map((device) => (
          <div
            key={device.name}
            className={`${device.width} shrink-0 rounded-2xl border border-border bg-card p-4 shadow-xl shadow-black/5 transition-transform hover:scale-[1.02]`}
          >
            {device.mockup}
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {device.name}
            </p>
          </div>
        ))}
      </div>
    </MarketingSection>
  );
}
