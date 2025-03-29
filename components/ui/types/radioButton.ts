import { StyleProp, ViewStyle } from 'react-native';

export type RadioButtonProps = {
  onPress: (value: string) => void;
  value: string;
  data: RadioButtonData[];
  containerStyles?: StyleProp<ViewStyle>;
  render?: (data: RadioButtonData) => React.ReactNode;
};

export type RadioButtonData = {
  value: string;
  label: string;
  status?: 'checked' | 'unchecked';
  disabled?: boolean;
  uncheckedColor?: string;
  color?: string;
};
