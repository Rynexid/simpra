import { MarketingSection, SectionHeading, SectionDescription } from "./marketing-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FinalCTA() {
  return (
    <MarketingSection id="contact">
      <div className="relative overflow-hidden rounded-3xl bg-primary/10 border border-primary/20 p-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative">
          <SectionHeading className="text-3xl sm:text-4xl lg:text-5xl">
            Ready to simplify your inventory?
          </SectionHeading>
          <SectionDescription className="mx-auto mt-4 max-w-lg">
            Join 150+ businesses already managing their warehouses with
            Simpra. Start free — no credit card required.
          </SectionDescription>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="h-12 px-8">
                Start Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </MarketingSection>
  );
}
