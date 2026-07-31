import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-session";
import { DrizzleStockTransactionRepository, listStockTransactions, createStockTransaction } from "@/lib/repositories";
import { getOrganizationIdForUser } from "@/lib/tenant";

const repository = new DrizzleStockTransactionRepository();

export async function GET(request: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizationId = await getOrganizationIdForUser(user.id);

  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 20;

  const result = await listStockTransactions(organizationId, { page, pageSize }, repository);

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizationId = await getOrganizationIdForUser(user.id);
  const body = await request.json();
  const item = await createStockTransaction({ ...body, organizationId, performedBy: user.id }, repository);

  return NextResponse.json(item, { status: 201 });
}
