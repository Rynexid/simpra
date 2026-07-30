import { ReactNode } from "react";

interface MarketingSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function MarketingSection({ children, className, id }: MarketingSectionProps) {
  return (
    <section id={id} className={`relative py-20 sm:py-24 lg:py-32 ${className ?? ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
      {children}
    </div>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${className ?? ""}`}>
      {children}
    </h2>
  );
}

export function SectionDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`mt-4 text-lg text-muted-foreground sm:text-xl ${className ?? ""}`}>
      {children}
    </p>
  );
}
