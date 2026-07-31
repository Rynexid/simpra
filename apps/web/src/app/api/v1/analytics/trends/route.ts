import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-session";
import { DrizzleAnalyticsRepository, getMonthlyTrends } from "@/lib/repositories";
import { getOrganizationIdForUser } from "@/lib/tenant";

const repository = new DrizzleAnalyticsRepository();

export async function GET(request: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizationId = await getOrganizationIdForUser(user.id);

  const searchParams = request.nextUrl.searchParams;
  const months = Number(searchParams.get("months")) || 6;

  const result = await getMonthlyTrends(organizationId, months, repository);

  return NextResponse.json(result);
}
