import { AxiosResponse } from 'axios';
import configuredAxiosInstance from '../axios/interceptor';
import { CheckEmailResponse } from './types/auth.type';

const AUTH_BASE_URL = '/auth';

const endpoints = {
  checkEmail: `${AUTH_BASE_URL}/checkEmailExist`,
};

export const checkEmailExist = async (email: string): Promise<AxiosResponse<CheckEmailResponse>> => {
  try {
    const res: AxiosResponse<CheckEmailResponse> = await configuredAxiosInstance.post(`${endpoints.checkEmail}`, {
      email,
    });

    return res;
  } catch (error: any) {
    throw error;
  }
};
