import React, { memo, useEffect, useMemo, useState } from 'react';
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

const _MonthlyOrders = () => {
  const { colors } = useThemeColors();
  const [ordersStatisticsAdmin, setOrderStatisticsAdmin] = useState<getOrdersStatisticsByIdData>({
    totalCancelledOrders: [],
    totalOrders: 0,
    totalDeliveredOrders: [],
    totalPendingOrders: [],
    totalAmount: 0,
    totalProfit: 0
  });

  useEffect(() => {
    const interval = setInterval(
      () => {
        getOrdersStatisticsForTenantFromStorage().then((response) => {
          setOrderStatisticsAdmin(response);
        });
      },
      60 * 60 * 2000
    ); // 60 seconds * 60 minutes * 2000 milliseconds = 1 hour

    return () => {
      clearInterval(interval);
    };
  }, [ordersStatisticsAdmin]);

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
    <PageWrapper.Section
      title={'Monthly Orders'}
      icon={
        <Icon
          size={24}
          source={'calendar'}
        />
      }
      style={homeStyles.monthlyOrdersCont}>
      <View style={[homeStyles.ordersStatisticsCont]}>
        <View style={[globalStyles.card, homeStyles.orderStatisticsCont, dynamicStyles.cardBg]}>
          <View>
            <CustomText style={[homeStyles.orderStatisticsContHeading, dynamicStyles.totalOrdersText]}>
              Total Orders{' '}
            </CustomText>
            <CustomText style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.totalOrdersText]}>
              {ordersStatisticsAdmin?.totalOrders}
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
              {ordersStatisticsAdmin?.totalPendingOrders.length}
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
              {ordersStatisticsAdmin?.totalDeliveredOrders.length}
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
              {ordersStatisticsAdmin?.totalOrders}
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
    </PageWrapper.Section>
  );
};

const MonthlyOrders = memo(_MonthlyOrders);

export default MonthlyOrders;
