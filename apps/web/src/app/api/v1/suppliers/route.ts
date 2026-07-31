import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-session";
import { DrizzleSupplierRepository, createSupplier, listSuppliers } from "@/lib/repositories";
import { getOrganizationIdForUser } from "@/lib/tenant";

const repository = new DrizzleSupplierRepository();

export async function GET(request: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizationId = await getOrganizationIdForUser(user.id);

  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const sort = searchParams.get("sort") || "created_at";

  const result = await listSuppliers(
    organizationId,
    { page, pageSize, sort },
    repository
  );

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizationId = await getOrganizationIdForUser(user.id);

  const body = await request.json();
  const item = await createSupplier(
    { ...body, organizationId },
    repository
  );

  return NextResponse.json(item, { status: 201 });
}
