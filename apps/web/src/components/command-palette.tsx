"use client";

import { CommandDialog } from "@simpra/ui/components/command";
import {
  HomeIcon,
  ShoppingCartIcon,
  PackageIcon,
  TruckIcon,
  BarChart3Icon,
  UsersIcon,
  SearchIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-72 items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <SearchIcon className="h-4 w-4" />
        Search…
        <kbd className="ml-auto text-xs text-muted-foreground">⌘K</kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <input placeholder="Type a command or search…" />
        <div className="pb-1 pt-1">
          <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            Navigation
          </p>
          <CommandItem
            icon={<HomeIcon />}
            onSelect={() => {
              setOpen(false);
              router.push("/dashboard");
            }}
          >
            Dashboard
          </CommandItem>
          <CommandItem
            icon={<PackageIcon />}
            onSelect={() => {
              setOpen(false);
              router.push("/dashboard/inventory");
            }}
          >
            Inventory
          </CommandItem>
          <CommandItem
            icon={<WarehouseIcon />}
            onSelect={() => {
              setOpen(false);
              router.push("/dashboard/warehouses");
            }}
          >
            Warehouses
          </CommandItem>
          <CommandItem
            icon={<SwapHorizontalIcon />}
            onSelect={() => {
              setOpen(false);
              router.push("/dashboard/stock");
            }}
          >
            Stock Operations
          </CommandItem>
          <CommandItem
            icon={<TruckIcon />}
            onSelect={() => {
              setOpen(false);
              router.push("/dashboard/suppliers");
            }}
          >
            Suppliers
          </CommandItem>
          <CommandItem
            icon={<ShoppingCartIcon />}
            onSelect={() => {
              setOpen(false);
              router.push("/dashboard/purchasing");
            }}
          >
            Purchasing
          </CommandItem>
          <CommandItem
            icon={<BarChart3Icon />}
            onSelect={() => {
              setOpen(false);
              router.push("/dashboard/reports");
            }}
          >
            Reports
          </CommandItem>
          <CommandItem
            icon={<BarChart3Icon />}
            onSelect={() => {
              setOpen(false);
              router.push("/dashboard/analytics");
            }}
          >
            Analytics
          </CommandItem>
          <CommandItem
            icon={<UsersIcon />}
            onSelect={() => {
              setOpen(false);
              router.push("/dashboard/settings");
            }}
          >
            Settings
          </CommandItem>
        </div>
      </CommandDialog>
    </>
  );
}

function CommandItem({
  icon,
  children,
  onSelect,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
    >
      {icon}
      {children}
    </button>
  );
}

function WarehouseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M3 21h18M3 7v14M9 7V3h6v4M21 7v14" />
    </svg>
  );
}

function SwapHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M3 12h18" />
    </svg>
  );
}
