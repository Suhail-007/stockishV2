import { TextStyle } from 'react-native';
import { ButtonProps } from 'react-native-paper';

import { Fonts } from '../../../constants/fonts';

export type TabBarButtonProps = {
  routeName: string;
  params?: Readonly<object | undefined>;
  isFocused: boolean;
  accessibilityLabel?: string;
  tabBarButtonTestID?: string;
  onPress: () => void;
  href?: string;
  onLongPress: () => void;
  label: string;
};

export type CustomButtonProps = Omit<ButtonProps, 'mode'> & {
  weight?: TextStyle['fontWeight'];
  fontFamily?: keyof typeof Fonts;
};
