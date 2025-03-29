import { TextInput, TextInputProps } from 'react-native-paper';

export interface CustomTextInput extends React.FC<TextInputProps> {
  Icon: typeof TextInput.Icon;
}
