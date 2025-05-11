import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => {
  return (
    <Drawer initialRouteName='(tabs)'>
      <Drawer.Screen
        name='(tabs)'
        options={{ headerShown: false, title: 'Home' }}
      />
      <Drawer.Screen
        name='users'
        options={{ headerShown: false, title: 'Users' }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
