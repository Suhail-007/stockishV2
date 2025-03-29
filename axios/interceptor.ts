import { router } from 'expo-router';
import { deleteTokenSecureAsync, getTokenSecureAsync } from '../utils/storage';
import defaultInstance from './instance';
import { AxiosError } from 'axios';
import { STATUS_CODES } from '../constants/statusCodes';
import { API_BASE_RESPONSE } from '../apis/types/apis.type';

defaultInstance.interceptors.request.use(
  async (config) => {
    const token = await getTokenSecureAsync('token');

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
  (error: AxiosError) => {
    if (error.status === STATUS_CODES.unauthorized) {
      //remove the session from the storage
      deleteTokenSecureAsync('token');
      router.navigate('/sign-in');
    }

    if (error.response) {
      throw error.response.data as API_BASE_RESPONSE; // Throw the parsed API error
    }

    return Promise.reject(error);
  }
);

const configuredAxiosInstance = defaultInstance;

export default configuredAxiosInstance;
