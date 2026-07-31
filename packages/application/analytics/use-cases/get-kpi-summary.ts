import type { KPISummary } from "@simpra/domain/analytics";
import type { AnalyticsRepository } from "../analytics-repository";

export async function getKPISummary(
  organizationId: string,
  repository: AnalyticsRepository
): Promise<KPISummary> {
  return repository.getKPISummary(organizationId);
}
