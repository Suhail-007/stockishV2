import { useQuery } from '@tanstack/react-query';

import { getUserDetails } from '../../apis/user.api';
import { QUERY_KEYS } from '../../constants/queries';
import { STATUS_CODES } from '../../constants/statusCodes';
import { StorageKeys } from '../../constants/variables';
import { USER_ROLE } from '../../enums/User.enum';
import { setAuth } from '../../features/auth';
import { useAppDispatch } from '../../store/store';
import { getItemStorageAsync } from '../../utils/storage';

export const useUserDetails = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_DETAILS],
    queryFn: async () => {
      const userInfoString = await getItemStorageAsync(StorageKeys.USER_INFO);

      if (!userInfoString) {
        throw new Error('User info not found in storage');
      }

      const userInfoData = JSON.parse(userInfoString) as {
        userId: string;
        userRole: USER_ROLE;
        tenantId: string;
      };

      const { data } = await getUserDetails({
        userId: +userInfoData.userId,
        isActive: true,
        userRole: userInfoData.userRole
      });

      if (data.status === STATUS_CODES.success) {
        dispatch(setAuth({ isAuth: true, user: data.data }));
        return data.data;
      }

      throw new Error('Failed to fetch user details');
    },
    retry: 1
  });
};
