import { PayloadAction } from '@reduxjs/toolkit';

import { LoginResponseData } from '../../apis/types/auth.type';

import { BaseState } from './baseSlice.type';

export type AuthInitialState = BaseState & {
  isAuth: boolean;
  user: User | null;
  tenantDetails: User_Tenant | null;
  loading: boolean;
  errorMessage: string | null;
  isRefreshTokenRotating: boolean;
};

export type SetAuthPayload = {
  isAuth: AuthInitialState['isAuth'];
  user: AuthInitialState['user'];
  tenantDetails?: AuthInitialState['tenantDetails'];
};

export type SetAuthAction = PayloadAction<SetAuthPayload>;

export type SetUserApiPayload = {
  loading: AuthInitialState['loading'];
  errorMessage: AuthInitialState['errorMessage'];
};

export type SetUserApiStateAction = PayloadAction<SetUserApiPayload>;

export type User = Omit<LoginResponseData, 'token' | 'refreshToken'> & {
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
