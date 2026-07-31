import type { NotificationSettings, UpdateNotificationSettingsInput } from "@simpra/domain/settings";
import type { SettingsRepository } from "../settings-repository";

export async function updateNotificationSettings(
  input: UpdateNotificationSettingsInput,
  repository: SettingsRepository
): Promise<NotificationSettings> {
  return repository.updateNotificationSettings(input);
}
