import React, { useMemo } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { Icon } from 'react-native-paper';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
// import Constants from 'expo-constants';
import { router, Tabs } from 'expo-router';

import Header from '@/components/ui/Header';
import TabBar from '@/components/ui/TabBar/TabBar';
import { useColorScheme } from '@/hooks/useColorScheme';

import Colors from '@/constants/colors';
import useThemeColors from '@/hooks/useThemeColors';

// Get the appropriate URL based on where the app is running

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useThemeColors();

  // const getBaseUrl = () => {
  //   const debuggerHost = Constants.expoConfig?.hostUri;
  //   const localhost = debuggerHost?.split(':')[0] || '192.168.1.X'; // Replace with your IP
  //   return `http://${localhost}:3000`; // Your database service port
  // };

  // const API_URL = getBaseUrl();

  const dynamicStyles = useMemo(() => {
    return {
      addBtn: {
        backgroundColor: colors.primary,
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
      } as StyleProp<ViewStyle>
    };
  }, [colors.primary]);

  return (
    <Tabs
      initialRouteName='index'
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
        name='products'
        options={{
          title: 'Products',
          headerShown: true,
          header(props) {
            return (
              <Header
                title='Products'
                onBackPress={props.navigation.goBack}
                rightActions={
                  <Pressable
                    onPress={() => router.push('/productForm')}
                    style={[dynamicStyles.addBtn]}>
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
        name='orders'
        options={{
          title: 'Orders',
          headerShown: false
        }}
      />
    </Tabs>
  );
}
