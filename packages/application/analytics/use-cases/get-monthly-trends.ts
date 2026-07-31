import type { MonthlyTrend } from "@simpra/domain/analytics";
import type { AnalyticsRepository } from "../analytics-repository";

export async function getMonthlyTrends(
  organizationId: string,
  months: number,
  repository: AnalyticsRepository
): Promise<MonthlyTrend[]> {
  return repository.getMonthlyTrends(organizationId, months);
}
