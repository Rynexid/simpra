"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Integrations", href: "/integrations" },
  { label: "Documentation", href: "https://docs.simpra.io" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">S</span>
          </div>
          <span>Simpra</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <Link href="/" className="font-semibold">
              Simpra
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t pt-4">
              <Link
                href="/register"
                className="rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
