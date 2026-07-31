import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-session";
import { DrizzleWarehouseRepository, createWarehouse, listWarehouses } from "@/lib/repositories";
import { getOrganizationIdForUser } from "@/lib/tenant";

const repository = new DrizzleWarehouseRepository();

export async function GET() {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizationId = await getOrganizationIdForUser(user.id);
  const items = await listWarehouses(organizationId, repository);

  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizationId = await getOrganizationIdForUser(user.id);
  const body = await request.json();
  const item = await createWarehouse(
    { ...body, organizationId },
    repository
  );

  return NextResponse.json(item, { status: 201 });
}
