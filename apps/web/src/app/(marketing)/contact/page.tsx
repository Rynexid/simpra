import { Button } from "@simpra/ui/components/button"
import Link from "next/link"

export const metadata = {
  title: "Contact",
  description: "Get in touch with the Simpra team.",
}

export default function ContactPage() {
  return (
    <section className="border-b border-border min-h-[calc(100vh-4rem)] flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 inline-flex border border-primary/30 px-4 py-1 text-sm font-medium text-primary">
            Contact
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl leading-[1.05]">
            Ready to simplify your inventory?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Join 150+ businesses already managing their warehouses with
            Simpra. Start free — no credit card required.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-base">
                Start Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              Book a Demo
            </Button>
          </div>

          <div className="mt-16 border border-border bg-card p-8 text-left max-w-lg mx-auto">
            <h3 className="text-sm font-semibold mb-4 text-center">Or reach us directly</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground w-20 shrink-0">Email</span>
                <a href="mailto:hello@simpra.io" className="text-primary hover:underline">
                  hello@simpra.io
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground w-20 shrink-0">Twitter</span>
                <a href="https://x.com/simpra" className="text-primary hover:underline">
                  @simpra
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground w-20 shrink-0">Office</span>
                <span className="text-muted-foreground">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
