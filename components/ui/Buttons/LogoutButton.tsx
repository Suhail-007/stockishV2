import React from 'react';

import { AntDesign } from '@expo/vector-icons';

import { StorageKeys } from '../../../constants/variables';
import { useSession } from '../../../ctx';
import useThemeColors from '../../../hooks/useThemeColors';
import { deleteSecureAsync } from '../../../utils/storage';
import Button from '../Button';

const LogoutButton = () => {
  const { signOut } = useSession();
  const { colors } = useThemeColors();

  const logoutHandler = async () => {
    signOut();
    await Promise.allSettled([deleteSecureAsync(StorageKeys.REFRESH_TOKEN), deleteSecureAsync(StorageKeys.USER_INFO)]);
  };

  return (
    <Button.Tertiary
      background={{ color: colors.tertiary100 }}
      onPress={logoutHandler}
      style={{
        borderRadius: 30,
        borderColor: colors.tertiary,
        overflow: 'hidden'
      }}
      labelStyle={{
        color: colors.tertiary,
        zIndex: 100,
        position: 'relative'
      }}
      icon={() => (
        <AntDesign
          name='logout'
          size={20}
          color={colors.tertiary}
        />
      )}>
      Logout
    </Button.Tertiary>
  );
};

export default LogoutButton;
