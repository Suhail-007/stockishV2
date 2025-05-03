import { FC, Fragment, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { globalStyles } from '../../../../constants/globalStyles';
import useThemeColors from '../../../../hooks/useThemeColors';
import TextInput from '../../../ui/TextInput';

import { SignUpFormStepTwo, StepsProps } from './multiStep.type';
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
      <View style={StepperStyles.inputCont}>
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
                style={StepperStyles.input}
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

      <View style={StepperStyles.inputCont}>
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
                style={StepperStyles.input}
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

      <View style={StepperStyles.inputCont}>
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
                style={StepperStyles.input}
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
