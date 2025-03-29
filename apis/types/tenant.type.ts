import { User } from '../../features/types/authSlice.type';
import { BASE_RESPONSE } from './apis.type';

export type CreateTenantPayload = {
  phoneNumber: string;
  orgName: string;
  email: string;
  licenseNo?: string;
  GST: string;
  password: string;
  gender: string;
};

export type CreateTenantResponse = BASE_RESPONSE<CreateTenantData>;

export type CreateTenantData = User & {
  orgName: string;
  licenseNo?: string;
  GST?: string;
};
