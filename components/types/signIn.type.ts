export type EmailStepProps = {
  control: any;

  isEmailPending: boolean;
  emailError: any;
};

export type PasswordStepProps = {
  control: any;

  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  signInIsPending: boolean;
};
