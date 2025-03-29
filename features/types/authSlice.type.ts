import { LoginResponseData } from '../../apis/types/auth.type';
import { BaseAction, BaseState } from './baseState.type';

export type AuthInitialState = BaseState & {
  isAuth: boolean;
  user: User | null;
  tenantDetails: User_Tenant | null;
};

export type SetAuthPayload = {
  isAuth: AuthInitialState['isAuth'];
  user: AuthInitialState['user'];
  tenantDetails?: AuthInitialState['tenantDetails'];
};

export type SetAuthAction = BaseAction<SetAuthPayload>;

export type User = Omit<LoginResponseData, 'token'> & {
  isTenant: boolean;
};

export type User_Tenant = {
  id: number;
  phoneNumber: string;
  email: string;
  orgName: string;
  licenseNo?: string;
  GST?: string;
  createdAt: string;
  updatedAt: string;
};
