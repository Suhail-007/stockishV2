import { useEffect } from 'react';

import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import Header from '../../components/ui/Header';
import { Fonts } from '../../constants/fonts';
import { useSession } from '../../ctx';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)'
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // Set up the auth context and render our layout inside of it.

  const [loaded, error] = useFonts({
    [Fonts.quicksandLight]: require('../../assets/fonts/Quicksand-Light.ttf'),
    [Fonts.quicksandRegular]: require('../../assets/fonts/Quicksand-Regular.ttf'),
    [Fonts.quicksandMedium]: require('../../assets/fonts/Quicksand-Medium.ttf'),
    [Fonts.quicksandSemiBold]: require('../../assets/fonts/Quicksand-SemiBold.ttf'),
    [Fonts.quicksandBold]: require('../../assets/fonts/Quicksand-Bold.ttf')
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded || !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoading]);

  if (!loaded || isLoading) {
    return null;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/sign-in' />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack
      initialRouteName='(tabs)'
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Add Product',
          header: (props) => (
            <Header
              title='Add Product'
              showBack
              onBackPress={props.navigation.goBack}
              {...props}
            />
          )
        }}
        name='addProduct'
      />
    </Stack>
  );
}
