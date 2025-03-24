import { BaseState } from './baseState.type';

type AuthInitialState = BaseState & {
  isAuth: false;
  user: null;
  token: null;
};

export { AuthInitialState };
