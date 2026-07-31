import type { OrganizationSettings } from "@simpra/domain/settings";
import type { SettingsRepository } from "../settings-repository";

export async function getOrganizationSettings(
  organizationId: string,
  repository: SettingsRepository
): Promise<OrganizationSettings | null> {
  return repository.getOrganizationSettings(organizationId);
}
