import { memo, useMemo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Modal } from 'react-native-paper';

import useThemeColors from '../../hooks/useThemeColors';
import Button from '../ui/Button';
import CustomText from '../ui/CustomText';

import modalStyles from './modal.styles';
import {
  CustomModalProps,
  ModalTitleProps,
  ModalContentProps,
  ModalFooterProps,
  ModalFooterActionsProps
} from './modal.types';

const _ModalTitle = (props: ModalTitleProps) => {
  const { title, titleProps, titleContStyle } = props;
  const { colors } = useThemeColors();

  const dynamicStyles = useMemo(() => {
    return {
      titleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.grey200
      } as StyleProp<ViewStyle>
    };
  }, [colors.grey200]);

  return (
    <View style={[modalStyles.titleContainer, dynamicStyles.titleContainer, titleContStyle]}>
      <CustomText
        fontVariant='quicksandMedium'
        variant='headlineSmall'
        weight='500'
        style={{ marginBottom: 0, marginTop: 0, padding: 0 }}
        {...titleProps}>
        {title}
      </CustomText>
    </View>
  );
};

const _ModalContent = (props: ModalContentProps) => {
  const { children, contentContainerStyle, ...rest } = props;
  return (
    <View
      style={[modalStyles.contentContainer, contentContainerStyle]}
      {...rest}>
      {children}
    </View>
  );
};

const _ModalFooter = (props: ModalFooterProps) => {
  const { children, footerContainerStyle, ...rest } = props;
  const { colors } = useThemeColors();

  const dynamicStyles = useMemo(() => {
    return {
      titleContainer: {
        borderTopColor: colors.grey200
      } as StyleProp<ViewStyle>
    };
  }, [colors.grey200]);

  return (
    <View
      style={[modalStyles.footerContainer, dynamicStyles.titleContainer, footerContainerStyle]}
      {...rest}>
      {children}
    </View>
  );
};

const _ModalFooterActions = (props: ModalFooterActionsProps) => {
  const { actions, actionsContainerStyle, ...rest } = props;
  return (
    <View
      style={[modalStyles.footerActionsContainer, actionsContainerStyle]}
      {...rest}>
      {actions.map((action, index) => (
        <Button.Tertiary
          key={action.key || index}
          {...action}>
          {action.label}
        </Button.Tertiary>
      ))}
    </View>
  );
};

const _CustomModal = (props: CustomModalProps) => {
  const { colors } = useThemeColors();

  const { children, centerAligned, width, height, ...rest } = props;

  const dynamicStyles = useMemo(() => {
    return {
      bg: {
        backgroundColor: colors.screenBg
      },
      contentContainer: {
        justifyContent: centerAligned ? 'center' : 'flex-start'
      } as StyleProp<ViewStyle>
    };
  }, [colors.screenBg, centerAligned]);

  return (
    <Modal {...rest}>
      <View style={[modalStyles.modalContainer, dynamicStyles.bg, dynamicStyles.contentContainer]}>{children}</View>
    </Modal>
  );
};

interface CustomModalComponent extends React.MemoExoticComponent<typeof _CustomModal> {
  Title: React.MemoExoticComponent<typeof _ModalTitle>;
  Content: React.MemoExoticComponent<typeof _ModalContent>;
  Footer: React.MemoExoticComponent<typeof _ModalFooter>;
  FooterActions: React.MemoExoticComponent<typeof _ModalFooterActions>;
}

const CustomModal = memo(_CustomModal) as CustomModalComponent;
CustomModal.Title = memo(_ModalTitle);
CustomModal.Content = memo(_ModalContent);
CustomModal.Footer = memo(_ModalFooter);
CustomModal.FooterActions = memo(_ModalFooterActions);

export default CustomModal;
