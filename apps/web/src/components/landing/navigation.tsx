"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, UserIcon } from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Integrations", href: "/integrations" },
  { label: "Documentation", href: "https://docs-simpra.vercel.app" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image src="/simpraLogo.webp" alt="Simpra" width={120} height={32} className="h-8 w-auto" />
          <span className="ml-2 font-semibold text-lg">Simpra</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <Link
              href="/dashboard"
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-muted transition-colors hover:border-primary"
            >
              {user.image ? (
                <Image src={user.image} alt={user.name} width={36} height={36} className="h-full w-full object-cover" />
              ) : (
                <UserIcon className="h-4 w-4 text-muted-foreground" />
              )}
            </Link>
          ) : (
            <Link href="/register">
              <span className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
                Get Started
              </span>
            </Link>
          )}
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-primary md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <Link href="/" className="flex items-center">
              <Image src="/simpraLogo.webp" alt="Simpra" width={120} height={32} className="h-8 w-auto" />
              <span className="ml-2 font-semibold text-lg">Simpra</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
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
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Link
                href="/dashboard"
                className="mt-4 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/register"
                className="mt-4 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
