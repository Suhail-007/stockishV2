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
import Error from '@/components/ui/Error';
import PageWrapper from '@/components/ui/PageWrapper';

import { USER_ROLE } from '@/enums/User.enum';
import useDashboardQueries from '@/hooks/useDashboardQueries';
import { useAppSelector } from '@/store/store';

export default function Index() {
  const { loading, errorMessage, user } = useAppSelector((state) => state.auth);
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
    <PageWrapper.Scroll scrollEnabled={!loading}>
      {errorMessage && !loading && <Error.Message msg={errorMessage} />}

      {!errorMessage && (
        <Home isLoading={loading}>
          <ConditionalRender
            condition={lastFiveOrders.isPending}
            loading={<HomeSkeleton.LastFiveOrders loading={lastFiveOrders.isPending} />}
            loaded={<LastFiveOrders items={lastFiveOrders.data?.data?.data || []} />}
          />

          <ConditionalRender
            condition={totalRemainingBalance.isPending}
            loaded={<TotalBalance amount={totalRemainingBalance.data?.data?.data || 0} />}
            loading={<HomeSkeleton.TotalBalance loading={totalRemainingBalance.isPending} />}
          />

          <ConditionalRender
            condition={orderStatistics.isPending}
            loaded={
              <MonthlySellStats
                totalAmount={_orderStatistics?.totalAmount || 0}
                totalProfit={_orderStatistics?.totalProfit || 0}
              />
            }
            loading={<HomeSkeleton.MonthlySellNProfit loading={orderStatistics.isPending} />}
          />

          <ConditionalRender
            condition={orderStatistics.isPending}
            loading={<HomeSkeleton.MonthlyOrders loading={orderStatistics.isPending} />}
            loaded={<MonthlyOrders />}
          />

          <ConditionalRender
            condition={usersCountByTenant.isPending}
            loading={<HomeSkeleton.UsersStatistics loading={usersCountByTenant.isPending} />}
            loaded={<UsersStatistics />}
          />

          <ConditionalRender
            condition={productsCountByTenant.isPending}
            loading={<HomeSkeleton.ProductStatistics loading={productsCountByTenant.isPending} />}
            loaded={<ProductStatistics />}
          />
        </Home>
      )}
    </PageWrapper.Scroll>
  );
}
