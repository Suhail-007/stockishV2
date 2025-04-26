import { memo } from 'react';
import { useWindowDimensions, View } from 'react-native';

import SkeletonLoader from '../../SkeletonLoader';

const _ProductsSkeleton = ({ isLoading }: { isLoading: boolean }) => {
  const { height } = useWindowDimensions();
  return (
    <View style={{ gap: 2 }}>
      <SkeletonLoader
        containerStyle={{ height: height / 1.5 }}
        isLoading={isLoading}></SkeletonLoader>
    </View>
  );
};

const ProductsSkeleton = memo(_ProductsSkeleton);

export default ProductsSkeleton;
