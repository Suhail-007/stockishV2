import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar, StatusBarStyle, useColorScheme } from 'react-native';
import store from '../store/store';
import { SessionProvider } from '../ctx';
import { SafeAreaView } from 'react-native-safe-area-context';
import TanStackQueryProvider from '../query/queryClient';
import Colors from '../constants/colors';
// import LogRocket from '@logrocket/react-native';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

  // useEffect(() => {
  //   LogRocket.init('fs81e5/stockish');
  //   LogRocket.identify('I2', {
  //     name: 'James Morrison',
  //     email: 'jamesmorrison@example.com'
  //   });
  // }, []);

  const barStyle = theme.colors.tertiary;

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <PaperProvider theme={theme}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={barStyle as StatusBarStyle}
            />
            <SessionProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <TanStackQueryProvider>
                  <Slot />
                </TanStackQueryProvider>
              </SafeAreaView>
            </SessionProvider>
          </ThemeProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
