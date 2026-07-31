import { db } from "@simpra/infrastructure/db";
import { organizations } from "@simpra/infrastructure/db/schema";
import { eq } from "drizzle-orm";
import type { OrganizationSettings, NotificationSettings, UpdateOrganizationInput, UpdateNotificationSettingsInput } from "@simpra/domain/settings";
import type { SettingsRepository } from "@simpra/application/settings/settings-repository";

const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  lowStockAlerts: true,
  orderNotifications: true,
  weeklyDigest: false,
};

function mapRow(row: typeof organizations.$inferSelect): OrganizationSettings {
  const raw = (row.notificationSettings as Record<string, unknown> | null) ?? {};
  const notificationSettings: NotificationSettings = {
    emailNotifications: (raw.emailNotifications as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.emailNotifications,
    pushNotifications: (raw.pushNotifications as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.pushNotifications,
    lowStockAlerts: (raw.lowStockAlerts as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.lowStockAlerts,
    orderNotifications: (raw.orderNotifications as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.orderNotifications,
    weeklyDigest: (raw.weeklyDigest as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.weeklyDigest,
  };

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    status: row.status,
    timezone: row.defaultTimezone,
    preferences: (row.preferences as Record<string, unknown>) ?? {},
    notificationSettings,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class DrizzleSettingsRepository implements SettingsRepository {
  async getOrganizationSettings(organizationId: string): Promise<OrganizationSettings | null> {
    const [org] = await db.select().from(organizations).where(eq(organizations.id, organizationId)).limit(1);
    return org ? mapRow(org) : null;
  }

  async updateOrganizationSettings(input: UpdateOrganizationInput): Promise<OrganizationSettings> {
    const { id, ...updates } = input;
    const [org] = await db.update(organizations).set(updates).where(eq(organizations.id, id)).returning();
    if (!org) {
      throw new Error("Organization not found");
    }
    return mapRow(org);
  }

  async getNotificationSettings(organizationId: string): Promise<NotificationSettings> {
    const [org] = await db.select().from(organizations).where(eq(organizations.id, organizationId)).limit(1);
    if (!org) {
      throw new Error("Organization not found");
    }
    const raw = (org.notificationSettings as Record<string, unknown> | null) ?? {};
    return {
      emailNotifications: (raw.emailNotifications as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.emailNotifications,
      pushNotifications: (raw.pushNotifications as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.pushNotifications,
      lowStockAlerts: (raw.lowStockAlerts as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.lowStockAlerts,
      orderNotifications: (raw.orderNotifications as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.orderNotifications,
      weeklyDigest: (raw.weeklyDigest as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.weeklyDigest,
    };
  }

  async updateNotificationSettings(input: UpdateNotificationSettingsInput): Promise<NotificationSettings> {
    const { organizationId, ...settings } = input;
    const [org] = await db
      .update(organizations)
      .set({ notificationSettings: settings })
      .where(eq(organizations.id, organizationId))
      .returning();
    if (!org) {
      throw new Error("Organization not found");
    }
    const raw = (org.notificationSettings as Record<string, unknown> | null) ?? {};
    return {
      emailNotifications: (raw.emailNotifications as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.emailNotifications,
      pushNotifications: (raw.pushNotifications as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.pushNotifications,
      lowStockAlerts: (raw.lowStockAlerts as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.lowStockAlerts,
      orderNotifications: (raw.orderNotifications as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.orderNotifications,
      weeklyDigest: (raw.weeklyDigest as boolean) ?? DEFAULT_NOTIFICATION_SETTINGS.weeklyDigest,
    };
  }
}
