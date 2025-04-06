import { AxiosResponse } from 'axios';
import configuredAxiosInstance from '../axios/interceptor';
import { GetUserPayload, GetUserResponse } from './types/userApi.type';

const BASE_URL = 'user';

const endpoints = {
  getUserDetails: ({ isActive, userRole, userId }: GetUserPayload) =>
    `${BASE_URL}/${userId}?isActive=${isActive}&role=${+userRole}`
};

/**
 * Fetches user details based on the given payload.
 *
 * @param {GetUserPayload} payload - The payload containing userId, isActive, and userRole to retrieve specific user details.
 * @returns {Promise<AxiosResponse<GetUserResponse>>} A promise that resolves to the axios response containing the user details.
 * @throws Will throw an error if the request fails.
 */
export const getUserDetails = async (payload: GetUserPayload): Promise<AxiosResponse<GetUserResponse>> => {
  try {
    const res: AxiosResponse<GetUserResponse> = await configuredAxiosInstance.get(endpoints.getUserDetails(payload));
    return res;
  } catch (error: any) {
    throw error;
  }
};
