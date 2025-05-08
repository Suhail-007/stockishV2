import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';

import { AntDesign } from '@expo/vector-icons';

import { Fonts } from '../../constants/fonts';
import { STATUS_CODES } from '../../constants/statusCodes';
import useThemeColors from '../../hooks/useThemeColors';

import { ErrorMessageProps, ErrorValidationProps } from './types/Error.type';

const Error = () => null;

/**
 * Message component for displaying error messages.
 *
 * @param {{ msg: string, statusCode: number }} props
 * @prop {string} msg - The error message to display.
 * @prop {number} statusCode - The HTTP status code of the error.
 *
 * @returns {React.ReactElement} A React element displaying the error message.
 */
const Message = ({ msg, statusCode, contStyle, messageStyle }: ErrorMessageProps): React.ReactElement => {
  const { colors } = useThemeColors();

  const dynamicStyles = {
    errorContainer: {
      backgroundColor: colors.errorBg
    },
    errorText: {
      color: colors.error
    }
  };

  const getErrorMessage = () => {
    switch (statusCode) {
      case STATUS_CODES.serviceUnavailable:
        return 'Service is temporarily unavailable. Please try again later.';
      case STATUS_CODES.internalServerError:
        return 'An internal server error occurred. Our team has been notified.';
      case STATUS_CODES.notFound:
        return msg || 'The requested resource was not found.';
      case STATUS_CODES.unauthorized:
        return 'You are not authorized to perform this action.';
      case STATUS_CODES.forbidden:
        return 'Access denied. You do not have permission to perform this action.';
      case STATUS_CODES.badRequest:
        return msg || 'Invalid request. Please check your input.';
      case STATUS_CODES.conflict:
        return msg || 'This operation caused a conflict with existing data.';
      case STATUS_CODES.tooManyRequests:
        return 'Too many requests. Please try again later.';
      default:
        return msg || 'An unexpected error occurred.';
    }
  };

  return (
    <Animated.View
      entering={FadeIn.duration(250)}
      style={[styles.errorContainer, dynamicStyles.errorContainer, contStyle]}>
      <AntDesign
        name='warning'
        size={18}
        color={colors.error}
      />
      <Text
        variant='bodySmall'
        style={[styles.errorText, dynamicStyles.errorText, messageStyle]}>
        {getErrorMessage()} {statusCode ? `(${statusCode})` : ''}
      </Text>
    </Animated.View>
  );
};

const ValidationErrors = ({ data, contStyle, messageStyle }: ErrorValidationProps): React.ReactElement => {
  const { colors } = useThemeColors();

  const dynamicStyles = {
    errorContainer: {
      backgroundColor: colors.errorBg
    },
    errorText: {
      color: colors.error
    }
  };

  return (
    <View style={[styles.errorValidationCont, dynamicStyles.errorContainer, contStyle]}>
      <View style={styles.errorHeading}>
        <AntDesign
          name='warning'
          size={14}
          color={colors.error}
        />
        <Text
          variant='bodySmall'
          style={[styles.errorHeading, dynamicStyles.errorText]}>
          Validation Errors:
        </Text>
      </View>

      <View>
        {data &&
          data?.length > 0 &&
          data.map((error, index) => (
            <Text
              key={index}
              variant='bodySmall'
              style={[styles.errorText, dynamicStyles.errorText, messageStyle]}>
              {index + 1}. {error.msg}
            </Text>
          ))}
      </View>
    </View>
  );
};

Error.Message = Message;
Error.ValidationErrors = ValidationErrors;

export default Error;

const styles = StyleSheet.create({
  errorContainer: {
    padding: 10,
    borderRadius: 5,
    // marginInline: 20,
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
    flexDirection: 'row'
  },

  errorValidationCont: {
    padding: 10,
    borderRadius: 5,
    marginInline: 20,
    marginTop: 10,
    gap: 10
  },

  errorHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },

  errorText: {
    fontFamily: Fonts.quicksandMedium,
    fontWeight: '400',
    width: '90%'
  }
});
