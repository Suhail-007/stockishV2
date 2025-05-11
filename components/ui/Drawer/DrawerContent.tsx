import React from 'react';
import { View } from 'react-native';

import { DrawerContent, DrawerContentComponentProps } from '@react-navigation/drawer';

import LogoutButton from '../Buttons/LogoutButton';

const _DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <View style={{ flex: 1, paddingBlock: 50 }}>
      {/* Drawer screens defined in the layout file */}
      <DrawerContent {...props}></DrawerContent>

      <View style={{ paddingInline: 10 }}>
        <LogoutButton />
      </View>
    </View>
  );
};

export default _DrawerContent;
