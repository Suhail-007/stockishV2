import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { ModalProps, TitleProps, ButtonProps } from 'react-native-paper';

export type CustomModalProps = ModalProps & {
  centerAligned?: boolean;
  height?: number;
  width?: number;
};

export type ModalTitleProps = {
  title?: string;
  titleProps?: TitleProps;
  titleContStyle?: StyleProp<ViewStyle>;
};

export type ModalContentProps = ViewProps & {
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export type ModalFooterProps = ViewProps & {
  footerContainerStyle?: StyleProp<ViewStyle>;
};

export type FooterAction = Omit<ButtonProps, 'children'> & {
  key?: string;
  label: string;
};

export type ModalFooterActionsProps = ViewProps & {
  actions: FooterAction[];
  actionsContainerStyle?: StyleProp<ViewStyle>;
};
