import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import { Text, ActivityIndicator } from 'react-native-paper';
import TextInput from '../../ui/TextInput';
import { globalStyles } from '../../../constants/globalStyles';
import useThemeColors from '../../../hooks/useThemeColors';
import { EmailStepProps } from '../../types/signIn.type';

/**
 * EmailStep component renders an email input field with validation and loading indicator.
 *
 * @param {Object} props - The component props.
 * @param {Control} props.control - The control object from react-hook-form for managing form state.
 * @param {boolean} props.isEmailPending - Flag indicating if the email validation is in progress.
 *
 */

const EmailStep = ({ control, isEmailPending }: EmailStepProps) => {
  const { colors } = useThemeColors();

  return (
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
            right={
              isEmailPending ? (
                <TextInput.Icon icon={() => <ActivityIndicator color={colors.tertiary} />} />
              ) : (
                <TextInput.Icon icon='email-outline' />
              )
            }
          />
          {fieldState.error && (
            <Text style={[globalStyles.errorText, { color: colors.error }]}>{fieldState.error.message}</Text>
          )}
        </Fragment>
      )}
    />
  );
};

export default EmailStep;
