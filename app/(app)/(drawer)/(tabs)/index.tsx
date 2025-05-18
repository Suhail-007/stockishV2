import { useState, useCallback, useEffect } from 'react';
import React from 'react';
import { Icon } from 'react-native-paper';

import ConditionalRender from '@/components/ConditionalRender';
import ErrorMessage from '@/components/ErrorMessage';
import Home from '@/components/pages/home/Home';
import HomeSkeleton from '@/components/pages/home/Home.Skeleton';
import RecentOrders from '@/components/pages/home/RecentOrders';
import OrdersOverView from '@/components/pages/home/OrdersOverview';
import MonthlySellStats from '@/components/pages/home/MonthlyStatsHome';
import ProductStatistics from '@/components/pages/home/ProductStatistics';
import TotalBalance from '@/components/pages/home/TotalBalance';
import UsersStatistics from '@/components/pages/home/UsersStatistics';
import AnimatedPageWrapper from '@/components/ui/AnimatedPageWrapper';
import PageWrapper from '@/components/ui/PageWrapper';

import { USER_ROLE } from '@/enums/User.enum';
import useDashboardQueries from '@/hooks/queries/useDashboardQueries';
import { useUserDetails } from '@/hooks/queries/useUserDetails';
import { useAppSelector } from '@/store/store';

export default function Index() {
  const { isLoading, error } = useUserDetails();
  const { user } = useAppSelector((state) => state.auth);
  const { activeProduct, inActiveProduct } = useAppSelector((state) => state.products);
  const [filters, setFilters] = useState({
    getOrderStatisticsById: {
      id: user && user.role === USER_ROLE.admin ? user?.tenantId : user?.id || 0,
      role: user?.role || USER_ROLE.admin,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    },
    getLastFiveOrders: {
      id: user && user.role === USER_ROLE.admin ? user?.tenantId : user?.id || 0,
      role: user?.role || USER_ROLE.admin
    },
    getTotalRemainingBalance: {
      id: user && user.role === USER_ROLE.admin ? user?.tenantId : user?.id || 0,
      role: user?.role || USER_ROLE.admin,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }
  });
  const { lastFiveOrders, orderStatistics, usersCountByTenant, productsCountByTenant, totalRemainingBalance } =
    useDashboardQueries(user, filters);

  const _orderStatistics = orderStatistics?.data?.data?.data;

  const onChangeFilter = useCallback(
    (key: string, field: 'month' | 'year', value: any) => {
      setFilters((prev) => ({
        ...prev,
        [key]: {
          ...prev[key as keyof typeof prev],
          [field]: value
        }
      }));
    },
    [setFilters]
  );

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageWrapper.Scroll
      style={{ paddingTop: 0, paddingHorizontal: 0 }}
      scrollEnabled={!isLoading}>
      {error && !isLoading && <ErrorMessage error={error} />}

      {!error && (
        <Home isLoading={isLoading}>
          <PageWrapper.Section>
            <AnimatedPageWrapper.SlideInRight
              delay={400}
              isLoading={orderStatistics.isPending}
              shouldAnimate={isInitialLoad}>
              <MonthlySellStats
                isLoading={orderStatistics.isPending}
                totalAmount={_orderStatistics?.totalAmount || 0}
                totalProfit={_orderStatistics?.totalProfit || 0}
              />
            </AnimatedPageWrapper.SlideInRight>
          </PageWrapper.Section>

          <AnimatedPageWrapper.SlideInRight
            isLoading={lastFiveOrders.isPending}
            shouldAnimate={isInitialLoad}>
            <RecentOrders
              isLoading={lastFiveOrders.isPending}
              items={lastFiveOrders.data?.data?.data || []}
            />
          </AnimatedPageWrapper.SlideInRight>

          <AnimatedPageWrapper.SlideInRight
            delay={200}
            isLoading={totalRemainingBalance.isPending}
            shouldAnimate={isInitialLoad}>
            <TotalBalance
              isLoading={totalRemainingBalance.isPending}
              amount={totalRemainingBalance.data?.data?.data || 0}
            />
          </AnimatedPageWrapper.SlideInRight>

          <OrdersOverView
            isLoading={orderStatistics.isPending}
            ordersStatistics={_orderStatistics!}
          />

          <AnimatedPageWrapper.SlideInRight
            delay={500}
            shouldAnimate={isInitialLoad}>
            <UsersStatistics
              isLoading={usersCountByTenant.isPending}
              users={usersCountByTenant.data?.data?.data || {}}
            />
          </AnimatedPageWrapper.SlideInRight>

          <AnimatedPageWrapper.SlideInRight
            delay={600}
            shouldAnimate={isInitialLoad}>
            <ProductStatistics
              isLoading={productsCountByTenant.isPending}
              data={{ 0: inActiveProduct, 1: activeProduct }}
            />
          </AnimatedPageWrapper.SlideInRight>
        </Home>
      )}
    </PageWrapper.Scroll>
  );
}
