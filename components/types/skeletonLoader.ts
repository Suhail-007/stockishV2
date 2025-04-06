import { ReactNode } from 'react';
import ShimmerPlaceholder, { ShimmerPlaceholderProps } from 'react-native-shimmer-placeholder';
export type SkeletonLoaderProps = ShimmerPlaceholderProps & {
  render?: (Item: typeof ShimmerPlaceholder) => ReactNode;
  noOfChildren: number;
  isLoading?: boolean;
};
