import { StyleProp, ViewStyle } from 'react-native';

export interface SkeletonLoaderProps {
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  speed?: number;
}
