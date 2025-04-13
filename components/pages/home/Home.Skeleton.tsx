import { useWindowDimensions, View } from 'react-native';
import React, { FC } from 'react';
import SkeletonLoader from '../../SkeletonLoader';
import { moderateScale } from 'react-native-size-matters';
import { homeSkeletonStyles } from './home.styles';

/**
 * A skeleton component for the home page.
 *
 * @param {Object} props The component props.
 * @param {boolean} props.loading Whether the component should be in a loading state.
 *
 */
const HomeSkeleton = ({ loading }: { loading: boolean }) => null;

const Greetings: FC<{ loading: boolean }> = ({ loading }) => {
  const { width: dWidth } = useWindowDimensions();
  return (
    <View style={homeSkeletonStyles.heading}>
      <SkeletonLoader
        visible={loading}
        width={dWidth - 70}
        height={moderateScale(25)}
        noOfChildren={1}></SkeletonLoader>

      <SkeletonLoader
        visible={loading}
        noOfChildren={1}
        width={dWidth - 100}
        height={moderateScale(20)}></SkeletonLoader>
    </View>
  );
};

const MonthlyOrders: FC<{ loading: boolean }> = ({ loading }) => {
  const { width: dWidth } = useWindowDimensions();
  return (
    <View style={[homeSkeletonStyles.ordersStatisticsCont, homeSkeletonStyles.sectionCont]}>
      <SkeletonLoader
        visible={loading}
        noOfChildren={1}
        width={dWidth - 100}
        height={moderateScale(20)}></SkeletonLoader>

      <SkeletonLoader
        visible={loading}
        noOfChildren={4}
        render={(ShimmerItem, colors) => (
          <ShimmerItem
            shimmerColors={colors}
            shimmerWidthPercent={100}
            style={homeSkeletonStyles.orderStatisticsCont}></ShimmerItem>
        )}></SkeletonLoader>
    </View>
  );
};

const LastFiveOrders: FC<{ loading: boolean }> = ({ loading }) => {
  const { width: dWidth } = useWindowDimensions();

  return (
    <View style={[homeSkeletonStyles.sectionCont, homeSkeletonStyles.usersCont]}>
      <SkeletonLoader
        visible={loading}
        noOfChildren={1}
        width={dWidth - 100}
        height={moderateScale(30)}></SkeletonLoader>
      <SkeletonLoader
        visible={loading}
        noOfChildren={1}
        style={{
          width: '100%'
        }}
        shimmerWidthPercent={100}
        height={moderateScale(180)}></SkeletonLoader>
    </View>
  );
};

const TotalBalance: FC<{ loading: boolean }> = ({ loading }) => {
  const { width: dWidth } = useWindowDimensions();

  return (
    <View style={[homeSkeletonStyles.sectionCont, homeSkeletonStyles.usersCont]}>
      <SkeletonLoader
        visible={loading}
        noOfChildren={1}
        width={dWidth - 100}
        height={moderateScale(30)}></SkeletonLoader>
      <SkeletonLoader
        visible={loading}
        noOfChildren={1}
        style={{
          width: '100%'
        }}
        shimmerWidthPercent={100}
        height={moderateScale(100)}></SkeletonLoader>
    </View>
  );
};

const UsersStatistics: FC<{ loading: boolean }> = ({ loading }) => {
  const { width: dWidth } = useWindowDimensions();

  return (
    <View style={[homeSkeletonStyles.sectionCont, homeSkeletonStyles.usersCont]}>
      <SkeletonLoader
        visible={loading}
        noOfChildren={1}
        width={dWidth - 100}
        height={moderateScale(30)}></SkeletonLoader>

      <View style={homeSkeletonStyles.usersStatisticsCont}>
        <SkeletonLoader
          visible={loading}
          noOfChildren={2}
          style={{
            width: '100%'
          }}
          render={(ShimmerItem, colors) => (
            <ShimmerItem
              shimmerColors={colors}
              shimmerWidthPercent={100}
              style={homeSkeletonStyles.userStatisticsCont}></ShimmerItem>
          )}></SkeletonLoader>
      </View>
    </View>
  );
};
const ProductStatistics: FC<{ loading: boolean }> = ({ loading }) => {
  const { width: dWidth } = useWindowDimensions();

  return (
    <View style={[homeSkeletonStyles.sectionCont, homeSkeletonStyles.usersCont]}>
      <SkeletonLoader
        visible={loading}
        noOfChildren={1}
        width={dWidth - 100}
        height={moderateScale(30)}></SkeletonLoader>

      <View style={homeSkeletonStyles.usersStatisticsCont}>
        <SkeletonLoader
          visible={loading}
          noOfChildren={2}
          style={{
            width: '100%'
          }}
          render={(ShimmerItem, colors) => (
            <ShimmerItem
              shimmerColors={colors}
              shimmerWidthPercent={100}
              style={homeSkeletonStyles.userStatisticsCont}></ShimmerItem>
          )}></SkeletonLoader>
      </View>
    </View>
  );
};

Greetings.displayName = 'Greetings';
LastFiveOrders.displayName = 'LastFiveOrders';
TotalBalance.displayName = 'TotalBalance';
MonthlyOrders.displayName = 'MonthlyOrders';
UsersStatistics.displayName = 'UsersStatistics';
ProductStatistics.displayName = 'ProductStatistics';

HomeSkeleton.Greetings = Greetings;
HomeSkeleton.LastFiveOrders = LastFiveOrders;
HomeSkeleton.TotalBalance = TotalBalance;
HomeSkeleton.MonthlyOrders = MonthlyOrders;
HomeSkeleton.UsersStatistics = UsersStatistics;
HomeSkeleton.ProductStatistics = ProductStatistics;

export default HomeSkeleton;
