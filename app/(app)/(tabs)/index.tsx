import { useEffect, useState } from 'react';

import Error from '@/components/ui/Error';
import Home from '@/components/pages/home/Home';
import PageWrapper from '@/components/ui/PageWrapper';
import HomeSkeleton from '@/components/pages/home/Home.Skeleton';
import MonthlyOrders from '@/components/pages/home/MonthlyOrders';
import LastFiveOrders from '@/components/pages/home/LastFiveOrders';
import UsersStatistics from '@/components/pages/home/UsersStatistics';
import ProductStatistics from '../../../components/pages/home/ProductStatistics';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchUserDetails } from '@/features/auth';
import { USER_ROLE } from '../../../enums/User.enum';
import useDashboardQueries from '../../../hooks/useDashboardQueries';
import ConditionalRender from '../../../components/ConditionalRender';
import TotalBalance from '../../../components/pages/home/TotalBalance';

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
  const dispatch = useAppDispatch();
  const { lastFiveOrders, orderStatistics, usersCountByTenant, productsCountByTenant, totalRemainingBalance } =
    useDashboardQueries(user, filters);

  console.log(lastFiveOrders.data);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <PageWrapper.Scroll scrollEnabled={!loading}>
      {errorMessage && !loading && <Error.Message msg={errorMessage} />}

      {!errorMessage && (
        <Home isLoading={loading}>
          <ConditionalRender
            condition={lastFiveOrders.isPending}
            loading={<HomeSkeleton.LastFiveOrders loading={lastFiveOrders.isPending} />}
            loaded={<LastFiveOrders />}
          />

          <ConditionalRender
            condition={totalRemainingBalance.isPending}
            loaded={<TotalBalance />}
            loading={<HomeSkeleton.TotalBalance loading={totalRemainingBalance.isPending} />}
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
