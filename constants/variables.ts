import { Filters } from '../utils/global.type';

export const StorageKeys = {
  SESSION: 'session',
  REFRESH_TOKEN: 'refresh_token',
  USER_INFO: 'USER_INFO',
  ORDER_STATISTICS: 'ORDER_STATISTICS'
};

export const BACKGROUND_TASKS = {
  GET_ORDERS_STATISTICS: 'GET ORDERS STATISTICS'
};

export const CHECK_EMAIL_ERROR_MESSAGE = 'User not found';
export const ValidationErrorString = 'Validation errors';
export const AccessTokenExpiredString = 'Access Token Expired';

export const defaultFilters: Filters = {
  sortBy: 'ASC',
  searchKey: '',
  isActive: true,
  minPriceFilter: 0,
  maxPriceFilter: 0,
  groupBy: '',
  userId: 0
};
