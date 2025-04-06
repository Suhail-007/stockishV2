import { USER_ROLE } from '../../enums/User.enum';
import { User } from '../../features/types/authSlice.type';
import { BASE_RESPONSE } from './apis.type';

export type GetUserPayload = {
  userId: number;
  isActive: boolean;
  userRole: USER_ROLE;
};

export type GetUserResponse = BASE_RESPONSE<User>;
