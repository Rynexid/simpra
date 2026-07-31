import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { PostHogIdentify } from "@/components/posthog-identify";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@simpra/ui/components/sidebar";
import { Separator } from "@simpra/ui/components/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@simpra/ui/components/breadcrumb";
import { getSession } from "@/lib/auth-session";
import { hasOrganization, getOrganization } from "@/lib/tenant";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  const hasOrg = await hasOrganization(user.id);
  if (!hasOrg) {
    redirect("/onboarding");
  }

  const org = await getOrganization(user.id);

  return (
    <SidebarProvider>
      <PostHogIdentify user={user} />
      <AppSidebar user={user} organization={org ?? undefined} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Simpra</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
