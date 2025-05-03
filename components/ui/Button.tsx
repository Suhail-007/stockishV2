import { FC, memo, useMemo } from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Button as RNButton } from 'react-native-paper';

import { Fonts } from '../../constants/fonts';
import useThemeColors from '../../hooks/useThemeColors';

import { CustomButtonProps } from './types/buttons.type';

const _ButtonSecondary: FC<CustomButtonProps> = ({ ...props }) => {
  const { colors } = useThemeColors();

  const memoizedLabelStyle = useMemo(() => {
    return StyleSheet.compose(
      [props.labelStyle],
      [
        {
          fontWeight: props.weight,
          fontFamily: props.fontFamily || Fonts.quicksandMedium,
          fontSize: (props.labelStyle && StyleSheet.flatten(props.labelStyle)?.fontSize) || 16
        }
      ]
    ) as TextStyle;
  }, [props.labelStyle, props.weight, props.fontFamily]);

  return (
    <RNButton
      labelStyle={memoizedLabelStyle}
      buttonColor={colors.buttonBgSecondary}
      textColor={colors.textWhite}
      // theme={{ colors: { primary: colors.buttonBg } }}
      // style={{ backgroundColor: colors.buttonBgSecondary }}
      // textColor={colors.textWhite}
      mode='contained'
      {...props}></RNButton>
  );
};
const _ButtonOutline: FC<CustomButtonProps> = ({ ...props }) => {
  const { colors } = useThemeColors();

  const memoizedLabelStyle = useMemo(() => {
    return StyleSheet.compose(
      [props.labelStyle],
      [
        {
          fontWeight: props.weight,
          fontFamily: props.fontFamily || Fonts.quicksandMedium,
          fontSize: (props.labelStyle && StyleSheet.flatten(props.labelStyle)?.fontSize) || 16
        }
      ]
    ) as TextStyle;
  }, [props.labelStyle, props.weight, props.fontFamily]);

  return (
    <RNButton
      textColor={colors.primary}
      mode='outlined'
      style={{ borderRadius: 12, borderColor: colors.primary }}
      labelStyle={memoizedLabelStyle}
      {...props}></RNButton>
  );
};

const _ButtonContained: FC<CustomButtonProps> = ({ ...props }) => {
  const { colors } = useThemeColors();

  const memoizedLabelStyle = useMemo(() => {
    return StyleSheet.compose(
      [props.labelStyle],
      [
        {
          fontWeight: props.weight,
          fontFamily: props.fontFamily || Fonts.quicksandMedium,
          fontSize: (props.labelStyle && StyleSheet.flatten(props.labelStyle)?.fontSize) || 16
        }
      ]
    ) as TextStyle;
  }, [props.labelStyle, props.weight, props.fontFamily]);

  return (
    <RNButton
      mode='contained'
      textColor={colors.textWhite}
      theme={{ colors: { primary: colors.buttonBg } }}
      labelStyle={memoizedLabelStyle}
      {...props}></RNButton>
  );
};

const Button = () => null;

const ButtonSecondary = memo(_ButtonSecondary);
const ButtonOutline = memo(_ButtonOutline);
const ButtonContained = memo(_ButtonContained);

Button.Primary = ButtonContained;
Button.Secondary = ButtonSecondary;
Button.Tertiary = ButtonOutline;
Button.Transparent = RNButton;

export default Button;
