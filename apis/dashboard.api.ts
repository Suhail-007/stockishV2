import { AxiosResponse } from 'axios';

import configuredAxiosInstance from '../axios/interceptor';

import {
  getOrdersStatisticsByIdRes,
  GetProductsCountByTenantRes,
  StatisticsPayload,
  GetTotalRemainingBalanceRes,
  GetUserCountByTenantRes,
  GetLastFiveOrdersPayload,
  GetLastFiveOrdersRes
} from './types/dashboard.apiType';

const endpoints = {
  getOrderStatisticsById: ({ id, role, month, year }: StatisticsPayload) =>
    `order/statistics?id=${id}&role=${role}&month=${month}&year=${year}`,
  getLastFiveOrders: ({ id, role }: GetLastFiveOrdersPayload) => `order/getLastFiveOrders?id=${id}&role=${role}`,
  getUsersCountByTenant: '/user/getUsersCountByTenant',
  getTotalRemainingBalance: ({ id, role, month, year }: StatisticsPayload) =>
    `/balance/getTotalRemainingBalance?id=${id}&role=${role}&month=${month}&year=${year}`,
  getProductsCountByTenant: '/product/getProductsCountByTenant'
};

/**
 * Get the orders statistics for admin.
 *
 * @returns A promise that resolves to an axios response containing the orders statistics for admin.
 */
export const getOrdersStatisticsById = async (
  payload: StatisticsPayload
): Promise<AxiosResponse<getOrdersStatisticsByIdRes>> => {
  const res: AxiosResponse<getOrdersStatisticsByIdRes> = await configuredAxiosInstance.get(
    endpoints.getOrderStatisticsById(payload)
  );
  return res;
};

/**
 * Retrieves the count of users by tenant.
 *
 * @returns A promise that resolves to an axios response containing the user count by tenant.
 */

export const getUsersCountByTenant = async (): Promise<AxiosResponse<GetUserCountByTenantRes>> => {
  const res: AxiosResponse<GetUserCountByTenantRes> = await configuredAxiosInstance.get(
    endpoints.getUsersCountByTenant
  );

  return res;
};

/**
 * Retrieves the total remaining balance for a given tenant, user role, month and year.
 *
 * @param payload - The payload containing the tenant id, user role, month and year to retrieve the total remaining balance.
 * @returns A promise that resolves to an axios response containing the total remaining balance.
 */
export const getTotalRemainingBalance = async (
  payload: StatisticsPayload
): Promise<AxiosResponse<GetTotalRemainingBalanceRes>> => {
  const res: AxiosResponse<GetTotalRemainingBalanceRes> = await configuredAxiosInstance.get(
    endpoints.getTotalRemainingBalance(payload)
  );

  return res;
};

/**
 * Retrieves the count of products by tenant.
 *
 * @returns A promise that resolves to an axios response containing the product count by tenant.
 */
export const getProductsCountByTenant = async (): Promise<AxiosResponse<GetProductsCountByTenantRes>> => {
  const res: AxiosResponse<GetProductsCountByTenantRes> = await configuredAxiosInstance.get(
    endpoints.getProductsCountByTenant
  );

  return res;
};

/**
 * Retrieves the last five orders for a given tenant.
 *
 * @param payload - The payload containing the tenant id and user role to retrieve the last five orders.
 * @returns A promise that resolves to an axios response containing the last five orders.
 */
export const getLastFiveOrders = async (
  payload: GetLastFiveOrdersPayload
): Promise<AxiosResponse<GetLastFiveOrdersRes>> => {
  const res: AxiosResponse<GetLastFiveOrdersRes> = await configuredAxiosInstance.get(
    endpoints.getLastFiveOrders(payload)
  );
  return res;
};
