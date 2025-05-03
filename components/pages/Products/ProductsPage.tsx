import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Route, router, useLocalSearchParams } from 'expo-router';

import { GetAllProductsPayload } from '../../../apis/types/product.type';
import { QUERY_KEYS } from '../../../constants/queries';
import { defaultFilters } from '../../../constants/variables';
import { Product } from '../../../features/types/product.type';
import useProductPageQuery from '../../../hooks/queries/useProductPageQuery';
import useFilters from '../../../hooks/useFilters';
import { useAppSelector } from '../../../store/store';
import ErrorMessage from '../../ErrorMessage';
import PageWrapper from '../../ui/PageWrapper';

import ProductsHeader from './ProductsHeader';
import ProductsTable from './ProductsTable';

const ProductPage = () => {
  const queryClient = useQueryClient();
  const [newlyAddedProduct, setNewlyAddedProduct] = useState<Product[] | null>(null);

  const { products } = useAppSelector((state) => state.products);
  const { filters, setFilters } = useFilters<GetAllProductsPayload>({
    page: 1,
    pageSize: 20
  });

  const { data, isPending, error, isError, isRefetchError, isRefetching } = useProductPageQuery(filters);

  const params = useLocalSearchParams();

  useEffect(() => {
    if (params?.id) {
      const product = params as unknown as Product;
      showNewlyAddedProduct(product);
    }
  }, [params?.id]);

  useEffect(() => {
    if (params?.stringifiedData) {
      const filters = JSON.parse(params.stringifiedData as string) as unknown as Partial<GetAllProductsPayload>;
      changeFilters(filters);
    }
  }, [params?.stringifiedData]);

  const changeFilters = async (modifiedFilters: Partial<GetAllProductsPayload>) => {
    setFilters((prev) => {
      return {
        ...prev,
        ...modifiedFilters
      };
    });

    // Invalidate the query when filters change
    await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PRODUCTS], stale: false });
  };

  const showNewlyAddedProduct = (product: Product) => {
    const newProduct: Product = {
      id: Number(product.id),
      name: product.name,
      quantity: Number(product.quantity),
      status: product.status,
      sellPrice: Number(product.sellPrice),
      buyPrice: Number(product.buyPrice),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      tenantId: Number(product.tenantId)
    };

    setNewlyAddedProduct([newProduct]);
  };

  const filterHandler = () => {
    router.push({
      pathname: '/filter',
      params: {
        stringifiedData: JSON.stringify(filters),
        goToRoute: '/(app)/(tabs)/products' as Route
      }
    });
  };

  const clearNewlyAddedProduct = () => {
    setNewlyAddedProduct(null);
    router.navigate({
      pathname: '/(app)/(tabs)/products',
      params: {}
    });
  };

  const clearFilters = () => {
    setFilters({ ...defaultFilters, page: 1, pageSize: 20 });
  };

  const hasAppliedFilters = function () {
    const { page, pageSize, ...restFilters } = filters;

    return JSON.stringify(restFilters) !== JSON.stringify(defaultFilters);
  };

  return (
    <PageWrapper.Scroll>
      <ProductsHeader
        clearFilters={clearFilters}
        clearNewlyAddedProduct={clearNewlyAddedProduct}
        onPressFilter={filterHandler}
        onChangeSearch={changeFilters}
        isNewlyAddedProduct={params?.isUpdate === 'true' ? false : true}
        hideHelperText={newlyAddedProduct && newlyAddedProduct.length > 0 ? false : true}
        hasAppliedFilters={hasAppliedFilters()}
      />

      {(!isError || !isRefetchError) && (
        <ProductsTable
          filters={filters}
          onPageChange={changeFilters}
          isLoading={isPending || isRefetching}
          products={newlyAddedProduct && newlyAddedProduct?.length > 0 ? newlyAddedProduct : products || []}
          totalItems={
            newlyAddedProduct && newlyAddedProduct.length > 0
              ? newlyAddedProduct.length
              : data?.data?.data?.totalItems || 0
          }
          totalPages={newlyAddedProduct && newlyAddedProduct.length > 0 ? 1 : data?.data?.data?.totalPages || 0}
          currentPage={newlyAddedProduct && newlyAddedProduct.length > 0 ? 1 : data?.data?.data?.currentPage || 0}
        />
      )}

      {(isError || isRefetchError) && <ErrorMessage error={error} />}
    </PageWrapper.Scroll>
  );
};

export default ProductPage;
