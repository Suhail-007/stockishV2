export type API_BASE_RESPONSE<T> = BASE_RESPONSE & {
  data: T;
};

export type API_BASE_RESPONSE_WITH_PAGINATION<T> = BASE_RESPONSE & {
  data: T & {
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type ValidationError = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

export type BASE_RESPONSE = {
  message: string;
  error?: string | ValidationError[];
  status: number;
  success: boolean;
};

export type PAGINATION_PAYLOAD = {
  page: number;
  pageSize: number;
};
