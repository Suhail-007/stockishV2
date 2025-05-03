import { Portal } from 'react-native-paper';

/**
 * A provider component for `CustomModal` that makes use of `Portal` component from `react-native-paper`.
 *
 * @example
 * import { ModalProvider } from '@components/Modal';
 * import { CustomModal } from '@components/Modal';
 *
 * const MyComponent = () => {
 *   return (
 *     <ModalProvider>
 *       <CustomModal {...props} />
 *     </ModalProvider>
 *   );
 * };
 *
 * @component
 * @hideconstructor
 */
const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return <Portal>{children}</Portal>;
};

export default ModalProvider;
