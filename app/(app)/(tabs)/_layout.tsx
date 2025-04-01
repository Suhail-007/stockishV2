import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Colors from '@/constants/colors';
import { useColorScheme } from '@/components/useColorScheme';
import { AntDesign } from '@expo/vector-icons';
import TabBar from '../../../components/ui/TabBar/TabBar';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name='Users'
        options={{
          title: 'Users',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name='Orders'
        options={{
          title: 'Orders',
          headerShown: false
        }}
      />
    </Tabs>
  );
}
