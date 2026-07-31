import type { CategoryDistribution } from "@simpra/domain/analytics";
import type { AnalyticsRepository } from "../analytics-repository";

export async function getCategoryDistribution(
  organizationId: string,
  repository: AnalyticsRepository
): Promise<CategoryDistribution[]> {
  return repository.getCategoryDistribution(organizationId);
}
