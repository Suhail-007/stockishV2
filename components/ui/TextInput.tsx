import { TextInput as RNTextInput } from 'react-native-paper';
import { CustomTextInput } from './interface/textInput.interface';
import useThemeColors from '../../hooks/useThemeColors';
import { StyleSheet } from 'react-native';
import { Fonts } from '../../constants/fonts';

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
