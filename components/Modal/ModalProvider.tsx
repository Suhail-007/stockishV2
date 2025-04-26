import { Portal } from 'react-native-paper';

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return <Portal>{children}</Portal>;
};

export default ModalProvider;
