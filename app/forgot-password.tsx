import { Fragment, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { moderateScale, scale } from 'react-native-size-matters';

import { FormData } from '../components/pages/sign-in/type';
import Button from '../components/ui/Button';
import TextInput from '../components/ui/TextInput';
import { Fonts } from '../constants/fonts';
import { globalStyles } from '../constants/globalStyles';
import useThemeColors from '../hooks/useThemeColors';

// <a href="https://www.freepik.com/free-vector/online-doctor-concept-illustration_7768657.htm">Image by storyset on Freepik</a>
const { width } = Dimensions.get('window');

export default function ForgotPassword() {
  const { colors } = useThemeColors();
  const { control, formState } = useForm<FormData>();

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

      <Text
        variant='bodyLarge'
        style={[styles.title, dynamicStyles.title]}>
        Send reset password link
      </Text>

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
                  formState.isSubmitting ? (
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

      <Button.Primary
        style={[styles.button, { marginTop: scale(20) }]}
        labelStyle={styles.buttonLabel}>
        Send Reset Link
      </Button.Primary>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: scale(40)
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
