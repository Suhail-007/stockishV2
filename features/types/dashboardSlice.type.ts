import { BaseState } from './baseSlice.type';
import { OrderD } from './orderSlice.type';

export type DashboardInitialState = BaseState & {
  totalCancelledOrders: number[];
  totalOrders: number;
  totalDeliveredOrders: number[];
  totalPendingOrders: number[];
  totalAmount: number;
  totalProfit: number;
  totalActiveUsers: number;
  totalInActiveUsers: number;
  lastFiveOrders: OrderD[];
  usersBalanceMonthly: number;
};
