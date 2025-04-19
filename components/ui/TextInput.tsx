import { StyleSheet } from 'react-native';
import { TextInput as RNTextInput } from 'react-native-paper';

import { Fonts } from '../../constants/fonts';
import useThemeColors from '../../hooks/useThemeColors';

import { CustomTextInput } from './interface/textInput.interface';

const TextInput: CustomTextInput = ({ ...props }) => {
  const { colors } = useThemeColors();
  return (
    <RNTextInput
      style={styles.input}
      {...props}
      theme={{ colors: { primary: colors.borderFocused } }}></RNTextInput>
  );
};

TextInput.Icon = RNTextInput.Icon;

const styles = StyleSheet.create({
  input: {
    fontFamily: Fonts.quicksandMedium
  }
});

export default TextInput;
