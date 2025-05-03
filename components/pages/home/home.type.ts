import { GetLastFiveOrdersPayload, StatisticsPayload } from '../../../apis/types/dashboard.apiType';

export type DashboardFilters = {
  getOrderStatisticsById: StatisticsPayload;
  getLastFiveOrders: GetLastFiveOrdersPayload;
  getTotalRemainingBalance: StatisticsPayload;
};

export type CalendarFilterProps = {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
};

export type MonthlySellStatsProps = {
  totalAmount: number;
  totalProfit: number;
} & CalendarFilterProps;

export type TotalBalanceProps = {
  amount: number;
} & CalendarFilterProps;
