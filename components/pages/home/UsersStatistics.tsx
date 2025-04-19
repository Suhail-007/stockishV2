import { useMemo } from 'react';
import { ImageBackground, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

import { globalStyles } from '../../../constants/globalStyles';
import useThemeColors from '../../../hooks/useThemeColors';
import PageWrapper from '../../ui/PageWrapper';

import { homeStyles } from './home.styles';

const activeUserImg = require('../../../assets/images/home/activeUsers.png');
const inActiveUserImg = require('../../../assets/images/home/inActiveUsers.png');

const UsersStatistics = () => {
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
    <PageWrapper.Section
      icon={
        <Icon
          size={24}
          source={'account-group'}
        />
      }
      title={'Users Statistics'}>
      <View style={homeStyles.ordersStatisticsCont}>
        <View style={[globalStyles.card, dynamicStyles.cardBg, homeStyles.orderStatisticsCont]}>
          <View>
            <Text style={[homeStyles.orderStatisticsContHeading, dynamicStyles.activeUsersText]}>Active Users </Text>
            <Text style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.activeUsersText]}>{0}</Text>
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
            <Text style={[homeStyles.orderStatisticsContHeading, dynamicStyles.inActiveUserText]}>InActive Users</Text>
            <Text style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.inActiveUserText]}>{0}</Text>
          </View>

          <ImageBackground
            resizeMode='contain'
            source={inActiveUserImg}
            imageStyle={[homeStyles.orderBgImage]}
            style={[homeStyles.orderBgImage]}
          />
        </View>
      </View>
    </PageWrapper.Section>
  );
};

export default UsersStatistics;
