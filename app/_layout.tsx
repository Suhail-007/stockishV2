import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import store from '../store/store';
import { SessionProvider } from '../ctx';
import { SafeAreaView } from 'react-native-safe-area-context';
import TanStackQueryProvider from '../query/queryClient';

export default function Root() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <PaperProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <SessionProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <TanStackQueryProvider>
                <Slot />
              </TanStackQueryProvider>
            </SafeAreaView>
          </SessionProvider>
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  );
}
