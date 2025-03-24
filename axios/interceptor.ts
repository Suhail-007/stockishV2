import { router } from 'expo-router';
import { deleteTokenAsync, getTokenAsync } from '../utils/storage';
import defaultInstance from './instance';
import { AxiosError } from 'axios';
import { STATUS_CODES } from '../constants/statusCodes';

defaultInstance.interceptors.request.use(
  async config => {
    console.log('sdfsf');

    const token = await getTokenAsync('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

defaultInstance.interceptors.response.use(
  async response => {
    return response;
  },
  (error: AxiosError) => {
    if (error.status === STATUS_CODES.unauthorized) {
      //remove the session from the storage
      deleteTokenAsync('token');
      router.navigate('/sign-in');
    }
    return Promise.reject(error);
  }
);

const configuredAxiosInstance = defaultInstance;

export default configuredAxiosInstance;
