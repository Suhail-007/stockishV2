import React from 'react';
import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  PathValue,
  RegisterOptions,
  UseFormStateReturn
} from 'react-hook-form';

export type FormControllerProps = {
  control: Control<FieldValues>;
  name: string;
  rules?:
    | Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    | undefined;
  render: (props: FormControllerRenderProps) => React.ReactElement;
  disabled?: boolean;
  defaultValue?: PathValue<FieldValues, FieldPath<FieldValues>>;
};

export type FormControllerRenderProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
};
