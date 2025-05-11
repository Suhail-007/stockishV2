import { AntDesign } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

import _DrawerContent from '../../../components/ui/Drawer/DrawerContent';
import useThemeColors from '../../../hooks/useThemeColors';
import { useAppSelector } from '../../../store/store';

const DrawerLayout = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { colors } = useThemeColors();
  return (
    <Drawer
      screenOptions={() => ({
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary
      })}
      drawerContent={_DrawerContent}
      initialRouteName='(tabs)'>
      <Drawer.Screen
        name='(tabs)'
        options={{
          headerShown: false,
          title: 'Home',

          drawerIcon: (props) => (
            <AntDesign
              {...props}
              name='home'
            />
          )
        }}
      />
      <Drawer.Screen />
      <Drawer.Screen
        name='my-profile'
        options={{
          title: 'My Profile',
          drawerIcon: (props) => (
            <AntDesign
              {...props}
              name='profile'
            />
          )
        }}
      />

      <Drawer.Protected guard={!user?.isTenant || true}>
        <Drawer.Screen
          name='(admin)/users'
          options={{
            title: 'Users',
            drawerIcon(props) {
              return (
                <AntDesign
                  {...props}
                  name='user'
                />
              );
            }
          }}
        />
      </Drawer.Protected>

      <Drawer.Screen
        name='settings'
        options={{
          title: 'Settings',
          drawerIcon(props) {
            return (
              <AntDesign
                {...props}
                name='setting'
              />
            );
          }
        }}
      />

      {/* If user is not a tenant change guard=true */}
      <Drawer.Protected guard={!user?.isTenant || true}>
        <Drawer.Screen
          name='(admin)/organization'
          options={{
            title: 'Organization',

            drawerStyle: {
              display: 'none',
              height: 0
            },
            drawerIcon: (props) => (
              <AntDesign
                {...props}
                name='team'
              />
            )
          }}
        />
      </Drawer.Protected>
    </Drawer>
  );
};

export default DrawerLayout;
