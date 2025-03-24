import { useState, Fragment } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TextInput, Text, ActivityIndicator, useTheme } from 'react-native-paper';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { scale } from 'react-native-size-matters';

import Button from '../components/ui/Button';
import { checkEmailExist } from '../apis/auth.api';
import { STATUS_CODES } from '../constants/statusCodes';

type FormData = {
  email: string;
  password?: string;
};

const { width } = Dimensions.get('window');

export default function SignIn() {
  const theme = useTheme();
  const [step, setStep] = useState<'email' | 'password'>('email');
  const { control, handleSubmit, watch } = useForm<FormData>();
  const email = watch('email');

  const {
    mutate: checkEmailMutation,
    error: emailError,
    isPending: isEmailPending,
  } = useMutation({
    mutationFn: checkEmailExist,
    onSuccess: ({ data }) => {
      const res = data;
      console.log('🚀 ~ SignIn ~ res:', res.status);
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
        router.push('/sign-up');
      }
    },
  });

  const signInMutation = useMutation({
    mutationFn: async (credentials: FormData) => {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error('Sign in failed');
      return response.json();
    },
    onSuccess: data => {
      // Handle your session here
      router.replace('/(app)/(tabs)');
    },
  });

  const handleSubmitEmail = () => checkEmailMutation(email);
  const handleSignIn = ({ email, password }: FormData) => password && signInMutation.mutate({ email, password });

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { padding: width * 0.05 }]}
      keyboardShouldPersistTaps='handled'>
      <Text variant='displaySmall' style={[styles.title, { color: theme.colors.primary, marginBottom: scale(20) }]}>
        {step === 'email' ? 'Welcome' : 'Enter Password'}
      </Text>

      {step === 'email' ? (
        <Controller
          control={control}
          name='email'
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format',
            },
          }}
          render={({ field, fieldState }) => (
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
                    primary: theme.colors.primary,
                    error: theme.colors.error,
                  },
                }}
                right={isEmailPending ? <TextInput.Icon icon={() => <ActivityIndicator />} /> : undefined}
              />
              {fieldState.error && <Text style={styles.errorText}>{fieldState.error.message}</Text>}
            </Fragment>
          )}
        />
      ) : (
        <Controller
          control={control}
          name='password'
          rules={{ required: 'Password is required' }}
          render={({ field, fieldState }) => (
            <Fragment>
              <TextInput
                label='Password'
                mode='outlined'
                secureTextEntry
                autoCapitalize='none'
                value={field.value}
                onChangeText={field.onChange}
                error={!!fieldState.error}
                style={styles.input}
                theme={{
                  colors: {
                    primary: theme.colors.primary,
                    error: theme.colors.error,
                  },
                }}
                right={signInMutation.isPending ? <TextInput.Icon icon={() => <ActivityIndicator />} /> : undefined}
              />
              {fieldState.error && <Text style={styles.errorText}>{fieldState.error.message}</Text>}
            </Fragment>
          )}
        />
      )}

      {(((emailError as any)?.status !== STATUS_CODES.notFound &&
        (emailError as any)?.status !== STATUS_CODES.success) ||
        signInMutation.error) && (
        <Text style={styles.errorText}>{emailError?.message || signInMutation.error?.message}</Text>
      )}

      <Button.Contained
        onPress={handleSubmit(step === 'email' ? handleSubmitEmail : handleSignIn)}
        loading={isEmailPending || signInMutation.isPending}
        disabled={isEmailPending || signInMutation.isPending}
        style={[styles.button, { marginTop: scale(20) }]}
        labelStyle={styles.buttonLabel}
        theme={{ colors: { primary: theme.colors.primary } }}>
        {step === 'email' ? 'Continue' : 'Sign In'}
      </Button.Contained>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: scale(24),
  },
  input: {
    marginVertical: scale(8),
    fontSize: scale(14),
  },
  button: {
    marginVertical: scale(10),
    borderRadius: 100,
  },
  buttonLabel: {
    fontSize: scale(14),
    fontWeight: '600',
    paddingVertical: scale(4),
  },
  errorText: {
    color: '#B00020',
    fontSize: scale(12),
    marginHorizontal: scale(4),
    marginTop: scale(4),
  },
});
