import { PRODUCT_STATUS } from '../../enums/Product.enum';
import { USER_ROLE } from '../../enums/User.enum';

import { API_BASE_RESPONSE } from './apis.type';
import { Order } from './order.type';

export type getOrdersStatisticsByIdRes = API_BASE_RESPONSE<getOrdersStatisticsByIdData>;

export type getOrdersStatisticsByIdData = {
  totalOrders: number;
  totalPendingOrders: Order[];
  totalDeliveredOrders: Order[];
  totalCancelledOrders: Order[];
  totalAmount: number;
  totalProfit: number;
};

export type GetUserCountByTenantRes = API_BASE_RESPONSE<GetUserCountByTenantData>;

export type GetUserCountByTenantData = Record<string, number> | number;

export type StatisticsPayload = {
  id: number;
  role: USER_ROLE;
  month: number;
  year: number;
};

export type GetTotalRemainingBalanceRes = API_BASE_RESPONSE<number>;

export type GetProductsCountByTenantRes = API_BASE_RESPONSE<GetProductCountByTenantData>;

export type GetProductCountByTenantData = Record<PRODUCT_STATUS, number>;

export type GetLastFiveOrdersPayload = {
  id: StatisticsPayload['id'];
  role: StatisticsPayload['role'];
};

export type GetLastFiveOrdersRes = API_BASE_RESPONSE<GetLastFiveOrdersData>;

export type GetLastFiveOrdersData = Order[];
