import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-session";
import { DrizzleSettingsRepository, getNotificationSettings, updateNotificationSettings } from "@/lib/repositories";
import { getOrganizationIdForUser } from "@/lib/tenant";

const repository = new DrizzleSettingsRepository();

export async function GET() {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizationId = await getOrganizationIdForUser(user.id);
  const settings = await getNotificationSettings(organizationId, repository);

  return NextResponse.json(settings);
}

export async function PATCH(request: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizationId = await getOrganizationIdForUser(user.id);
  const body = await request.json();
  const settings = await updateNotificationSettings(
    { ...body, organizationId },
    repository
  );

  return NextResponse.json(settings);
}
