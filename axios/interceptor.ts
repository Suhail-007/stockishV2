import { router } from 'expo-router';
import { deleteSecureAsync, getSecureAsync, setSecureAsync } from '../utils/storage';
import defaultInstance from './instance';
import axios, { AxiosError } from 'axios';
import { STATUS_CODES } from '../constants/statusCodes';
import { API_BASE_RESPONSE } from '../apis/types/apis.type';
import { StorageKeys } from '../constants/variables';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

defaultInstance.interceptors.request.use(
  async (config) => {
    const token = await getSecureAsync(StorageKeys.SESSION);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

defaultInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error: AxiosError & { config: { _retry?: boolean } }) => {
    const originalRequest = error.config;

    if (error.response?.status === STATUS_CODES.unauthorized && !originalRequest?._retry) {
      if (isRefreshing) {
        // Queue failed requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getSecureAsync(StorageKeys.REFRESH_TOKEN);
        if (!refreshToken) {
          throw Error('No refresh token available');
        }

        //Get new access token
        const res = await axios.post<{
          data: {
            accessToken: string;
            newRefreshToken: string;
          };
        }>(`${process.env.EXPO_PUBLIC_API_URL}}/auth/refresh-token`, { refreshToken });

        const data = res.data.data;

        // Save the new tokens
        await setSecureAsync(StorageKeys.SESSION, data.accessToken);
        await setSecureAsync(StorageKeys.REFRESH_TOKEN, data.newRefreshToken);

        processQueue(null, data.accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }

        return axios(originalRequest);
      } catch (err) {
        processQueue(err as AxiosError, null);
        await deleteSecureAsync(StorageKeys.SESSION);
        await deleteSecureAsync(StorageKeys.REFRESH_TOKEN);
        router.replace('/sign-in');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response) {
      throw error.response.data as API_BASE_RESPONSE; // Throw the parsed API error
    }

    return Promise.reject(error);
  }
);

const configuredAxiosInstance = defaultInstance;

export default configuredAxiosInstance;
