import React from 'react';
import Animated from 'react-native-reanimated';

import { useSkeletonAnimation } from '../hooks/useSkeletonAnimation';
import useThemeColors from '../hooks/useThemeColors';

import type { SkeletonLoaderProps } from './types/skeletonLoader';

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ isLoading = true, containerStyle, speed = 1400 }) => {
  const { colors } = useThemeColors();
  const animatedStyle = useSkeletonAnimation(speed);

  if (!isLoading) {
    return null;
  }

  return (
    <Animated.View
      style={[
        {
          borderRadius: 4,
          overflow: 'hidden',
          minHeight: 20,
          backgroundColor: colors.skeleton
        },
        containerStyle,
        animatedStyle
      ]}
    />
  );
};

export default SkeletonLoader;
