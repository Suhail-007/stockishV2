import { useRef } from 'react';

import { useQueries } from '@tanstack/react-query';

import {
  getLastFiveOrders,
  getOrdersStatisticsById,
  getProductsCountByTenant,
  getTotalRemainingBalance,
  getUsersCountByTenant
} from '../../apis/dashboard.api';
import { DashboardFilters } from '../../components/pages/home/home.type';
import { QUERY_KEYS } from '../../constants/queries';
import { PRODUCT_STATUS } from '../../enums/Product.enum';
import { addActiveInActiveProducts } from '../../features/product';
import { User } from '../../features/types/authSlice.type';
import { useAppDispatch, useAppSelector } from '../../store/store';

const useDashboardQueries = (user: User | null, filters: DashboardFilters) => {
  const refetchInterval = useRef(1000 * 60 * 5);
  const { isRefreshTokenRotating } = useAppSelector((state) => state.auth);
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const dashboardQueries = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.GET_LAST_FIVE_ORDERS, ...Object.keys(filters.getLastFiveOrders)],
        queryFn: () => getLastFiveOrders(filters.getLastFiveOrders),
        retry: isRefreshTokenRotating ? false : 2,
        refetchIntervalInBackground: !isRefreshTokenRotating,
        refetchInterval: isRefreshTokenRotating ? false : refetchInterval.current, //5 minutes
        enabled: !!user?.id
      },
      {
        queryKey: [QUERY_KEYS.GET_PRODUCTS_COUNT_BY_TENANT, products?.length],
        queryFn: async () => {
          const res = await getProductsCountByTenant();
          const data = res?.data?.data;

          dispatch(
            addActiveInActiveProducts({
              active: data[PRODUCT_STATUS.active],
              inactive: data[PRODUCT_STATUS.inactive]
            })
          );

          return res;
        },
        retry: isRefreshTokenRotating ? false : 2,
        refetchIntervalInBackground: !isRefreshTokenRotating,
        refetchInterval: isRefreshTokenRotating ? false : refetchInterval.current, //5 minutes
        enabled: !!user?.id
      },
      {
        queryKey: [QUERY_KEYS.GET_TOTAL_REMAINING_BALANCE, Object.values(filters.getTotalRemainingBalance)],
        queryFn: () => getTotalRemainingBalance(filters.getTotalRemainingBalance),
        retry: isRefreshTokenRotating ? false : 2,
        refetchIntervalInBackground: !isRefreshTokenRotating,
        refetchInterval: isRefreshTokenRotating ? false : refetchInterval.current, //5 minutes
        enabled: !!user?.id
      },
      {
        queryKey: [QUERY_KEYS.GET_ORDERS_STATISTICS, Object.values(filters.getOrderStatisticsById)],
        queryFn: () => getOrdersStatisticsById(filters.getOrderStatisticsById),
        retry: isRefreshTokenRotating ? false : 2,
        refetchIntervalInBackground: !isRefreshTokenRotating,
        refetchInterval: isRefreshTokenRotating ? false : refetchInterval.current, //5 minutes
        enabled: !!user?.id
      },
      {
        queryKey: [QUERY_KEYS.GET_USER_COUNT_BY_TENANT],
        queryFn: () => getUsersCountByTenant(),
        retry: isRefreshTokenRotating ? false : 2,
        refetchIntervalInBackground: !isRefreshTokenRotating,
        refetchInterval: isRefreshTokenRotating ? false : refetchInterval.current, //5 minutes
        enabled: !!user?.id
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
