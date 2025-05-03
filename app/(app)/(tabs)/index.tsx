import { useState } from 'react';

import ConditionalRender from '@/components/ConditionalRender';
import Home from '@/components/pages/home/Home';
import HomeSkeleton from '@/components/pages/home/Home.Skeleton';
import LastFiveOrders from '@/components/pages/home/LastFiveOrders';
import MonthlyOrders from '@/components/pages/home/MonthlyOrders';
import MonthlySellStats from '@/components/pages/home/MonthlySellStats';
import ProductStatistics from '@/components/pages/home/ProductStatistics';
import TotalBalance from '@/components/pages/home/TotalBalance';
import UsersStatistics from '@/components/pages/home/UsersStatistics';
import PageWrapper from '@/components/ui/PageWrapper';

import { USER_ROLE } from '@/enums/User.enum';
import { useAppSelector } from '@/store/store';

import ErrorMessage from '../../../components/ErrorMessage';
import useDashboardQueries from '../../../hooks/queries/useDashboardQueries';
import { useUserDetails } from '../../../hooks/queries/useUserDetails';
import { Icon } from 'react-native-paper';
import { homeStyles } from '../../../components/pages/home/home.styles';

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

  return (
    <PageWrapper.Scroll scrollEnabled={!isLoading}>
      {error && !isLoading && <ErrorMessage error={error} />}

      {!error && (
        <Home isLoading={isLoading}>
          <ConditionalRender
            condition={lastFiveOrders.isPending}
            isTrueComponent={<HomeSkeleton.LastFiveOrders />}
            isFalseComponent={<LastFiveOrders items={lastFiveOrders.data?.data?.data || []} />}
          />

          <PageWrapper.Section
            title='Total Balance'
            icon={
              <Icon
                size={24}
                source={'account-cash'}
              />
            }>
            <ConditionalRender
              condition={totalRemainingBalance.isPending}
              isFalseComponent={
                <TotalBalance
                  amount={totalRemainingBalance.data?.data?.data || 0}
                  selectedMonth={filters.getTotalRemainingBalance.month}
                  selectedYear={filters.getTotalRemainingBalance.year}
                  onMonthChange={(month) =>
                    setFilters((prev) => ({
                      ...prev,
                      getTotalRemainingBalance: { ...prev.getTotalRemainingBalance, month }
                    }))
                  }
                  onYearChange={(year) =>
                    setFilters((prev) => ({
                      ...prev,
                      getTotalRemainingBalance: { ...prev.getTotalRemainingBalance, year }
                    }))
                  }
                />
              }
              isTrueComponent={<HomeSkeleton.TotalBalance />}
            />
          </PageWrapper.Section>

          <PageWrapper.Section
            title='Monthly Sell/Profit'
            icon={
              <Icon
                size={24}
                source={'account-cash'}
              />
            }>
            <ConditionalRender
              condition={orderStatistics?.isPending}
              isFalseComponent={
                <MonthlySellStats
                  selectedMonth={filters.getOrderStatisticsById.month}
                  selectedYear={filters.getOrderStatisticsById.year}
                  totalAmount={_orderStatistics?.totalAmount || 0}
                  totalProfit={_orderStatistics?.totalProfit || 0}
                  onMonthChange={(month) =>
                    setFilters((prev) => ({
                      ...prev,
                      getOrderStatisticsById: { ...prev.getOrderStatisticsById, month }
                    }))
                  }
                  onYearChange={(year) =>
                    setFilters((prev) => ({
                      ...prev,
                      getOrderStatisticsById: { ...prev.getOrderStatisticsById, year }
                    }))
                  }
                />
              }
              isTrueComponent={<HomeSkeleton.MonthlySellNProfit />}
            />
          </PageWrapper.Section>

          <PageWrapper.Section
            title={'Monthly Orders'}
            icon={
              <Icon
                size={24}
                source={'calendar'}
              />
            }
            style={homeStyles.monthlyOrdersCont}>
            <ConditionalRender
              condition={orderStatistics.isPending}
              isTrueComponent={<HomeSkeleton.MonthlyOrders />}
              isFalseComponent={<MonthlyOrders ordersStatistics={_orderStatistics!} />}
            />
          </PageWrapper.Section>

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
              isFalseComponent={<UsersStatistics />}
            />
          </PageWrapper.Section>

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
        </Home>
      )}
    </PageWrapper.Scroll>
  );
}
