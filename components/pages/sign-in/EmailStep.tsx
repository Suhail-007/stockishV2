import React, { Fragment } from 'react';
import { ActivityIndicator } from 'react-native-paper';


import useThemeColors from '../../../hooks/useThemeColors';
import FormController from '../../FormController';
import { EmailStepProps } from '../../types/signIn.type';
import TextInput from '../../ui/TextInput';

const EmailStep = ({ control, isEmailPending }: EmailStepProps) => {
  const { colors } = useThemeColors();

  return (
    <FormController
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
        </Fragment>
      )}
    />
  );
};

export default EmailStep;
