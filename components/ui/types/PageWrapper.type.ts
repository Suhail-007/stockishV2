import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { TextProps } from 'react-native-paper';

import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';

export type SectionPageProps = ViewProps & {
  title?: string;
  titleProps?: Omit<TextProps<VariantProp<never>>, 'children'>;
  icon?: JSX.Element;
  titleContStyle?: StyleProp<ViewStyle>;
};
