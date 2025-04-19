import * as BackgroundFetch from 'expo-background-fetch';

import { StorageKeys } from '../../constants/variables';
import { getItemStorageAsync } from '../../utils/storage';

/**
 * Retrieves the order statistics for admin from AsyncStorage.
 *
 * @returns A promise that resolves to the parsed order statistics data if available, otherwise null.
 */
export const getOrdersStatisticsForTenantFromStorage = async () => {
  if (!BackgroundFetch.BackgroundFetchResult.NewData) return null;

  const data = await getItemStorageAsync(StorageKeys.ORDER_STATISTICS);

  if (!data) return null;

  return JSON.parse(data);
};
