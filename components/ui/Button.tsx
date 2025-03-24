import React from 'react';
import { Button as RNButton, ButtonProps } from 'react-native-paper';

const ButtonOutline: React.FC<ButtonProps> = ({ ...props }) => {
  return <RNButton {...props} mode='outlined'></RNButton>;
};

const ButtonContained: React.FC<ButtonProps> = ({ ...props }) => {
  return <RNButton {...props} mode='contained'></RNButton>;
};

const Button = () => null;

Button.Contained = ButtonContained;
Button.Outline = ButtonOutline;

export default Button;
