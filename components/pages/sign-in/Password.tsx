import React, { Fragment } from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import useThemeColors from '../../../hooks/useThemeColors';
import FormController from '../../FormController';
import { PasswordStepProps } from '../../types/signIn.type';
import TextInput from '../../ui/TextInput';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import CustomText from '../../ui/CustomText';

/**
 * A component that renders a text input for a user's password.
 *
 * @param control The `control` prop from `react-hook-form`.
 * @param showPassword A boolean indicating whether to show the password or not.
 * @param setShowPassword A function that toggles the `showPassword` boolean.
 * @param signInIsPending A boolean indicating whether the sign in process is pending.
 *
 * @returns A JSX element representing a text input for a user's password.
 */
const PasswordStep = ({ control, showPassword, setShowPassword, signInIsPending }: PasswordStepProps) => {
  const { colors } = useThemeColors();

  return (
    <FormController
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
            right={
              signInIsPending ? (
                <TextInput.Icon icon={() => <ActivityIndicator color={colors.tertiary} />} />
              ) : (
                <TextInput.Icon
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
          <View>
            <Pressable
              onPress={() => router.push('/forgot-password')}
              style={{ marginTop: 10 }}>
              <CustomText style={{ color: colors.tertiary }}>Forgot password?</CustomText>
            </Pressable>
          </View>
        </Fragment>
      )}
    />
  );
};

export default PasswordStep;
