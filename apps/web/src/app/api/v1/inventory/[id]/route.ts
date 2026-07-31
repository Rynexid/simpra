import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-session";
import { DrizzleInventoryItemRepository, getInventoryItem, updateInventoryItem, archiveInventoryItem } from "@/lib/repositories";
import { getOrganizationIdForUser } from "@/lib/tenant";

const repository = new DrizzleInventoryItemRepository();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizationId = await getOrganizationIdForUser(user.id);
  const { id } = await params;

  const item = await getInventoryItem(id, organizationId, repository);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizationId = await getOrganizationIdForUser(user.id);
  const { id } = await params;
  const body = await request.json();
  const item = await updateInventoryItem(
    { ...body, id, organizationId },
    repository
  );

  return NextResponse.json(item);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizationId = await getOrganizationIdForUser(user.id);
  const { id } = await params;
  await archiveInventoryItem(id, organizationId, repository);

  return NextResponse.json({ success: true });
}
