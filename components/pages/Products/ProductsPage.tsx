import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';

import { getAllProductsGlobal } from '../../../apis/product.api';
import { GetAllProductsPayload } from '../../../apis/types/product.type';
import { QUERY_KEYS } from '../../../constants/queries';
import { Product } from '../../../features/types/product.type';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import ConditionalRender from '../../ConditionalRender';
import PageWrapper from '../../ui/PageWrapper';

import ProductsSkeleton from './Products.Skeleton';
import ProductsTable from './ProductsTable';
import ErrorMessage from '../../ErrorMessage';

const ProductPage = () => {
  const { isRefreshTokenRotating, user } = useAppSelector((state) => state.auth);
  const { products } = useAppSelector((state) => state.products);
  const newlyAddedProduct = useState<Product | null>(null);
  const params = useLocalSearchParams<{ newlyAddedProduct: string } | {}>();

  const dispatch = useAppDispatch();

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
    queryKey: [QUERY_KEYS.GET_PRODUCTS, ...Object.values(filters), products?.length],
    enabled: !!user?.id && !isRefreshTokenRotating,
    queryFn: () => getAllProductsGlobal(filters)
  });

  return (
    <PageWrapper.Scroll>
      {!isError && (
        <ConditionalRender
          condition={isPending}
          isFalseComponent={
            <ProductsTable
              products={data?.data.data.products || []}
              totalItems={data?.data?.data?.totalItems || 0}
              totalPages={data?.data?.data?.totalPages || 0}
              currentPage={data?.data?.data?.currentPage || 0}
            />
          }
          isTrueComponent={<ProductsSkeleton isLoading={isPending} />}
        />
      )}

      {isError && <ErrorMessage error={error} />}
    </PageWrapper.Scroll>
  );
};

export default ProductPage;
