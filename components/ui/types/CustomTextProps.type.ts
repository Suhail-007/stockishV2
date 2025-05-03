import { TextStyle } from 'react-native';
import { TextProps } from 'react-native-paper';

import { Fonts } from '../../../constants/fonts';

export type CustomTextProps = TextProps<string> & {
  fontVariant?: keyof typeof Fonts;
  color?: string;
  weight?: TextStyle['fontWeight'];
};
