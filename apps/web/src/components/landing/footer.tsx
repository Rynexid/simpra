import Link from "next/link";
import Image from "next/image";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Integrations", href: "/integrations" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "https://docs.simpra.io" },
      { label: "API Reference", href: "/api/v1" },
      { label: "Blog", href: "https://blog.simpra.io" },
      { label: "Changelog", href: "https://changelog.simpra.io" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR", href: "/gdpr" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center">
              <Image src="/simpraLogo.webp" alt="Simpra" width={120} height={32} className="h-8 w-auto" />
              <span className="ml-2 font-semibold text-lg">Simpra</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Modern Inventory & Warehouse Management SaaS by Rynex Studio.
              Built for Indonesian businesses, designed for the world.
            </p>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold">{column.title}</h4>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PT Rynex Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-primary">Terms of Service</Link>
            <Link href="/cookies" className="transition-colors hover:text-primary">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
