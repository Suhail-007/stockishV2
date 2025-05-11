import { useState, useCallback, useEffect } from 'react';
import React from 'react';
import { Icon } from 'react-native-paper';

import ConditionalRender from '@/components/ConditionalRender';
import ErrorMessage from '@/components/ErrorMessage';
import Home from '@/components/pages/home/Home';
import HomeSkeleton from '@/components/pages/home/Home.Skeleton';
import { homeStyles } from '@/components/pages/home/home.styles';
import LastFiveOrders from '@/components/pages/home/LastFiveOrders';
import MonthlyOrders from '@/components/pages/home/MonthlyOrders';
import MonthlySellStats from '@/components/pages/home/MonthlySellStats';
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
      linearGradient
      scrollEnabled={!isLoading}>
      {error && !isLoading && <ErrorMessage error={error} />}

      {!error && (
        <Home isLoading={isLoading}>
          <AnimatedPageWrapper.SlideInRight
            isLoading={lastFiveOrders.isPending}
            shouldAnimate={isInitialLoad}>
            <ConditionalRender
              condition={lastFiveOrders.isPending}
              isTrueComponent={<HomeSkeleton.LastFiveOrders />}
              isFalseComponent={<LastFiveOrders items={lastFiveOrders.data?.data?.data || []} />}
            />
          </AnimatedPageWrapper.SlideInRight>

          <PageWrapper.Section
            icon={
              <Icon
                size={24}
                source={'wallet'}
              />
            }
            title='Total Balance'
            style={homeStyles.statsSection}>
            <AnimatedPageWrapper.SlideInRight
              delay={200}
              isLoading={totalRemainingBalance.isPending}
              shouldAnimate={isInitialLoad}>
              <ConditionalRender
                condition={totalRemainingBalance.isPending}
                isTrueComponent={<HomeSkeleton.TotalBalance />}
                isFalseComponent={
                  <TotalBalance
                    amount={totalRemainingBalance.data?.data?.data || 0}
                    selectedMonth={filters.getTotalRemainingBalance.month}
                    selectedYear={filters.getTotalRemainingBalance.year}
                    onMonthChange={(month) => onChangeFilter('getTotalRemainingBalance', 'month', month)}
                    onYearChange={(year) => onChangeFilter('getTotalRemainingBalance', 'year', year)}
                  />
                }
              />
            </AnimatedPageWrapper.SlideInRight>
          </PageWrapper.Section>

          <PageWrapper.Section
            style={{ gap: 10 }}
            icon={
              <Icon
                size={24}
                source={'chart-bar'}
              />
            }
            title='Monthly Statistics'>
            <AnimatedPageWrapper.SlideInRight
              delay={400}
              isLoading={orderStatistics.isPending}
              shouldAnimate={isInitialLoad}>
              <ConditionalRender
                condition={orderStatistics?.isPending}
                isTrueComponent={<HomeSkeleton.MonthlySellNProfit />}
                isFalseComponent={
                  <MonthlySellStats
                    selectedMonth={filters.getOrderStatisticsById.month}
                    selectedYear={filters.getOrderStatisticsById.year}
                    totalAmount={_orderStatistics?.totalAmount || 0}
                    totalProfit={_orderStatistics?.totalProfit || 0}
                    onMonthChange={(month) => onChangeFilter('getOrderStatisticsById', 'month', month)}
                    onYearChange={(year) => onChangeFilter('getOrderStatisticsById', 'year', year)}
                  />
                }
              />
            </AnimatedPageWrapper.SlideInRight>

            <ConditionalRender
              condition={orderStatistics.isPending}
              isTrueComponent={<HomeSkeleton.MonthlyOrders />}
              isFalseComponent={<MonthlyOrders ordersStatistics={_orderStatistics!} />}
            />
          </PageWrapper.Section>

          <AnimatedPageWrapper.SlideInRight
            delay={500}
            shouldAnimate={isInitialLoad}>
            <PageWrapper.Section
              icon={
                <Icon
                  size={24}
                  source={'account-group'}
                />
              }
              title={'Users Statistics'}>
              <ConditionalRender
                condition={usersCountByTenant.isPending}
                isTrueComponent={<HomeSkeleton.UsersStatistics />}
                isFalseComponent={<UsersStatistics users={usersCountByTenant.data?.data?.data || {}} />}
              />
            </PageWrapper.Section>
          </AnimatedPageWrapper.SlideInRight>

          <AnimatedPageWrapper.SlideInRight
            delay={600}
            shouldAnimate={isInitialLoad}>
            <PageWrapper.Section
              icon={
                <Icon
                  size={24}
                  source={'account-group'}
                />
              }
              title={'Products Statistics'}>
              <ConditionalRender
                condition={productsCountByTenant.isPending}
                isTrueComponent={<HomeSkeleton.ProductStatistics />}
                isFalseComponent={<ProductStatistics data={{ 0: inActiveProduct, 1: activeProduct }} />}
              />
            </PageWrapper.Section>
          </AnimatedPageWrapper.SlideInRight>
        </Home>
      )}
    </PageWrapper.Scroll>
  );
}
