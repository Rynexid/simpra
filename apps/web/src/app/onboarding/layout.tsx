import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-session";
import { hasOrganization } from "@/lib/tenant";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  if (!user) {
    redirect("/login");
  }

  const hasOrg = await hasOrganization(user.id);
  if (hasOrg) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
