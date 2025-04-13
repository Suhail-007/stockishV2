import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import useThemeColors from '../hooks/useThemeColors';
import { FormControllerProps } from './types/formController.type';

/**
 * FormController component that wraps the `Controller` from `react-hook-form`.
 *
 * @param {FormControllerProps} props - The props for the FormController component.
 * @param {Control<FieldValues>} props.control - The control object from `react-hook-form`.
 * @param {string} props.name - The name of the field.
 * @param {Object} [props.rules] - The validation rules for the field.
 * @param {Function} props.render - A render function that returns a React element.
 * @param {boolean} [props.disabled] - Flag indicating if the field is disabled.
 * @param {any} [props.defaultValue] - The default value for the field.
 *
 */
const FormController = (props: FormControllerProps) => {
  const { colors } = useThemeColors();
  const { render, ...rest } = props;

  return (
    <Controller
      {...rest}
      render={(props) => {
        const error = props.fieldState.error;
        return (
          <>
            {render(props)}
            {error && <Text style={[styles.errorText, { color: colors.error }]}>{error.message}</Text>}
          </>
        );
      }}
    />
  );
};

export default FormController;

const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    marginTop: 4
  }
});
