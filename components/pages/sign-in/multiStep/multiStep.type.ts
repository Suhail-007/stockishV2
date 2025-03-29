import { Control, FieldValues, UseControllerProps } from 'react-hook-form';
import { Gender } from '../../../../utils/global.type';

export type SignUpFormData = SignUpFormStepOne & SignUpFormStepTwo & SignUpFormStepThree;

export type SignUpFormStepOne = {
  phoneNumber: string;
  email: string;
  gender: Gender;
};

export type SignUpFormStepTwo = {
  orgName: string;
  licenseNo: string;
  GST: string;
};

export type SignUpFormStepThree = {
  password: string;
  confirmPassword: string;
};

export type StepsProps<T extends FieldValues> = {
  control: Control<T>;
};

export type MULTI_STEP_STEP = 1 | -1;
