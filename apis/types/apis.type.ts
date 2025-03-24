export type BASE_RESPONSE<T> = {
  data: T;
  message: string;
  error?: string | ValidationError[] | Error[];
  status: number;
  success: boolean;
};

export type ValidationError = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

export type Error = {};
