import { Fragment, useMemo } from 'react';
import { ImageBackground, View } from 'react-native';

import { globalStyles } from '../../../constants/globalStyles';
import useThemeColors from '../../../hooks/useThemeColors';
import CustomText from '../../ui/CustomText';

import { homeStyles } from './home.styles';

const activeUserImg = require('../../../assets/images/home/activeUsers.png');
const inActiveUserImg = require('../../../assets/images/home/inActiveUsers.png');

const UsersStatistics = ({ users }: { users: Record<string, number> }) => {
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
              Active Users{' '}
            </CustomText>
            <CustomText style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.activeUsersText]}>
              {users?.['1'] || 0}
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
              InActive Users
            </CustomText>
            <CustomText style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.inActiveUserText]}>
              {users?.['0'] || 0}
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

export default UsersStatistics;
