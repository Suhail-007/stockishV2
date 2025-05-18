import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import Animated, { SlideInUp } from 'react-native-reanimated';

import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';

import { checkEmailExist, login } from '../apis/auth.api';
import ErrorMessage from '../components/ErrorMessage';
import EmailStep from '../components/pages/sign-in/EmailStep';
import PasswordStep from '../components/pages/sign-in/Password';
import { signInStyles } from '../components/pages/sign-in/signin.styles';
import { FormData } from '../components/pages/sign-in/type';
import Button from '../components/ui/Button';
import CustomText from '../components/ui/CustomText';
import PageWrapper from '../components/ui/PageWrapper';
import { STATUS_CODES } from '../constants/statusCodes';
import { CHECK_EMAIL_ERROR_MESSAGE, StorageKeys } from '../constants/variables';
import { useSession } from '../ctx';
import { USER_ROLE } from '../enums/User.enum';
import { setAuth } from '../features/auth';
import useThemeColors from '../hooks/useThemeColors';
import { useAppDispatch } from '../store/store';
import { setItemStorageAsync, setSecureAsync } from '../utils/storage';

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
  const {
    mutateAsync: checkEmailMutation,
    error: emailError,
    isPending: isEmailPending
  } = useMutation({
    mutationFn: checkEmailExist,
    mutationKey: ['checkEmail', email]
  });

  const {
    mutateAsync: signInMutation,
    error: signInError,
    isPending: signInIsPending
  } = useMutation({
    mutationFn: login,
    mutationKey: ['signIn', email, password]
  });

  useEffect(() => {
    if (emailParam) {
      setValue('email', emailParam);
    }
  }, [emailParam, setValue]);

  const handleSubmitEmail = async () => {
    try {
      const { data } = await checkEmailMutation(email);
      if (data.data.emailExist && data.status === STATUS_CODES.success) {
        setStep('password');
      } else {
        router.push('/sign-up');
      }
    } catch (error: any) {
      if (error?.status === STATUS_CODES.notFound && error?.message === CHECK_EMAIL_ERROR_MESSAGE)
        router.push(`/sign-up?email=${email}`);
    }
  };
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
          router.replace('/(app)/(drawer)/(tabs)');
        }
      }
    );
  };

  const goBackToEmail = () => {
    setStep('email');
    setValue('password', '');
  };

  const dynamicStyles = useMemo(
    () => ({
      container: { padding: width * 0.05, backgroundColor: colors.screenBg },
      mainHeading: { color: colors.textPrimary },
      title: { color: colors.textSecondary },
      successBg: { backgroundColor: colors.successBg },
      successText: { color: colors.success },
      subHeading: {
        color: colors.textSecondary
      }
    }),
    [colors.textPrimary, colors.textSecondary, colors.successBg, colors.success, colors.screenBg]
  );

  return (
    <PageWrapper.Scroll
      style={dynamicStyles.container}
      contentContainerStyle={[signInStyles.container]}
      keyboardShouldPersistTaps='handled'>
      <View>
        <CustomText
          weight='600'
          fontVariant='quicksandSemiBold'
          variant='headlineLarge'
          style={[signInStyles.mainHeading, dynamicStyles.mainHeading]}>
          Welcome To Stockish
        </CustomText>
        <CustomText
          style={[signInStyles.subHeading, dynamicStyles.subHeading]}
          fontVariant='quicksandSemiBold'
          weight={'500'}
          variant='titleSmall'>
          Enter your {step === 'email' ? 'email' : 'password'} to continue
        </CustomText>
      </View>

      {emailParam && step === 'email' && (
        <Animated.View
          style={[signInStyles.successCont, dynamicStyles.successBg]}
          entering={SlideInUp.delay(100)}>
          <CustomText
            variant='bodyLarge'
            style={[signInStyles.successText, dynamicStyles.successText]}>
            Check your inbox for the email verification link
          </CustomText>
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

      <View>
        <Button.Primary
          onPress={handleSubmit(step === 'email' ? handleSubmitEmail : handleSignIn)}
          loading={isEmailPending || signInIsPending}
          disabled={isEmailPending || signInIsPending}
          style={[signInStyles.button]}
          labelStyle={signInStyles.buttonLabel}>
          {step === 'email' ? 'Continue' : 'Sign In'}
        </Button.Primary>
        {step === 'password' && (
          <Button.Transparent
            style={signInStyles.goBackBtn}
            onPress={goBackToEmail}
            textColor={colors.textPrimary}
            icon={'arrow-left'}>
            Go back to email
          </Button.Transparent>
        )}
      </View>
    </PageWrapper.Scroll>
  );
}
