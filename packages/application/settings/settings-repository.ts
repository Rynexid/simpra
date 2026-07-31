import type { OrganizationSettings, NotificationSettings, UpdateOrganizationInput, UpdateNotificationSettingsInput } from "@simpra/domain/settings";

export interface SettingsRepository {
  getOrganizationSettings(organizationId: string): Promise<OrganizationSettings | null>;
  updateOrganizationSettings(input: UpdateOrganizationInput): Promise<OrganizationSettings>;
  getNotificationSettings(organizationId: string): Promise<NotificationSettings>;
  updateNotificationSettings(input: UpdateNotificationSettingsInput): Promise<NotificationSettings>;
}
