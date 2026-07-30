"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  LayoutDashboardIcon,
  PackageIcon,
  WarehouseIcon,
  ArrowLeftRightIcon,
  TruckIcon,
  ShoppingCartIcon,
  BarChart3Icon,
  TrendingUpIcon,
  SettingsIcon,
  GalleryVerticalEndIcon,
} from "lucide-react"
import { usePathname } from "next/navigation"

type User = {
  id: string
  email: string
  name: string
  image?: string | null
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
  { label: "Inventory", href: "/dashboard/inventory", icon: PackageIcon },
  { label: "Warehouses", href: "/dashboard/warehouses", icon: WarehouseIcon },
  { label: "Stock Ops", href: "/dashboard/stock", icon: ArrowLeftRightIcon },
  { label: "Suppliers", href: "/dashboard/suppliers", icon: TruckIcon },
  { label: "Purchasing", href: "/dashboard/purchasing", icon: ShoppingCartIcon },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3Icon },
  { label: "Analytics", href: "/dashboard/analytics", icon: TrendingUpIcon },
  { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
]

export function AppSidebar({
  user,
  ...props
}: { user: User } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={[
            {
              name: "Simpra",
              logo: <GalleryVerticalEndIcon />,
              plan: "Enterprise",
            },
          ]}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/")
              const Icon = item.icon
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    tooltip={item.label}
                    isActive={isActive}
                    render={<a href={item.href} />}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name,
            email: user.email,
            avatar: user.image ?? "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
