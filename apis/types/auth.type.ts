import { USER_ROLE, USER_STATUS } from '../../enums/User.enum';
import { Gender } from '../../utils/global.type';
import { BASE_RESPONSE } from './apis.type';

export type CheckEmailResponse = BASE_RESPONSE<CheckEmailResponseData>;

type CheckEmailResponseData = {
  emailExist: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = BASE_RESPONSE<LoginResponseData>;

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
