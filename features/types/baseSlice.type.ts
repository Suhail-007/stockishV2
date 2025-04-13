export type BaseState = {
  id: string;
};

export type BaseAction<T> = {
  type: string;
  payload: T;
};
