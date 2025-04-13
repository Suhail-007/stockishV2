import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { BACKGROUND_TASKS, StorageKeys } from '../constants/variables';
import { getOrdersStatisticsById } from '../apis/dashboard';
import { setItemStorageAsync } from '../utils/storage';

// TaskManager.defineTask(BACKGROUND_TASKS.GET_ORDERS_STATISTICS, async () => {
//   const res = await getOrdersStatisticsById();

//   await setItemStorageAsync(StorageKeys.ORDER_STATISTICS, JSON.stringify(res.data.data));

//   return BackgroundFetch.BackgroundFetchResult.NewData;
// });

// /**
//  * Registers a background task to get order statistics every 45 minutes.
//  * @returns A promise that resolves to the task name registered.
//  */
// export async function registerBackgroundOrderStatistics() {
//   return BackgroundFetch.registerTaskAsync(BACKGROUND_TASKS.GET_ORDERS_STATISTICS, {
//     minimumInterval: 1000, // 45 mins
//     stopOnTerminate: false,
//     startOnBoot: true
//   });
// }

// /**
//  * Unregister the background task for fetching order statistics.
//  *
//  * @returns A promise that resolves when the task has been unregistered.
//  */
// export async function unregisterBackgroundOrderStatistics() {
//   return BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASKS.GET_ORDERS_STATISTICS);
// }
