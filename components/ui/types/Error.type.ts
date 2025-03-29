import { StyleProp, TextStyle } from 'react-native';
import { ValidationError } from '../../../apis/types/apis.type';
import { ViewStyle } from 'react-native';

export type ErrorMessageProps = {
  msg: string;
  statusCode?: number;
  contStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
};

export type ErrorValidationProps = {
  data?: ValidationError[];
  statusCode?: number;

  contStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
};
