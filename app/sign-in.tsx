import { useState, Fragment, useMemo, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import { moderateScale, scale } from 'react-native-size-matters';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { SlideInUp } from 'react-native-reanimated';

import Button from '../components/ui/Button';
import { checkEmailExist, login } from '../apis/auth.api';
import { STATUS_CODES } from '../constants/statusCodes';
import { Fonts } from '../constants/fonts';
import useThemeColors from '../hooks/useThemeColors';
import { FormData } from '../components/pages/sign-in/type';
import { globalStyles } from '../constants/globalStyles';
import { useAppDispatch } from '../store/store';
import { setAuth } from '../features/auth';
import { useSession } from '../ctx';
import TextInput from '../components/ui/TextInput';
import { USER_ROLE } from '../enums/User.enum';
import Error from '../components/ui/Error';
import { API_BASE_RESPONSE, ValidationError } from '../apis/types/apis.type';

// <a href="https://www.freepik.com/free-vector/online-doctor-concept-illustration_7768657.htm">Image by storyset on Freepik</a>
const { width } = Dimensions.get('window');

export default function SignIn() {
  const { signIn } = useSession();
  const { email: emailParam } = useLocalSearchParams<{ email: string; message: string }>();
  const [step, setStep] = useState<'email' | 'password'>('email');

  const { colors } = useThemeColors();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, watch, setValue } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const email = watch('email');

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
    mutationKey: [' checkEmail', email],
    onSuccess: ({ data }) => {
      const res = data;

      if (res.data.emailExist && res.status === STATUS_CODES.success) {
        setStep('password');
      } else {
        router.push('/sign-up');
      }
    },
    onError(error, variables, context) {
      //If no email is found redirect to sign up
      if ((error as any)?.status === STATUS_CODES.notFound) {
        console.log('Email not found');
        router.push(`/sign-up?email=${email}`);
      }
    }
  });

  const {
    mutateAsync: signInMutation,
    error: signInError,
    isPending: signInIsPending
  } = useMutation({
    mutationFn: login,
    mutationKey: [' checkEmail', login],
    onSuccess: ({ data }) => {
      if (data.status === STATUS_CODES.success) {
        const { token, ...userData } = data.data;

        signIn(token);

        dispatch(
          setAuth({
            isAuth: true,
            user: {
              ...userData,
              isTenant: userData.role === USER_ROLE.admin ? true : false
            }
          })
        );
        router.replace('/(app)/(tabs)');
      }
    }
  });

  const TYPED_EMAIL_ERROR = emailError as unknown as API_BASE_RESPONSE;
  const TYPED_SIGNIN_ERROR = signInError as unknown as API_BASE_RESPONSE;

  const handleSubmitEmail = () => checkEmailMutation(email);
  const handleSignIn = ({ email, password }: FormData) => password && signInMutation({ email, password });

  const dynamicStyles = useMemo(
    () => ({
      container: { padding: width * 0.05, backgroundColor: colors.background },
      mainHeading: { color: colors.textPrimary },
      title: { color: colors.textSecondary },
      errorText: { color: colors.error },
      emailText: { color: colors.primary },
      successBg: { backgroundColor: colors.successBg },
      successText: { color: colors.success }
    }),
    [colors]
  );

  return (
    <ScrollView
      contentContainerStyle={[styles.container, dynamicStyles.container]}
      keyboardShouldPersistTaps='handled'>
      <Text
        variant='headlineLarge'
        style={[styles.mainHeading, dynamicStyles.mainHeading]}>
        Welcome To Stockish
      </Text>

      {emailParam && step === 'email' && (
        <Animated.View
          style={[styles.successCont, dynamicStyles.successBg]}
          entering={SlideInUp.delay(100)}>
          <Text
            variant='bodyLarge'
            style={[styles.successText, dynamicStyles.successText]}>
            Check your inbox for the email verification link
          </Text>
        </Animated.View>
      )}

      {/* Only show email if step is password */}
      {step === 'password' && (
        <View style={[styles.emailCont]}>
          <MaterialCommunityIcons
            name='face-man-profile'
            size={20}
            color={colors.primary}
          />

          <Text
            variant='bodyLarge'
            style={[styles.title, dynamicStyles.emailText]}>
            {email}
          </Text>
        </View>
      )}

      <Text
        variant='bodyLarge'
        style={[styles.title, dynamicStyles.title]}>
        {step === 'email' ? 'To continue, enter your email' : 'Enter Password'}
      </Text>

      {step === 'email' && (
        <Controller
          control={control}
          name='email'
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format'
            }
          }}
          render={({ field, fieldState }) => {
            return (
              <Fragment>
                <TextInput
                  label='Email'
                  mode='outlined'
                  autoCapitalize='none'
                  keyboardType='email-address'
                  value={field.value}
                  onChangeText={field.onChange}
                  error={!!fieldState.error}
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: colors.primary,
                      error: colors.error
                    }
                  }}
                  right={
                    isEmailPending ? (
                      <TextInput.Icon icon={() => <ActivityIndicator color={colors.tertiary} />} />
                    ) : (
                      <TextInput.Icon
                        color={colors.tertiary}
                        icon='email-outline'
                      />
                    )
                  }
                />
                {fieldState.error && (
                  <Text style={[globalStyles.errorText, dynamicStyles.errorText]}>{fieldState.error.message}</Text>
                )}
              </Fragment>
            );
          }}
        />
      )}

      {step === 'password' && (
        <Animated.View entering={SlideInUp.springify(2000)}>
          <Controller
            control={control}
            name='password'
            rules={{ required: 'Password is required' }}
            render={({ field, fieldState }) => (
              <Fragment>
                <TextInput
                  label='Password'
                  mode='outlined'
                  secureTextEntry={!showPassword}
                  autoCapitalize='none'
                  value={field.value}
                  onChangeText={field.onChange}
                  error={!!fieldState.error}
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: colors.primary,
                      error: colors.error
                    }
                  }}
                  right={
                    signInIsPending ? (
                      <TextInput.Icon
                        color={colors.tertiary}
                        icon={() => <ActivityIndicator color={colors.tertiary} />}
                      />
                    ) : (
                      <TextInput.Icon
                        color={colors.tertiary}
                        icon={() => (
                          <MaterialCommunityIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            onPress={() => setShowPassword(!showPassword)}
                          />
                        )}
                      />
                    )
                  }
                />
                {fieldState.error && (
                  <Text style={[globalStyles.errorText, dynamicStyles.errorText]}>{fieldState.error.message}</Text>
                )}
              </Fragment>
            )}
          />
        </Animated.View>
      )}

      {TYPED_EMAIL_ERROR && TYPED_EMAIL_ERROR.message !== 'Validation error' && (
        <Error.Message
          contStyle={styles.errorCont}
          msg={TYPED_EMAIL_ERROR?.message}
        />
      )}

      {TYPED_SIGNIN_ERROR?.error && TYPED_SIGNIN_ERROR.message === 'Validation error' && (
        <Error.ValidationErrors
          contStyle={styles.errorCont}
          data={TYPED_SIGNIN_ERROR?.error as ValidationError[]}
        />
      )}

      <Button.Primary
        onPress={handleSubmit(step === 'email' ? handleSubmitEmail : handleSignIn)}
        loading={isEmailPending || signInIsPending}
        disabled={isEmailPending || signInIsPending}
        style={[styles.button, { marginTop: scale(20) }]}
        labelStyle={styles.buttonLabel}>
        {step === 'email' ? 'Continue' : 'Sign In'}
      </Button.Primary>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: scale(40)
    // justifyContent: 'center',
  },
  emailCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  emailText: {
    fontWeight: '700',
    lineHeight: moderateScale(35)
  },
  mainHeading: {
    fontWeight: '700',

    lineHeight: moderateScale(35),
    letterSpacing: 1,
    fontFamily: Fonts.quicksandBold
  },
  title: {
    fontWeight: '700',
    lineHeight: moderateScale(35)
  },
  input: {
    marginVertical: scale(8),
    fontSize: scale(14)
  },
  button: {
    marginVertical: scale(10),
    borderRadius: 100
  },
  buttonLabel: {
    fontSize: scale(14),
    fontWeight: '600',
    paddingVertical: scale(4)
  },
  successCont: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20
  },
  successText: {
    fontSize: scale(14),
    fontWeight: '600',
    textAlign: 'center',
    width: '80%',
    marginInline: 'auto'
  },
  errorCont: {
    marginInline: 0
  }
});
