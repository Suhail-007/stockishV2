import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useQueryClient } from '@tanstack/react-query';
import { Route, router, useLocalSearchParams } from 'expo-router';

import { GetAllProductsPayload } from '../../../apis/types/product.type';
import { QUERY_KEYS } from '../../../constants/queries';
import { defaultFilters } from '../../../constants/variables';
import { Product } from '../../../features/types/product.type';
import useProductPageQuery from '../../../hooks/queries/useProductPageQuery';
import useFilters from '../../../hooks/useFilters';
import { useAppSelector } from '../../../store/store';
import ConditionalRender from '../../ConditionalRender';
import ErrorMessage from '../../ErrorMessage';
import PageWrapper from '../../ui/PageWrapper';

import ProductsHeader from './components/ProductsHeader';
import ProductSkeleton from './components/ProductSkeleton';
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

  const changeFilters = useCallback(
    async (modifiedFilters: Partial<GetAllProductsPayload>) => {
      setFilters((prev) => {
        return {
          ...prev,
          ...modifiedFilters
        };
      });

      // Invalidate the query when filters change
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PRODUCTS], stale: false });
    },
    [queryClient, setFilters]
  );

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
  }, [params?.stringifiedData, changeFilters]);

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
        goToRoute: '/(app)/(drawer)/(tabs)/products' as Route
      }
    });
  };

  const clearNewlyAddedProduct = () => {
    setNewlyAddedProduct(null);
    router.navigate({
      pathname: '/(app)/(drawer)/(tabs)/products',
      params: {}
    });
  };

  const clearFilters = () => {
    setFilters({ ...defaultFilters, page: 1, pageSize: 20 });
    router.navigate({
      pathname: '/(app)/(drawer)/(tabs)/products',
      params: {}
    });
  };

  const hasAppliedFilters = function () {
    const { page, pageSize, ...restFilters } = filters;

    return JSON.stringify(restFilters) !== JSON.stringify(defaultFilters);
  };

  return (
    <PageWrapper.Scroll style={styles.container}>
      <ProductsHeader
        clearFilters={clearFilters}
        clearNewlyAddedProduct={clearNewlyAddedProduct}
        onPressFilter={filterHandler}
        onChangeSearch={changeFilters}
        isNewlyAddedProduct={params?.isUpdate === 'true' ? false : true}
        hideHelperText={newlyAddedProduct && newlyAddedProduct.length > 0 ? false : true}
        hasAppliedFilters={hasAppliedFilters()}
      />

      <ConditionalRender
        condition={(isPending || isRefetching) && !isError}
        isFalseComponent={
          <Animated.View entering={FadeIn.duration(300)}>
            <ProductsTable
              filters={filters}
              onPageChange={changeFilters}
              products={newlyAddedProduct && newlyAddedProduct?.length > 0 ? newlyAddedProduct : products || []}
              totalItems={
                newlyAddedProduct && newlyAddedProduct.length > 0
                  ? newlyAddedProduct.length
                  : data?.data?.data?.totalItems || 0
              }
              totalPages={newlyAddedProduct && newlyAddedProduct.length > 0 ? 1 : data?.data?.data?.totalPages || 0}
              currentPage={newlyAddedProduct && newlyAddedProduct.length > 0 ? 1 : data?.data?.data?.currentPage || 0}
            />
          </Animated.View>
        }
        isTrueComponent={
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}>
            <ProductSkeleton count={10} />
          </Animated.View>
        }
      />

      {isError && isRefetchError && <ErrorMessage error={error} />}
    </PageWrapper.Scroll>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  emptyAnimation: {
    width: 200,
    height: 200
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16
  }
});

export default ProductPage;
