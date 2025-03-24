import { TextInput as RNTextInput, TextInputProps } from 'react-native-paper';

const TextInput: React.FC<TextInputProps> = ({ ...props }) => {
  return <RNTextInput {...props}></RNTextInput>;
};

export default TextInput;
