import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import useThemeColors from '../hooks/useThemeColors';
import { SkeletonLoaderProps } from './types/skeletonLoader';
import { LinearGradient } from 'expo-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const SkeletonLoader = ({ noOfChildren = 1, render, ...rest }: SkeletonLoaderProps) => {
  const { colors } = useThemeColors();
  const children = Array.from({ length: noOfChildren });

  return (
    <ShimmerPlaceholder
      {...rest}
      shimmerColors={[colors.skeleton, colors.skeletonHighlight]}>
      <>
        {children.map((_, index) => (
          <React.Fragment key={index}>
            {render ? render(ShimmerPlaceholder) : <ShimmerPlaceholder style={styles.defaultItem} />}
          </React.Fragment>
        ))}
      </>
    </ShimmerPlaceholder>
  );
};

export default SkeletonLoader;

const styles = StyleSheet.create({
  defaultItem: {
    width: 100,
    height: 20,
    borderRadius: 4,
    marginBottom: 10
  }
});
