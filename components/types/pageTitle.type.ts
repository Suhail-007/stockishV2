import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type PageTitleProps = {
  title?: string;
  subtitle?: string;
  icon?: JSX.Element;
  containerStyles?: StyleProp<ViewStyle>;
  titleStyles?: StyleProp<TextStyle>;
  subtitleStyles?: StyleProp<TextStyle>;
  showGreeting?: boolean;
};
