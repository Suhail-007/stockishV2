import axios, { AxiosInstance, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';

import { logNetworkRequest } from '../utils/logrocket';

export type AxiosInstanceParameter = CreateAxiosDefaults;

// Extend the AxiosRequestConfig interface to include our custom properties
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _requestData?: {
      method: string;
      url: string;
      headers?: any;
      body?: any;
    };
  }
}

/**
 * Creates a new axios instance with the given parameters.
 * @param {AxiosInstanceParameter} props The parameters to pass to axios.create()
 * @returns {AxiosInstance} The new axios instance
 */
const createAxiosInstance = function ({ ...props }: AxiosInstanceParameter): AxiosInstance {
  return axios.create({
    ...props
  });
};

const defaultInstance = createAxiosInstance({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 0,
  headers: { 'Content-Type': 'application/json' }
});

// Add request interceptor for LogRocket
defaultInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Skip logging in development mode
    if (!__DEV__) {
      // Clone the config to avoid mutating the original
      const requestConfig = { ...config };

      // Store the original headers and body
      const { headers, data, method, url } = requestConfig;

      // Store request data for LogRocket
      config._requestData = {
        method: method || 'GET',
        url: url || '',
        headers,
        body: data
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for LogRocket
defaultInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Skip logging in development mode
    if (!__DEV__ && response.config._requestData) {
      const { _requestData } = response.config;

      // Log the network request and response
      logNetworkRequest(_requestData, {
        status: response.status,
        body: response.data,
        headers: response.headers
      });
    }
    return response;
  },
  (error) => {
    // Skip logging in development mode
    if (!__DEV__ && error.config && error.config._requestData) {
      const { _requestData } = error.config;

      // Log the network request and error response
      logNetworkRequest(_requestData, {
        status: error.response?.status || 0,
        body: error.response?.data || { message: error.message },
        headers: error.response?.headers || {}
      });
    }
    return Promise.reject(error);
  }
);

export default defaultInstance;
