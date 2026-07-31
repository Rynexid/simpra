import type { OrganizationSettings, UpdateOrganizationInput } from "@simpra/domain/settings";
import type { SettingsRepository } from "../settings-repository";

export async function updateOrganizationSettings(
  input: UpdateOrganizationInput,
  repository: SettingsRepository
): Promise<OrganizationSettings> {
  const existing = await repository.getOrganizationSettings(input.id);
  if (!existing) {
    throw new Error("Organization not found");
  }
  return repository.updateOrganizationSettings(input);
}
