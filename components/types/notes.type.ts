import { StyleProp, ViewStyle } from 'react-native';
import { CustomTextProps } from '../ui/types/CustomTextProps.type';
import { PageTitleProps } from './pageTitle.type';

export interface NotesProps {
  notes: string[] | string;
  render?: (item: string) => JSX.Element;
  wrapperStyles?: StyleProp<ViewStyle>;
  noteContStyles?: StyleProp<ViewStyle>;
  noteTextProps?: Omit<CustomTextProps, 'children'>;
  headingProps?: PageTitleProps;
}
