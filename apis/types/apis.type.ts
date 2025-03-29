export type BASE_RESPONSE<T> = API_BASE_RESPONSE & {
  data: T;
 
};

export type ValidationError = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

export type API_BASE_RESPONSE = {
  message: string;
  error?: string | ValidationError[];
  status: number;
  success: boolean;
};
