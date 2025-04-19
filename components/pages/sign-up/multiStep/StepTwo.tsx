import { Control } from 'react-hook-form';
import { View } from 'react-native';

import { SignUpFormStepTwo } from './multiStep.type';

interface Props {
  control: Control<SignUpFormStepTwo>;
}

const StepTwo = ({ control }: Props) => {
  return <View>{/* Your step two form fields here */}</View>;
};

export default StepTwo;
