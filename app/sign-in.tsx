import { useState, useEffect, useMemo } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { SlideInUp } from 'react-native-reanimated';

import Button from '../components/ui/Button';
import PasswordStep from '../components/pages/sign-in/Password';
import ErrorMessage from '../components/ErrorMessage';
import EmailStep from '../components/pages/sign-in/EmailStep';

import { checkEmailExist, login } from '../apis/auth.api';
import { STATUS_CODES } from '../constants/statusCodes';
import useThemeColors from '../hooks/useThemeColors';
import { FormData } from '../components/pages/sign-in/type';
import { useAppDispatch } from '../store/store';
import { setAuth } from '../features/auth';
import { useSession } from '../ctx';
import { setItemStorageAsync, setSecureAsync } from '../utils/storage';
import { StorageKeys } from '../constants/variables';
import { USER_ROLE } from '../enums/User.enum';
import { signInStyles } from '../components/pages/sign-in/signin.styles';

const { width } = Dimensions.get('window');

export default function SignIn() {
  const { signIn } = useSession();
  const { email: emailParam } = useLocalSearchParams<{ email: string; message: string }>();
  const [step, setStep] = useState<'email' | 'password'>('email');
  const { colors } = useThemeColors();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, watch, setValue } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const [email, password] = watch(['email', 'password']);

  useEffect(() => {
    if (emailParam) {
      setValue('email', emailParam);
    }
  }, [emailParam]);

  const {
    mutate: checkEmailMutation,
    error: emailError,
    isPending: isEmailPending
  } = useMutation({
    mutationFn: checkEmailExist,
    mutationKey: ['checkEmail', email],
    onSuccess: ({ data }) => {
      if (data.data.emailExist && data.status === STATUS_CODES.success) {
        setStep('password');
      } else {
        router.push('/sign-up');
      }
    },
    onError: () => {
      router.push(`/sign-up?email=${email}`);
    }
  });

  const {
    mutateAsync: signInMutation,
    error: signInError,
    isPending: signInIsPending
  } = useMutation({
    mutationFn: login,
    mutationKey: ['signIn', email, password]
  });

  const handleSubmitEmail = () => checkEmailMutation(email);
  const handleSignIn = async ({ email, password }: FormData) => {
    if (!password) return;

    await signInMutation(
      { email, password },
      {
        onSuccess({ data }) {
          const { token, refreshToken, ...userData } = data.data;

          signIn(token);

          setItemStorageAsync(
            StorageKeys.USER_INFO,
            JSON.stringify({
              userId: userData.id,
              userRole: userData.role,
              tenantId: userData.tenantId
            })
          );

          setSecureAsync(StorageKeys.REFRESH_TOKEN, refreshToken);

          dispatch(
            setAuth({
              isAuth: true,
              user: {
                ...userData,
                isTenant: userData.role === USER_ROLE.admin
              }
            })
          );
          router.replace('/(app)/(tabs)');
        }
      }
    );
  };

  const dynamicStyles = useMemo(
    () => ({
      container: { padding: width * 0.05, backgroundColor: colors.background },
      mainHeading: { color: colors.textPrimary },
      title: { color: colors.textSecondary },
      successBg: { backgroundColor: colors.successBg },
      successText: { color: colors.success },
      subHeading: {
        color: colors.textSecondary
      }
    }),
    [colors]
  );

  return (
    <ScrollView
      contentContainerStyle={[signInStyles.container, dynamicStyles.container]}
      keyboardShouldPersistTaps='handled'>
      <View>
        <Text
          variant='headlineLarge'
          style={[signInStyles.mainHeading, dynamicStyles.mainHeading]}>
          Welcome To Stockish
        </Text>
        <Text
          style={[signInStyles.subHeading, dynamicStyles.subHeading]}
          variant='titleSmall'>
          Enter your {step === 'email' ? 'email' : 'password'} to continue
        </Text>
      </View>

      {emailParam && step === 'email' && (
        <Animated.View
          style={[signInStyles.successCont, dynamicStyles.successBg]}
          entering={SlideInUp.delay(100)}>
          <Text
            variant='bodyLarge'
            style={[signInStyles.successText, dynamicStyles.successText]}>
            Check your inbox for the email verification link
          </Text>
        </Animated.View>
      )}

      {step === 'email' && (
        <EmailStep
          control={control}
          isEmailPending={isEmailPending}
          emailError={emailError}
        />
      )}

      {step === 'password' && (
        <PasswordStep
          control={control}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          signInIsPending={signInIsPending}
        />
      )}

      {emailError && <ErrorMessage error={emailError} />}
      {signInError && <ErrorMessage error={signInError} />}

      <Button.Primary
        onPress={handleSubmit(step === 'email' ? handleSubmitEmail : handleSignIn)}
        loading={isEmailPending || signInIsPending}
        disabled={isEmailPending || signInIsPending}
        style={[signInStyles.button]}
        labelStyle={signInStyles.buttonLabel}>
        {step === 'email' ? 'Continue' : 'Sign In'}
      </Button.Primary>
    </ScrollView>
  );
}
