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
    <>
      {children.map((_, index) => (
        <React.Fragment key={index}>
          {render ? (
            render(ShimmerPlaceholder, [colors.skeleton, colors.skeletonHighlight])
          ) : (
            <ShimmerPlaceholder
              shimmerColors={[colors.skeleton, colors.skeletonHighlight]}
              width={rest.width}
              height={rest.height}
              style={[styles.defaultItem, rest.style]}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default SkeletonLoader;

const styles = StyleSheet.create({
  defaultItem: {
    borderRadius: 4
  }
});
