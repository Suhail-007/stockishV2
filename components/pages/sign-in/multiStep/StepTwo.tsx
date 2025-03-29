import { Text, View } from 'react-native';
import React, { FC, Fragment, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { SignUpFormStepTwo, StepsProps } from './multiStep.type';
import TextInput from '../../../ui/TextInput';
import useThemeColors from '../../../../hooks/useThemeColors';
import { globalStyles } from '../../../../constants/globalStyles';
import { StepperStyles } from './StepOne';

const StepTwo: FC<StepsProps<SignUpFormStepTwo>> = ({ control }) => {
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
      <View style={styles.inputCont}>
        <Controller
          name='orgName'
          rules={{
            required: 'Company name is required'
          }}
          control={control}
          render={({ field, fieldState }) => (
            <Fragment>
              <TextInput
                label='Company Name'
                mode='outlined'
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
                  <TextInput.Icon
                    icon={() => (
                      <MaterialCommunityIcons
                        name='office-building-outline'
                        size={24}
                        color={colors.tertiary}
                      />
                    )}
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
          name='licenseNo'
          rules={{
            required: 'License number is required'
          }}
          control={control}
          render={({ field, fieldState }) => (
            <Fragment>
              <TextInput
                label='License Number'
                mode='outlined'
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
                  <TextInput.Icon
                    icon={() => (
                      <MaterialCommunityIcons
                        name='license'
                        color={colors.tertiary}
                        size={24}
                      />
                    )}
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
          name='GST'
          rules={{
            required: 'GST number is required'
          }}
          control={control}
          render={({ field, fieldState }) => (
            <Fragment>
              <TextInput
                label='GST Number'
                mode='outlined'
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
                  <TextInput.Icon
                    icon={() => (
                      <MaterialCommunityIcons
                        name='note'
                        color={colors.tertiary}
                        size={24}
                      />
                    )}
                  />
                }
              />

              {fieldState.error && (
                <Text style={[globalStyles.errorText, dynamicStyles.errorText]}>{fieldState.error.message}</Text>
              )}
            </Fragment>
          )}></Controller>
      </View>
    </View>
  );
};

export default StepTwo;

const styles = StepperStyles;
