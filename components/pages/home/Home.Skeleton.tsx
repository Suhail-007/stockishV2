import { View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

import SkeletonLoader from '../../SkeletonLoader';

import { homeSkeletonStyles } from './home.styles';

/**
 * A skeleton component for the home page.
 *
 * @param {Object} props The component props.
 * @param {boolean} props.loading Whether the component should be in a loading state.
 *
 */
const HomeSkeleton = () => null;

const Greetings = () => (
  <View style={homeSkeletonStyles.heading}>
    <SkeletonLoader
      containerStyle={{
        height: moderateScale(30)
      }}
    />
    <SkeletonLoader containerStyle={{ height: moderateScale(20) }} />
  </View>
);
const LastFiveOrders = () => (
  <View style={[homeSkeletonStyles.sectionCont, homeSkeletonStyles.usersCont]}>
    <SkeletonLoader containerStyle={[homeSkeletonStyles.skeletonBox, { height: scale(200) }]} />
  </View>
);

const MonthlyOrders = () => (
  <View>
    <View style={[homeSkeletonStyles.ordersStatisticsCont]}>
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonLoader
          key={index}
          containerStyle={[{ height: homeSkeletonStyles.skeletonBox.height, width: '48%' }]}
        />
      ))}
    </View>
  </View>
);

const TotalBalance = () => (
  <View style={[homeSkeletonStyles.sectionCont, homeSkeletonStyles.usersCont]}>
    <SkeletonLoader containerStyle={homeSkeletonStyles.skeletonBox} />
  </View>
);

/**
 * A skeleton component for monthly sell and profit.
 *
 * @param {boolean} loading if true, show skeleton loader.
 * @returns {JSX.Element} a skeleton component for monthly sell and profit.
 */
const MonthlySellNProfit = () => (
  <View style={[homeSkeletonStyles.sectionCont, homeSkeletonStyles.usersCont]}>
    {Array.from({ length: 2 }).map((_, index) => (
      <SkeletonLoader
        key={index}
        containerStyle={[homeSkeletonStyles.skeletonBox]}
      />
    ))}
  </View>
);

const UsersStatistics = () => (
  <View style={[homeSkeletonStyles.sectionCont, homeSkeletonStyles.usersCont]}>
    <View style={homeSkeletonStyles.usersStatisticsCont}>
      <SkeletonLoader containerStyle={[homeSkeletonStyles.orderStatisticsCont]} />
      <SkeletonLoader containerStyle={[homeSkeletonStyles.orderStatisticsCont]} />
    </View>
  </View>
);

const ProductStatistics = () => (
  <View style={[homeSkeletonStyles.sectionCont, homeSkeletonStyles.usersCont]}>
    <View style={homeSkeletonStyles.usersStatisticsCont}>
      <SkeletonLoader containerStyle={[homeSkeletonStyles.orderStatisticsCont]} />
      <SkeletonLoader containerStyle={[homeSkeletonStyles.orderStatisticsCont]} />
    </View>
  </View>
);

Greetings.displayName = 'Greetings';
LastFiveOrders.displayName = 'LastFiveOrders';
TotalBalance.displayName = 'TotalBalance';
MonthlyOrders.displayName = 'MonthlyOrders';
MonthlySellNProfit.displayName = 'MonthlySellNProfit';
UsersStatistics.displayName = 'UsersStatistics';
ProductStatistics.displayName = 'ProductStatistics';

HomeSkeleton.Greetings = Greetings;
HomeSkeleton.LastFiveOrders = LastFiveOrders;
HomeSkeleton.TotalBalance = TotalBalance;
HomeSkeleton.MonthlySellNProfit = MonthlySellNProfit;
HomeSkeleton.MonthlyOrders = MonthlyOrders;
HomeSkeleton.UsersStatistics = UsersStatistics;
HomeSkeleton.ProductStatistics = ProductStatistics;

export default HomeSkeleton;
