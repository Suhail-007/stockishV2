import { AxiosResponse } from 'axios';

import configuredAxiosInstance from '../axios/interceptor';

import { CheckEmailResponse, LoginPayload, LoginResponse } from './types/auth.type';

const AUTH_BASE_URL = '/auth';

const endpoints = {
  checkEmail: `${AUTH_BASE_URL}/checkEmailExist`,
  login: `${AUTH_BASE_URL}/login`
};

export const checkEmailExist = async (email: string): Promise<AxiosResponse<CheckEmailResponse>> => {
  try {
    const res: AxiosResponse<CheckEmailResponse> = await configuredAxiosInstance.post(`${endpoints.checkEmail}`, {
      email
    });

    return res;
  } catch (error: any) {
    throw error;
  }
};

export const login = async (payload: LoginPayload): Promise<AxiosResponse<LoginResponse>> => {
  try {
    const res: AxiosResponse<LoginResponse> = await configuredAxiosInstance.post(endpoints.login, payload);

    return res;
  } catch (error) {
    throw error;
  }
};
