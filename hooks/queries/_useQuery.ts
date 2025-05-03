import { useEffect, useState } from 'react';

import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

import { useAppSelector } from '../../store/store';

export function _useQuery<
  TQueryFnData = unknown,
  TError = unknown | null,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(options: UseQueryOptions<TQueryFnData, TError | null, TData, TQueryKey>) {
  const { user, isRefreshTokenRotating } = useAppSelector((state) => state.auth);
  const [error, setError] = useState<TError | null>(null);
  const { enabled, ...restOpt } = options;

  // Combine the base condition with any additional enabled condition
  const isEnabled = !!user?.id && !isRefreshTokenRotating && options.enabled;

  const query = useQuery({
    ...restOpt,
    enabled: isEnabled
  });

  // Update local error state when query error changes
  useEffect(() => {
    if (query.error) {
      setError(query.error);
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [query.error]);

  const clearError = () => setError(null);

  return {
    ...query,
    error: error,
    clearError
  };
}
