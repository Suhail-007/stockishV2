import { FC, Fragment, useMemo } from 'react';
import { ImageBackground, View } from 'react-native';

import { globalStyles } from '../../../constants/globalStyles';
import { PRODUCT_STATUS } from '../../../enums/Product.enum';
import useThemeColors from '../../../hooks/useThemeColors';
import CustomText from '../../ui/CustomText';

import { homeStyles } from './home.styles';

const activeUserImg = require('../../../assets/images/home/activeUsers.png');
const inActiveUserImg = require('../../../assets/images/home/inActiveUsers.png');

const ProductStatistics: FC<{ data: Record<PRODUCT_STATUS, number> }> = (props) => {
  const { colors } = useThemeColors();

  const dynamicStyles = useMemo(() => {
    return {
      cardBg: {
        backgroundColor: colors.grey100
      },

      activeUsersText: {
        color: colors.greenText900
      },

      inActiveUserText: {
        color: colors.redText900
      }
    };
  }, [colors]);

  return (
    <Fragment>
      <View style={homeStyles.ordersStatisticsCont}>
        <View style={[globalStyles.card, dynamicStyles.cardBg, homeStyles.orderStatisticsCont]}>
          <View>
            <CustomText style={[homeStyles.orderStatisticsContHeading, dynamicStyles.activeUsersText]}>
              Active Products{' '}
            </CustomText>
            <CustomText style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.activeUsersText]}>
              {props?.data[PRODUCT_STATUS.active] || 0}
            </CustomText>
          </View>

          <ImageBackground
            resizeMode='contain'
            source={activeUserImg}
            imageStyle={[homeStyles.orderBgImage]}
            style={[homeStyles.orderBgImage]}
          />
        </View>

        <View style={[globalStyles.card, dynamicStyles.cardBg, homeStyles.orderStatisticsCont]}>
          <View>
            <CustomText style={[homeStyles.orderStatisticsContHeading, dynamicStyles.inActiveUserText]}>
              InActive Products
            </CustomText>
            <CustomText style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.inActiveUserText]}>
              {props?.data[PRODUCT_STATUS.inactive] || 0}
            </CustomText>
          </View>

          <ImageBackground
            resizeMode='contain'
            source={inActiveUserImg}
            imageStyle={[homeStyles.orderBgImage]}
            style={[homeStyles.orderBgImage]}
          />
        </View>
      </View>
    </Fragment>
  );
};

export default ProductStatistics;
