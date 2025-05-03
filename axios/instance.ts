import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export type AxiosInstanceParameter = CreateAxiosDefaults;

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

export default defaultInstance;
