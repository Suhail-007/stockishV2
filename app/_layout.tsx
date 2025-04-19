import { StatusBar, StatusBarStyle, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';



import Colors from '../constants/colors';
import { SessionProvider } from '../ctx';
import TanStackQueryProvider from '../query/queryClient';
import store from '../store/store';


// import LogRocket from '@logrocket/react-native';

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
