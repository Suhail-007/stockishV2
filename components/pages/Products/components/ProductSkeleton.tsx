import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';

import useThemeColors from '../../../../hooks/useThemeColors';

import ProductTableColumns from './ProductTableColumns';

interface ProductSkeletonProps {
  count?: number;
}

const ProductSkeleton = ({ count = 3 }: ProductSkeletonProps) => {
  const { colors } = useThemeColors();

  return (
    <DataTable>
      <ProductTableColumns />

      {Array.from({ length: count }).map((_, index) => (
        <Animated.View
          key={index}
          entering={FadeIn.delay(index * 100)}>
          <DataTable.Row>
            <DataTable.Cell>
              <View style={[styles.skeletonCell, styles.nameCell, { backgroundColor: colors.skeleton }]} />
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <View style={[styles.skeletonCell, styles.numericCell, { backgroundColor: colors.skeleton }]} />
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <View style={[styles.skeletonCell, styles.numericCell, { backgroundColor: colors.skeleton }]} />
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <View style={[styles.skeletonCell, styles.statusCell, { backgroundColor: colors.skeleton }]} />
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <View style={[styles.skeletonCell, styles.actionsCell, { backgroundColor: colors.skeleton }]} />
            </DataTable.Cell>
          </DataTable.Row>
        </Animated.View>
      ))}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  skeletonCell: {
    height: 20,
    borderRadius: 4,
    marginVertical: 8
  },
  nameCell: {
    width: 120
  },
  numericCell: {
    width: 60
  },
  statusCell: {
    width: 80
  },
  actionsCell: {
    width: 40
  }
});

export default ProductSkeleton;
