import { createAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { router } from 'expo-router';

import { GetRefreshTokenRes } from '../apis/types/auth.type';
import { STATUS_CODES } from '../constants/statusCodes';
import { StorageKeys } from '../constants/variables';
import {
  deleteSecureAsync,
  getSecureAsync,
  removeItemStorageAsync,
  setItemStorageAsync,
  setSecureAsync
} from '../utils/storage';

import defaultInstance from './instance';

interface QueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  request: AxiosRequestConfig; // Add request configuration
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];
const setIsTokenRefreshing = createAction<boolean>('auth/toggleRefreshTokenRotating');

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject, request }) => {
    if (error) {
      reject(error);
    } else {
      // Retry the failed request with new token
      const newRequest = {
        ...request,
        headers: {
          ...request.headers,
          Authorization: `Bearer ${token}`
        }
      };
      resolve(axios(newRequest));
    }
  });
  failedQueue = [];
};

const refreshAuthToken = async (): Promise<{ accessToken: string }> => {
  try {
    const refreshToken = await getSecureAsync(StorageKeys.REFRESH_TOKEN);

    if (!refreshToken) throw new Error('No refresh token');

    const response = await axios.post<GetRefreshTokenRes>(`${process.env.EXPO_PUBLIC_API_URL}/auth/refresh-token`, {
      refreshToken
    });

    const { accessToken, newRefreshToken } = response?.data?.data;

    if (response.data.status !== STATUS_CODES.success) throw new Error(response.data.message);

    Promise.allSettled([
      setSecureAsync(StorageKeys.SESSION, accessToken),
      setSecureAsync(StorageKeys.REFRESH_TOKEN, newRefreshToken)
    ]);

    return { accessToken };
  } catch (error) {
    console.log('🚀 ~ refreshAuthToken ~ error:', JSON.stringify(error, null, 2));
    await Promise.allSettled([deleteSecureAsync(StorageKeys.SESSION), deleteSecureAsync(StorageKeys.REFRESH_TOKEN)]);
    throw error;
  }
};

let refreshTokenPromise: string | null = null;

const refreshToken = async () => {
  try {
    const { accessToken } = await refreshAuthToken();
    refreshTokenPromise = accessToken;
    return accessToken;
  } catch (error) {
    refreshTokenPromise = null;
    throw error;
  }
};

defaultInstance.interceptors.request.use(
  async (config) => {
    const token = await getSecureAsync(StorageKeys.SESSION);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

defaultInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config: { _retry?: boolean } }) => {
    const originalRequest = error.config;

    if (error.response?.status === STATUS_CODES.unauthorized && !originalRequest._retry) {
      setIsTokenRefreshing(true);
      originalRequest._retry = true;

      if (isRefreshing) {
        // Store both the promise handlers and the original request
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
            request: originalRequest
          });
        });
      }

      isRefreshing = true;

      try {
        if (!refreshTokenPromise) {
          refreshTokenPromise = await refreshToken();
        }
        const newAccessToken = refreshTokenPromise;
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        console.log('Token updated');

        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        router.replace('/sign-in');
        throw err;
      } finally {
        isRefreshing = false;
        setIsTokenRefreshing(false);
      }
    }

    // Extract API error from response
    const apiError = error.response?.data || {
      message: 'An unexpected error occurred',
      status: error.response?.status || 500
    };

    return Promise.reject(apiError);
  }
);

const configuredInstance = defaultInstance;

export default configuredInstance;
