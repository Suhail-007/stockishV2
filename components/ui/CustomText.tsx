import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native-paper';

import { Fonts } from '../../constants/fonts';
import useThemeColors from '../../hooks/useThemeColors';

import { CustomTextProps } from './types/CustomTextProps.type';

/**
 * CustomText component
 *
 * @param {CustomTextProps} props - The component props
 * @param {React.ReactNode} props.children - The text content to be displayed
 * @param {object} [props.style] - Additional styles to be applied to the text
 * @param {keyof typeof Fonts} [props.fontVariant='quicksandMedium'] - The font variant to use
 * @param {string} [props.color] - The color of the text
 *
 */
const _CustomText = ({
  children,
  style,
  fontVariant = 'quicksandMedium',
  color,
  weight,
  ...props
}: CustomTextProps) => {
  const { colors } = useThemeColors();
  const fontFamily = Fonts[fontVariant];

  const textStyle = useMemo(
    () =>
      StyleSheet.compose(
        [
          {
            color: colors.text,
            fontWeight: '400',
            fontFamily
          }
        ],
        [
          {
            color: color,
            fontWeight: weight,
            fontFamily
          }
        ]
      ) as TextProps<string>['style'],
    [color, colors.text, weight, fontFamily]
  );

  return (
    <Text
      style={[textStyle, style]}
      {...props}>
      {children}
    </Text>
  );
};

const CustomText = memo(_CustomText);

export default CustomText;
