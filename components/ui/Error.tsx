import { StyleSheet, View } from 'react-native';
import React from 'react';
import useThemeColors from '../../hooks/useThemeColors';
import { AntDesign } from '@expo/vector-icons';
import { ErrorMessageProps, ErrorValidationProps } from './types/Error.type';
import { Text } from 'react-native-paper';
import { Fonts } from '../../constants/fonts';
import { STATUS_CODES } from '../../constants/statusCodes';
import Animated, { FadeIn } from 'react-native-reanimated';

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

  const isServiceUnavailable =
    statusCode === STATUS_CODES.serviceUnavailable || statusCode === STATUS_CODES.internalServerError;

  //Add info and success styles

  return (
    <Animated.View
      entering={FadeIn.duration(250)}
      style={[styles.errorContainer, dynamicStyles.errorContainer, contStyle]}>
      <AntDesign
        name='warning'
        size={18}
        color={colors.error}
      />
      {isServiceUnavailable && (
        <Text
          variant='bodySmall'
          style={[styles.errorText, dynamicStyles.errorText, messageStyle]}>
          Service Unavailable {statusCode ? `(${statusCode})` : ''}
        </Text>
      )}
      {!isServiceUnavailable && (
        <Text
          variant='bodySmall'
          style={[styles.errorText, dynamicStyles.errorText, messageStyle]}>
          {msg} {statusCode ? `(${statusCode})` : ''}
        </Text>
      )}
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
