import { useState } from 'react';

import { defaultFilters } from '../constants/variables';
import { Filters } from '../utils/global.type';

/**
 * A custom React hook that manages filter state.
 *
 * @param initialFilters - An object containing initial filter values to override the default filters.
 *
 * @returns An object with the current filter state and a function to update the filter state.
 */
const useFilters = <T extends Filters>(initialFilters?: Partial<T>) => {
  const [filters, setFilters] = useState<T>({
    ...defaultFilters,
    ...initialFilters
  } as T);

  return {
    filters,
    setFilters,
    defaultFilters
  };
};

export default useFilters;
