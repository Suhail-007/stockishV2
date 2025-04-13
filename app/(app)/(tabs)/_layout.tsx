import React from 'react';
import { Tabs } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { useColorScheme } from '@/components/useColorScheme';
import TabBar from '../../../components/ui/TabBar/TabBar';

import Colors from '@/constants/colors';

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
        name='Products'
        options={{
          title: 'Products',
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
