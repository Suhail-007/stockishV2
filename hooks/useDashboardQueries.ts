import { useRef } from 'react';
import { useQueries } from '@tanstack/react-query';

import { DashboardFilters } from '../components/pages/home/home.type';

import { QUERY_KEYS } from '../constants/queries';
import {
  getLastFiveOrders,
  getProductsCountByTenant,
  getTotalRemainingBalance,
  getUsersCountByTenant
} from '../apis/dashboard';
import { User } from '../features/types/authSlice.type';

const useDashboardQueries = (user: User | null, filters: DashboardFilters) => {
  const refetchInterval = useRef(1000 * 60 * 5);

  const dashboardQueries = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.GET_LAST_FIVE_ORDERS, ...Object.keys(filters.getLastFiveOrders)],
        queryFn: () => getLastFiveOrders(filters.getLastFiveOrders),
        enabled: !!user?.id,
        refetchIntervalInBackground: true,
        refetchInterval: refetchInterval.current //5 minutes
      },
      {
        queryKey: [QUERY_KEYS.GET_PRODUCTS_COUNT_BY_TENANT],
        queryFn: getProductsCountByTenant,
        enabled: !!user?.id,
        refetchIntervalInBackground: true,
        refetchInterval: refetchInterval.current //5 minutes
      },
      {
        queryKey: [QUERY_KEYS.GET_TOTAL_REMAINING_BALANCE, Object.values(filters.getTotalRemainingBalance)],
        queryFn: () => getTotalRemainingBalance(filters.getTotalRemainingBalance),
        refetchIntervalInBackground: true,
        refetchInterval: refetchInterval.current //5 minutes
      },
      {
        queryKey: [QUERY_KEYS.GEt_ORDERS_STATISTICS, Object.values(filters.getOrderStatisticsById)],
        queryFn: () => getTotalRemainingBalance(filters.getOrderStatisticsById),
        refetchIntervalInBackground: true,
        refetchInterval: refetchInterval.current //5 minutes
      },
      {
        queryKey: [QUERY_KEYS.GET_USER_COUNT_BY_TENANT],
        queryFn: () => getUsersCountByTenant(),
        refetchIntervalInBackground: true,
        refetchInterval: refetchInterval.current //5 minutes
      }
    ]
  });
  return {
    lastFiveOrders: dashboardQueries[0],
    productsCountByTenant: dashboardQueries[1],
    totalRemainingBalance: dashboardQueries[2],
    orderStatistics: dashboardQueries[3],
    usersCountByTenant: dashboardQueries[4]
  };
};

export default useDashboardQueries;
