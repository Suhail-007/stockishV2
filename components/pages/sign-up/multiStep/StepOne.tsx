import React, { FC, Fragment, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { RadioButton as PaperRadioButton } from 'react-native-paper';
import { scale } from 'react-native-size-matters';

import { globalStyles } from '../../../../constants/globalStyles';
import useThemeColors from '../../../../hooks/useThemeColors';
import RadioButton from '../../../ui/RadioButton';
import TextInput from '../../../ui/TextInput';
import { SignUpStepOneRadioButtons } from '../../sign-in/helper';

import { SignUpFormStepOne, StepsProps } from './multiStep.type';

const StepOne: FC<StepsProps<SignUpFormStepOne>> = ({ control }) => {
  const { colors } = useThemeColors();

  const dynamicStyles = useMemo(() => {
    return {
      errorText: {
        color: colors.error
      }
    };
  }, [colors]);

  return (
    <View>
      <Controller
        name='gender'
        rules={{ required: 'Gender is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <RadioButton
              value={field.value}
              render={(data) => (
                <PaperRadioButton.Item
                  style={styles.radioBtnCont}
                  key={data.value}
                  label={data.label}
                  theme={{ colors: { primary: colors.tertiary } }}
                  value={data.value}
                />
              )}
              onPress={(value) => field.onChange(value)}
              data={SignUpStepOneRadioButtons}
            />

            {fieldState.error && (
              <Text style={[globalStyles.errorText, dynamicStyles.errorText]}>{fieldState.error.message}</Text>
            )}
          </>
        )}
      />

      <View style={styles.inputCont}>
        <Controller
          name='email'
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format'
            }
          }}
          control={control}
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
                    primary: colors.primary,
                    error: colors.error
                  }
                }}
                right={
                  <TextInput.Icon
                    color={colors.tertiary}
                    icon='email-outline'
                  />
                }
              />

              {fieldState.error && (
                <Text style={[globalStyles.errorText, dynamicStyles.errorText]}>{fieldState.error.message}</Text>
              )}
            </Fragment>
          )}></Controller>
      </View>

      <View style={styles.inputCont}>
        <Controller
          name='phoneNumber'
          rules={{
            required: 'Phone number is required',
            minLength: 10
          }}
          control={control}
          render={({ field, fieldState }) => (
            <Fragment>
              <TextInput
                label='Phone Number'
                mode='outlined'
                autoCapitalize='none'
                keyboardType='phone-pad'
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
                  <TextInput.Icon
                    color={colors.tertiary}
                    icon='phone-outline'
                  />
                }
              />

              {fieldState.error && (
                <Text style={[globalStyles.errorText, dynamicStyles.errorText]}>Phone number is invalid</Text>
              )}
            </Fragment>
          )}></Controller>
      </View>
    </View>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  radioBtnsCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5)
  },
  radioBtnCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5)
  },

  inputCont: {
    marginTop: 15
  },

  input: {
    fontSize: scale(14)
  }
});

export { styles as StepperStyles };
