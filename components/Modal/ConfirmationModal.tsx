import React from 'react';
import { View } from 'react-native';
import { Modal } from 'react-native-paper';

import useThemeColors from '../../hooks/useThemeColors';
import Button from '../ui/Button';
import CustomText from '../ui/CustomText';

import modalStyles from './modal.styles';
import ModalProvider from './ModalProvider';


type ConfirmationModalProps = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  confirmText?: string;
  cancelText?: string;
  confirmButtonColor?: string;
};

const ConfirmationModal = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonColor = 'red'
}: ConfirmationModalProps) => {
  const { colors } = useThemeColors();
  return (
    <ModalProvider>
      <Modal
        visible={visible}
        onDismiss={onCancel}
        contentContainerStyle={modalStyles.container}>
        <CustomText
          variant='titleMedium'
          style={modalStyles.title}>
          {title}
        </CustomText>
        <CustomText
          variant='bodyMedium'
          style={modalStyles.message}>
          {message}
        </CustomText>
        <View style={modalStyles.actions}>
          <Button.Transparent
            style={modalStyles.actionBtn}
            mode='text'
            textColor={colors.textSecondary}
            onPress={onCancel}>
            {cancelText}
          </Button.Transparent>
          <Button.Secondary
            style={modalStyles.actionBtn}
            onPress={onConfirm}
            loading={isLoading}
            buttonColor={confirmButtonColor}>
            {confirmText}
          </Button.Secondary>
        </View>
      </Modal>
    </ModalProvider>
  );
};

export default ConfirmationModal;
