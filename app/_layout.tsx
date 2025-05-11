import React, { useEffect } from 'react';
import { StatusBar, StatusBarStyle, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { defaultConfig } from '@tamagui/config/v4';
import { Slot, usePathname, useSegments } from 'expo-router';
import { createTamagui, TamaguiProvider } from 'tamagui';

import Colors from '../constants/colors';
import { SessionProvider } from '../ctx';
import TanStackQueryProvider from '../query/queryClient';
import { RootState } from '../store/store';
import store from '../store/store';
// import { identifyUser, initializeLogRocket } from '../utils/logrocket';

// Initialize LogRocket
// initializeLogRocket();

// you usually export this from a tamagui.config.ts file
const config = createTamagui(defaultConfig);

// Component to identify user with LogRocket after authentication
function LogRocketUserIdentifier() {
  const { user } = useSelector((state: RootState) => state.auth);
  const segments = useSegments();
  const pathname = usePathname();

  useEffect(() => {
    if (user?.id) {
      // Identify user with LogRocket when they're authenticated
      // identifyUser(String(user.id), {
      //   name: `${user.firstName} ${user.lastName}`,
      //   email: user.email,
      //   phone: user.phoneNumber,
      //   role: user.role,
      //   tenantId: user.tenantId
      // });
    }
  }, [user, segments, pathname]);

  return null;
}

export default function Root() {
  const colorScheme = useColorScheme();

  const TYPED_COLORS = Colors[colorScheme as keyof typeof Colors];

  const defaultTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  const theme = {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      ...TYPED_COLORS
    }
  };

  const barStyle = theme.colors.tertiary;

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <PaperProvider theme={theme}>
          <TamaguiProvider config={config}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <StatusBar
                barStyle={'light-content'}
                backgroundColor={barStyle as StatusBarStyle}
              />
              <SessionProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  <TanStackQueryProvider>
                    <LogRocketUserIdentifier />
                    <Slot />
                  </TanStackQueryProvider>
                </SafeAreaView>
              </SessionProvider>
            </ThemeProvider>
          </TamaguiProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
