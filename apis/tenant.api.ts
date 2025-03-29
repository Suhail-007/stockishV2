import { AxiosResponse } from 'axios';
import configuredAxiosInstance from '../axios/interceptor';
import { CreateTenantPayload, CreateTenantResponse } from './types/tenant.type';

const endpoints = {
  createTenant: '/tenant'
};

/**
 * Creates a new tenant.
 *
 * @param payload - The tenant data to create.
 *
 * @returns A promise that resolves to an axios response containing the newly created tenant.
 */
export const createTenant = async (payload: CreateTenantPayload): Promise<AxiosResponse<CreateTenantResponse>> => {
  try {
    const res: AxiosResponse<CreateTenantResponse> = await configuredAxiosInstance.post(
      endpoints.createTenant,
      payload
    );

    return res;
  } catch (error) {
    throw error;
  }
};
