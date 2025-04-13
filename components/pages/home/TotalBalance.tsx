import { View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { memo, useMemo } from 'react';

import PageWrapper from '../../ui/PageWrapper';
import { homeStyles } from './home.styles';
import useThemeColors from '../../../hooks/useThemeColors';
import { globalStyles } from '../../../constants/globalStyles';
import { ImageBackground } from 'react-native';

const totalBalanceImage = require('../../../assets/images/home/balanceAmount.png');

const _TotalBalance = () => {
  const { colors } = useThemeColors();

  const dynamicStyles = useMemo(() => {
    return {
      cont: {
        backgroundColor: colors.tertiary100
      },
      textColor: {
        color: colors.tertiary
      }
    };
  }, [colors.green100]);

  return (
    <PageWrapper.Section
      title='Total Balance'
      icon={
        <Icon
          size={24}
          source={'account-cash'}
        />
      }>
      <View style={[globalStyles.card, homeStyles.totalBalanceCont, dynamicStyles.cont]}>
        <View style={{ width: '83%' }}>
          <View>
            <Text style={[homeStyles.orderStatisticsContHeading, dynamicStyles.textColor]}>Balance Amount</Text>
          </View>

          <Text style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.textColor]}>₹ 0</Text>
        </View>
        <ImageBackground
          resizeMode='contain'
          imageStyle={homeStyles.totalBalanceBgImage}
          source={totalBalanceImage}></ImageBackground>
      </View>
    </PageWrapper.Section>
  );
};

const TotalBalance = memo(_TotalBalance);

export default TotalBalance;
