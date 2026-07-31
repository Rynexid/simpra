import type { NotificationSettings } from "@simpra/domain/settings";
import type { SettingsRepository } from "../settings-repository";

export async function getNotificationSettings(
  organizationId: string,
  repository: SettingsRepository
): Promise<NotificationSettings> {
  return repository.getNotificationSettings(organizationId);
}
