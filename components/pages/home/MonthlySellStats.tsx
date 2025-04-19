import { memo, useMemo } from 'react';
import { View } from 'react-native';
import { ImageBackground } from 'react-native';
import { Icon } from 'react-native-paper';

import { globalStyles } from '../../../constants/globalStyles';
import useThemeColors from '../../../hooks/useThemeColors';
import CustomText from '../../ui/CustomText';
import PageWrapper from '../../ui/PageWrapper';

import { homeStyles } from './home.styles';

const totalBalanceImage = require('../../../assets/images/home/balanceAmount.png');

const _MonthlySellStats = ({ totalAmount, totalProfit }: { totalAmount: number; totalProfit: number }) => {
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
  }, [colors.tertiary100, colors.tertiary]);

  return (
    <PageWrapper.Section
      title='Monthly Sell/Profit'
      icon={
        <Icon
          size={24}
          source={'account-cash'}
        />
      }>
      <View style={[globalStyles.card, homeStyles.totalBalanceCont, dynamicStyles.cont]}>
        <View style={{ width: '83%' }}>
          <View>
            <CustomText
              adjustsFontSizeToFit
              variant='bodyMedium'
              fontVariant='quicksandSemiBold'
              weight={'600'}
              style={[homeStyles.orderStatisticsContHeading, dynamicStyles.textColor]}>
              Total Monthly Sell
            </CustomText>
          </View>

          <CustomText
            fontVariant='quicksandBold'
            weight={'700'}
            style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.textColor]}>
            ₹ {totalAmount}
          </CustomText>
        </View>
        <ImageBackground
          resizeMode='contain'
          imageStyle={homeStyles.totalBalanceBgImage}
          source={totalBalanceImage}></ImageBackground>
      </View>
      <View style={[globalStyles.card, homeStyles.totalBalanceCont, dynamicStyles.cont, { marginTop: 20 }]}>
        <View style={{ width: '83%' }}>
          <View>
            <CustomText
              adjustsFontSizeToFit
              variant='bodyMedium'
              fontVariant='quicksandSemiBold'
              weight={'600'}
              style={[homeStyles.orderStatisticsContHeading, dynamicStyles.textColor]}>
              Total Monthly Profit
            </CustomText>
          </View>

          <CustomText
            fontVariant='quicksandBold'
            weight={'700'}
            style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.textColor]}>
            ₹ {totalProfit}
          </CustomText>
        </View>

        <View style={{ opacity: 0.4 }}>
          <Icon
            size={50}
            color={colors.tertiary}
            source='calendar'
          />
        </View>
      </View>
    </PageWrapper.Section>
  );
};

const MonthlySellStats = memo(_MonthlySellStats);

export default MonthlySellStats;
