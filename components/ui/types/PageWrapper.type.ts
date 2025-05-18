import { JSX } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { TextProps } from 'react-native-paper';

import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';
import { CustomTextProps } from './CustomTextProps.type';

export type SectionPageProps = ViewProps & {
  title?: string;
  titleProps?: Omit<CustomTextProps, 'children'>;
  icon?: JSX.Element;
  titleContStyle?: StyleProp<ViewStyle>;
  heading?: React.ReactNode;
};
