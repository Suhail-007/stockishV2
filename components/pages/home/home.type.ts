import { GetLastFiveOrdersPayload, StatisticsPayload } from '../../../apis/types/dashboard.apiType';

export type DashboardFilters = {
  getOrderStatisticsById: StatisticsPayload;
  getLastFiveOrders: GetLastFiveOrdersPayload;
  getTotalRemainingBalance: StatisticsPayload;
};
