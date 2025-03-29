import React from 'react';
import { Button as RNButton, ButtonProps } from 'react-native-paper';
import useThemeColors from '../../hooks/useThemeColors';

const ButtonSecondary: React.FC<ButtonProps> = ({ ...props }) => {
  const { colors } = useThemeColors();
  return (
    <RNButton
      buttonColor={colors.buttonBgSecondary}
      textColor={colors.textWhite}
      // theme={{ colors: { primary: colors.buttonBg } }}
      // style={{ backgroundColor: colors.buttonBgSecondary }}
      // textColor={colors.textWhite}
      mode='contained'
      {...props}></RNButton>
  );
};
const ButtonOutline: React.FC<ButtonProps> = ({ ...props }) => {
  const { colors } = useThemeColors();
  return (
    <RNButton
      textColor={colors.secondaryBg}
      mode='outlined'
      {...props}></RNButton>
  );
};

const ButtonContained: React.FC<ButtonProps> = ({ ...props }) => {
  const { colors } = useThemeColors();
  return (
    <RNButton
      mode='contained'
      textColor={colors.textWhite}
      theme={{ colors: { primary: colors.buttonBg } }}
      {...props}></RNButton>
  );
};

const Button = () => null;

Button.Primary = ButtonContained;
Button.Secondary = ButtonSecondary;
Button.Tertiary = ButtonOutline;
Button.Transparent = RNButton;

export default Button;
