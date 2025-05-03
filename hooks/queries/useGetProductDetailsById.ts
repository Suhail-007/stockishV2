import { useQuery } from '@tanstack/react-query';

import { getProductDetailsById } from '../../apis/product.api';
import { QUERY_KEYS } from '../../constants/queries';

/**
 * Custom hook to fetch product details by ID.
 *
 * @param {string} id - The ID of the product to fetch details for.
 * @param {boolean} [isActive=true] - Flag to indicate whether to fetch details for an active product.
 * @returns {object} - The query object returned by useQuery, containing status and data of the fetch operation.
 */
const useGetProductDetailsById = (id: string, isActive: boolean = true) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_DETAILS_BY_ID],
    enabled: !!id,
    queryFn: () => getProductDetailsById(id, isActive)
  });

  return query;
};

export default useGetProductDetailsById;
