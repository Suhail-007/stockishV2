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

export type FormControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  rules?:
    | Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    | undefined;
  render: (props: FormControllerRenderProps<T>) => React.ReactElement;
  disabled?: boolean;
  defaultValue?: PathValue<T, FieldPath<T>>;
};

export type FormControllerRenderProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, FieldPath<T>>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<T>;
};
