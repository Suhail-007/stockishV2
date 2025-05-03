import { useState } from 'react';

import { Filters } from '../utils/global.type';

/**
 * A custom React hook that manages filter state.
 *
 * @param initialFilters - An object containing initial filter values to override the default filters.
 *
 * @returns An object with the current filter state and a function to update the filter state.
 */
const useFilters = <T extends Filters>(initialFilters?: Partial<T>) => {
  const defaultFilters: Filters = {
    searchKey: '',
    isActive: true,
    minPriceFilter: 0,
    maxPriceFilter: 0,
    sortBy: 'ASC',
    groupBy: '',
    userId: 0
  };

  const [filters, setFilters] = useState<T>({
    ...defaultFilters,
    ...initialFilters
  } as T);

  return {
    filters,
    setFilters
  };
};

export default useFilters;
