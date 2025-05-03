import React, { FC, Fragment, useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { Text, View } from 'react-native';

// import Lucide from '@react-native-vector-icons/lucide';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { globalStyles } from '../../../../constants/globalStyles';
import useThemeColors from '../../../../hooks/useThemeColors';
import TextInput from '../../../ui/TextInput';

import { SignUpFormStepThree, StepsProps } from './multiStep.type';
import { StepperStyles } from './StepOne';

const StepThird: FC<StepsProps<SignUpFormStepThree>> = ({ control }) => {
  const { colors } = useThemeColors();
  const password = useWatch({ control, name: 'password' });
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const dynamicStyles = useMemo(() => {
    return {
      errorText: {
        color: colors.error
      }
    };
  }, [colors]);

  return (
    <View>
      <View style={styles.inputCont}>
        <Controller
          name='password'
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          }}
          control={control}
          render={({ field, fieldState }) => {
            return (
              <Fragment>
                <TextInput
                  label='Password'
                  mode='outlined'
                  autoCapitalize='none'
                  value={field.value}
                  onChangeText={field.onChange}
                  error={!!fieldState.error}
                  secureTextEntry={true}
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: colors.primary,
                      error: colors.error
                    }
                  }}
                />
                {fieldState.error && (
                  <Text style={[globalStyles.errorText, dynamicStyles.errorText]}>{fieldState.error.message}</Text>
                )}
              </Fragment>
            );
          }}
        />
      </View>

      <View style={styles.inputCont}>
        <Controller
          name='confirmPassword'
          rules={{
            required: 'Please confirm your password',
            validate: (value, formValues) => {
              return value === formValues.password || 'Passwords do not match';
            }
          }}
          control={control}
          render={({ field, fieldState }) => {
            const doesPasswordMatch = field.value && field.value === password;

            return (
              <Fragment>
                <TextInput
                  label='Confirm password'
                  mode='outlined'
                  autoCapitalize='none'
                  value={field.value}
                  onChangeText={field.onChange}
                  error={Boolean(fieldState.error || (field.value && !doesPasswordMatch))}
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: colors.primary,
                      error: colors.error
                    }
                  }}
                  secureTextEntry={!showConfirmPassword}
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialCommunityIcons
                          color={colors.tertiary}
                          name={showConfirmPassword ? 'eye-off' : 'eye'}
                          size={24}
                          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                      )}
                    />
                  }
                />
                {(fieldState.error || (field.value && !doesPasswordMatch)) && (
                  <Text style={[globalStyles.errorText, dynamicStyles.errorText]}>
                    {fieldState.error?.message || 'Passwords do not match'}
                  </Text>
                )}
              </Fragment>
            );
          }}
        />
      </View>
    </View>
  );
};

export default StepThird;

const styles = StepperStyles;
