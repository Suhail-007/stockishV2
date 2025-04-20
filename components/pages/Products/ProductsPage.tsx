import { useQuery } from '@tanstack/react-query';
import PageWrapper from '../../ui/PageWrapper';
import { QUERY_KEYS } from '../../../constants/queries';
import { useAppSelector } from '../../../store/store';
import { useState } from 'react';
import { Filters } from '../../../utils/global.type';
import { getAllProductsGlobal } from '../../../apis/product.api';
import { GetAllProductsPayload } from '../../../apis/types/product.type';
import { DataTable, Text } from 'react-native-paper';
import ConditionalRender from '../../ConditionalRender';
import ProductsTable from './ProductsTable';

const ProductPage = () => {
  const { isRefreshTokenRotating, user } = useAppSelector((state) => state.auth);
  const [filters, setFilters] = useState<GetAllProductsPayload>({
    searchKey: '',
    isActive: true,
    minPriceFilter: 0,
    sortBy: 'ASC',
    groupBy: '',
    page: 1,
    pageSize: 20
  });

  const { data, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCTS, ...Object.values(filters)],
    enabled: !!user?.id && !isRefreshTokenRotating,
    queryFn: () => {
      return getAllProductsGlobal(filters);
    }
  });

  return (
    <PageWrapper.Scroll>
      <ConditionalRender
        condition={isPending}
        isFalseComponent={
          <ProductsTable
            products={data?.data.data.products || []}
            totalItems={data?.data.totalItems || 0}
            totalPages={data?.data.totalPages || 0}
            currentPage={data?.data.currentPage || 0}
          />
        }
        isTrueComponent={<Text>Loading...</Text>}
      />
    </PageWrapper.Scroll>
  );
};

export default ProductPage;
