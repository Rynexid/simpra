import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSession } from "@/lib/auth-session";
import { hasOrganization } from "@/lib/tenant";
import { auth } from "@/lib/auth";
import { OnboardingForm } from "./onboarding-form";

function slugify(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
  return `${base}-${Math.random().toString(36).slice(2, 7)}`;
}

interface Invite {
  email: string;
  role: "admin" | "member";
}

function collectInvites(formData: FormData): Invite[] {
  const invites: Invite[] = [];
  const seen = new Set<string>();
  for (const [key, value] of formData.entries()) {
    const match = key.match(/^invite-email-(\d+)$/);
    if (!match) continue;
    const email = String(value).trim().toLowerCase();
    if (!email || seen.has(email)) continue;
    seen.add(email);
    const role = formData.get(`invite-role-${match[1]}`) === "admin" ? "admin" : "member";
    invites.push({ email, role });
  }
  return invites;
}

export default async function OnboardingPage() {
  const user = await getSession();
  if (!user) {
    redirect("/login");
  }

  const hasOrg = await hasOrganization(user.id);
  if (hasOrg) {
    redirect("/dashboard");
  }

  async function handleCreateOrg(formData: FormData) {
    "use server";
    const headerStore = await headers();
    const companyName = String(formData.get("companyName") ?? "").trim();
    if (!companyName) {
      throw new Error("Company name is required");
    }

    const org = await auth.api.createOrganization({
      headers: headerStore,
      body: {
        name: companyName,
        slug: slugify(companyName),
        teamName: companyName,
        defaultTimezone: String(formData.get("timezone") ?? "").trim() || "Asia/Jakarta",
        currency: String(formData.get("currency") ?? "").trim() || "IDR",
        industry: String(formData.get("industry") ?? "").trim() || undefined,
        companySize: String(formData.get("companySize") ?? "").trim() || undefined,
      },
    });

    await auth.api.setActiveOrganization({
      headers: headerStore,
      body: { organizationId: org.id },
    });

    for (const invite of collectInvites(formData)) {
      await auth.api.createInvitation({
        headers: headerStore,
        body: { organizationId: org.id, email: invite.email, role: invite.role },
      });
    }
  }

  return <OnboardingForm createOrg={handleCreateOrg} />;
}
