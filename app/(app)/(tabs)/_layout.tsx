import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import { Icon } from 'react-native-paper';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { router, Tabs } from 'expo-router';

import productHeaderStyles from '@/components/pages/Products/productsHeader.styles';
import Header from '@/components/ui/Header';
import TabBar from '@/components/ui/TabBar/TabBar';
import { useColorScheme } from '@/components/useColorScheme';

import Colors from '@/constants/colors';
import useThemeColors from '@/hooks/useThemeColors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useThemeColors();

  const dynamicStyles = useMemo(() => {
    return {
      addBtn: {
        backgroundColor: colors.primary
      }
    };
  }, [colors.primary]);

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
          headerShown: true,
          header(props) {
            return (
              <Header
                title='Products'
                onBackPress={props.navigation.goBack}
                rightActions={
                  <Pressable
                    onPress={() => router.push('/addProduct')}
                    style={[productHeaderStyles.addBtn, dynamicStyles.addBtn]}>
                    <Icon
                      color={colors.textWhite}
                      source={'plus'}
                      size={20}
                    />
                  </Pressable>
                }
              />
            );
          }
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
