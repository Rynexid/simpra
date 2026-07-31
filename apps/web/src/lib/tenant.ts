import { db } from "@simpra/infrastructure/db";
import { member, organizations } from "@simpra/infrastructure/db/schema";
import { and, eq } from "drizzle-orm";

async function resolveOrganizationId(
  userId: string,
  activeOrganizationId?: string | null
): Promise<string | null> {
  if (activeOrganizationId) {
    const [membership] = await db
      .select({ id: member.id })
      .from(member)
      .where(
        and(
          eq(member.userId, userId),
          eq(member.organizationId, activeOrganizationId)
        )
      )
      .limit(1);

    if (membership) {
      return activeOrganizationId;
    }
  }

  const [membership] = await db
    .select({ organizationId: member.organizationId })
    .from(member)
    .where(eq(member.userId, userId))
    .limit(1);

  return membership?.organizationId ?? null;
}

export async function getOrganization(
  userId: string,
  activeOrganizationId?: string | null
): Promise<{ id: string; name: string } | null> {
  const organizationId = await resolveOrganizationId(userId, activeOrganizationId);
  if (!organizationId) {
    return null;
  }

  const [org] = await db
    .select({
      id: organizations.id,
      name: organizations.name,
    })
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);

  return org ?? null;
}

export async function hasOrganization(userId: string): Promise<boolean> {
  const [membership] = await db
    .select({ id: member.id })
    .from(member)
    .where(eq(member.userId, userId))
    .limit(1);

  return !!membership;
}

export async function getOrganizationIdForUser(
  userId: string,
  activeOrganizationId?: string | null
): Promise<string> {
  const organizationId = await resolveOrganizationId(userId, activeOrganizationId);

  if (!organizationId) {
    throw new Error("User does not belong to any organization");
  }

  return organizationId;
}
