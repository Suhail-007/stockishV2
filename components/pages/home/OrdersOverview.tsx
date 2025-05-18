import React, { memo } from 'react';
import { View } from 'react-native';

import { getOrdersStatisticsByIdData } from '../../../apis/types/dashboard.apiType';
import useThemeColors from '../../../hooks/useThemeColors';

import { homeStyles } from './home.styles';
import Card from '../../ui/Card/Card';
import PageWrapper from '../../ui/PageWrapper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const _OrdersOverView = ({
  ordersStatistics,
  isLoading
}: {
  ordersStatistics: Omit<getOrdersStatisticsByIdData, 'totalValue' | 'totalProfit'>;
  isLoading: boolean;
}) => {
  const { colors } = useThemeColors();

  return (
    <PageWrapper.Section
      titleContStyle={{
        marginTop: 10,
        marginBottom: 0
      }}
      title='Orders Overview'
      titleProps={{
        fontVariant: 'quicksandBold',
        weight: '700'
      }}
      icon={
        <MaterialCommunityIcons
          name='cube-outline'
          size={24}
          color={colors.tertiary}
        />
      }>
      <View style={[homeStyles.ordersStatisticsCont]}>
        <Card
          iconContStyle={{
            backgroundColor: colors.grey100
          }}
          contStyle={{
            borderColor: colors.grey100,
            borderWidth: 1,
            borderRadius: 16
          }}
          title='Total Orders'
          icon={
            <MaterialCommunityIcons
              name='cube-outline'
              size={24}
              color={colors.tertiary}
            />
          }
          isLoading={isLoading}
          value={ordersStatistics?.totalOrders || '0'}
          textColor={colors.textPrimary}
          linearGradientColors={[colors.background, colors.background]}
        />

        <Card
          title='Pending'
          icon={
            <MaterialCommunityIcons
              name='cube-outline'
              size={24}
              color={colors.warning}
            />
          }
          isLoading={isLoading}
          value={ordersStatistics?.totalOrders || '0'}
          textColor={colors.textWhite}
          linearGradientColors={[colors.yellow, colors.yellow, colors.yellowLgLight]}
        />
      </View>
      <View style={[homeStyles.ordersStatisticsCont]}>
        <Card
          title='Delivered'
          icon={
            <MaterialCommunityIcons
              name='cube-outline'
              size={24}
              color={colors.green}
            />
          }
          isLoading={isLoading}
          value={ordersStatistics?.totalOrders || '0'}
          textColor={colors.textWhite}
          linearGradientColors={[colors.green, colors.green300]}
        />

        <Card
          title='Cancelled'
          icon={
            <MaterialCommunityIcons
              name='cube-outline'
              size={24}
              color={colors.red}
            />
          }
          isLoading={isLoading}
          value={ordersStatistics?.totalOrders || '0'}
          textColor={colors.textWhite}
          linearGradientColors={[colors.red, colors.red, colors.red300]}
        />
      </View>
    </PageWrapper.Section>
  );
};

const OrdersOverView = memo(_OrdersOverView);

export default OrdersOverView;
