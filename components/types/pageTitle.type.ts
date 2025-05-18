import { JSX } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { CustomTextProps } from '../ui/types/CustomTextProps.type';

export type PageTitleProps = {
  title?: string;
  subtitle?: string;
  icon?: JSX.Element;
  containerStyles?: StyleProp<ViewStyle>;
  titleStyles?: StyleProp<TextStyle>;
  subtitleStyles?: StyleProp<TextStyle>;
  showGreeting?: boolean;
  titleProps?: Omit<CustomTextProps, 'children'>;
  subtitleProps?: Omit<CustomTextProps, 'children'>;
};
