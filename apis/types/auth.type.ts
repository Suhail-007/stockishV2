import { USER_ROLE, USER_STATUS } from '../../enums/User.enum';
import { Gender } from '../../utils/global.type';

import { API_BASE_RESPONSE } from './apis.type';

export type CheckEmailResponse = API_BASE_RESPONSE<CheckEmailResponseData>;

type CheckEmailResponseData = {
  emailExist: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = API_BASE_RESPONSE<LoginResponseData>;

export type LoginResponseData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  dob: string;
  status: USER_STATUS;
  role: USER_ROLE;
  address: string;
  profileImg: string;
  createdAt: string;
  updatedAt: string;
  tenantId: number;
  token: string;
  refreshToken: string;
};

export type GetRefreshTokenRes = API_BASE_RESPONSE<GetRefreshTokenResData>;

export type GetRefreshTokenResData = {
  accessToken: string;
  newRefreshToken: string;
};
