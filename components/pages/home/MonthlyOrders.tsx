import React, { Fragment, memo, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { ImageBackground } from 'react-native';
import { Icon } from 'react-native-paper';

import { getOrdersStatisticsByIdData } from '../../../apis/types/dashboard.apiType';
import { globalStyles } from '../../../constants/globalStyles';
import useThemeColors from '../../../hooks/useThemeColors';
import CustomText from '../../ui/CustomText';
import PageWrapper from '../../ui/PageWrapper';
import { getOrdersStatisticsForTenantFromStorage } from '../helper';

import { homeStyles } from './home.styles';

const cancelledOrderImage = require('../../../assets/images/home/cancel.png');
const deliveredOrderImage = require('../../../assets/images/home/delivered.png');
const pendingOrderImage = require('../../../assets/images/home/pendingOrders.png');
const totalOrderImage = require('../../../assets/images/home/totalOrderList.png');

const _MonthlyOrders = ({
  ordersStatistics
}: {
  ordersStatistics: Omit<getOrdersStatisticsByIdData, 'totalAmount' | 'totalProfit'>;
}) => {
  const { colors } = useThemeColors();

  const dynamicStyles = useMemo(() => {
    return {
      heading: {
        color: colors.textPrimary
      },
      cardBg: {
        backgroundColor: colors.grey100
      },

      totalOrdersText: {
        color: colors.tertiary
      },
      pendingOrdersText: {
        color: colors.yellowText900
      },
      deliveredOrdersText: {
        color: colors.greenText900
      },
      cancelledOrdersText: {
        color: colors.redText900
      }
    };
  }, [colors]);

  return (
    <Fragment>
      <View style={[homeStyles.ordersStatisticsCont]}>
        <View style={[globalStyles.card, homeStyles.orderStatisticsCont, dynamicStyles.cardBg]}>
          <View>
            <CustomText style={[homeStyles.orderStatisticsContHeading, dynamicStyles.totalOrdersText]}>
              Total Orders{' '}
            </CustomText>
            <CustomText style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.totalOrdersText]}>
              {ordersStatistics?.totalOrders || 0}
            </CustomText>
          </View>

          <ImageBackground
            resizeMode='contain'
            source={totalOrderImage}
            imageStyle={[homeStyles.orderBgImage]}
            style={[homeStyles.orderBgImage]}
          />
        </View>

        <View style={[globalStyles.card, homeStyles.orderStatisticsCont, dynamicStyles.cardBg]}>
          <View>
            <CustomText style={[homeStyles.orderStatisticsContHeading, dynamicStyles.pendingOrdersText]}>
              Pending{' '}
            </CustomText>
            <CustomText style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.pendingOrdersText]}>
              {ordersStatistics?.totalPendingOrders?.length || 0}
            </CustomText>
          </View>

          <ImageBackground
            resizeMode='contain'
            source={pendingOrderImage}
            imageStyle={[homeStyles.orderBgImage]}
            style={[homeStyles.orderBgImage]}
          />
        </View>

        <View style={[globalStyles.card, homeStyles.orderStatisticsCont, dynamicStyles.cardBg]}>
          <View>
            <CustomText style={[homeStyles.orderStatisticsContHeading, dynamicStyles.deliveredOrdersText]}>
              Delivered
            </CustomText>
            <CustomText style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.deliveredOrdersText]}>
              {ordersStatistics?.totalDeliveredOrders?.length || 0}
            </CustomText>
          </View>

          <ImageBackground
            resizeMode='contain'
            source={deliveredOrderImage}
            imageStyle={[homeStyles.orderBgImage]}
            style={[homeStyles.orderBgImage]}
          />
        </View>

        <View style={[globalStyles.card, homeStyles.orderStatisticsCont, dynamicStyles.cardBg]}>
          <View>
            <CustomText style={[homeStyles.orderStatisticsContHeading, dynamicStyles.cancelledOrdersText]}>
              Cancelled{' '}
            </CustomText>
            <CustomText style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.cancelledOrdersText]}>
              {ordersStatistics?.totalOrders || 0}
            </CustomText>
          </View>

          <ImageBackground
            resizeMode='contain'
            source={cancelledOrderImage}
            imageStyle={[homeStyles.orderBgImage]}
            style={[homeStyles.orderBgImage]}
          />
        </View>
      </View>
    </Fragment>
  );
};

const MonthlyOrders = memo(_MonthlyOrders);

export default MonthlyOrders;
