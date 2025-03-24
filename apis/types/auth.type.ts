import { BASE_RESPONSE } from './apis.type';

export type CheckEmailResponse = BASE_RESPONSE<CheckEmailResponseData>;

type CheckEmailResponseData = {
  emailExist: boolean;
};
