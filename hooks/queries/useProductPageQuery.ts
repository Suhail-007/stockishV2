import { getAllProductsGlobal } from '../../apis/product.api';
import { GetAllProductsPayload } from '../../apis/types/product.type';
import { QUERY_KEYS } from '../../constants/queries';
import { STATUS_CODES } from '../../constants/statusCodes';
import { addProducts } from '../../features/product';
import { useAppDispatch } from '../../store/store';

import { _useQuery } from './_useQuery';

const useProductPageQuery = (filters: GetAllProductsPayload) => {
  const dispatch = useAppDispatch();
  const query = _useQuery({
    queryKey: [
      QUERY_KEYS.GET_PRODUCTS,
      filters.groupBy,
      filters.isActive,
      filters.sortBy,
      filters.searchKey,
      filters.minPriceFilter,
      filters.maxPriceFilter,
      filters.page,
      filters.pageSize
    ],
    queryFn: async () => {
      const { maxPriceFilter, ...rest } = filters;
      let maxPrice: number | undefined;
      if (maxPriceFilter && maxPriceFilter.toString() !== '0') {
        maxPrice = maxPriceFilter;
        const res = await getAllProductsGlobal({ ...rest, maxPriceFilter: maxPrice });

        if (res.data.status === STATUS_CODES.success) {
          dispatch(addProducts(res.data.data?.products));
        }

        return res;
      }

      const res = await getAllProductsGlobal(rest);

      if (res.data.status === STATUS_CODES.success) {
        dispatch(addProducts(res.data.data?.products));
      }

      return res;
    },
    staleTime: Infinity
  });

  return query;
};

export default useProductPageQuery;
