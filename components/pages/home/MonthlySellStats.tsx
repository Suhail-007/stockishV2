import { Fragment, memo, useMemo } from 'react';
import { View } from 'react-native';
import { ImageBackground } from 'react-native';
import { Icon } from 'react-native-paper';


import { globalStyles } from '../../../constants/globalStyles';
import useThemeColors from '../../../hooks/useThemeColors';
import CustomText from '../../ui/CustomText';

import CalendarFilter from './CalendarFilter';
import { homeStyles } from './home.styles';

const totalBalanceImage = require('../../../assets/images/home/balanceAmount.png');

const _MonthlySellStats = ({
  totalAmount,
  totalProfit,
  selectedMonth = new Date().getMonth() + 1,
  selectedYear = new Date().getFullYear(),
  onMonthChange,
  onYearChange
}: {
  totalAmount: number;
  totalProfit: number;
  selectedMonth?: number;
  selectedYear?: number;
  onMonthChange?: (month: number) => void;
  onYearChange?: (year: number) => void;
}) => {
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
    <Fragment>
      <View>
        <CalendarFilter
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={onMonthChange!}
          onYearChange={onYearChange!}
        />

        <View style={[globalStyles.card, homeStyles.totalBalanceCont, dynamicStyles.cont]}>
          <View style={homeStyles.typographyCont}>
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

        <View style={[globalStyles.card, homeStyles.totalBalanceCont, dynamicStyles.cont, { marginTop: 10 }]}>
          <View style={homeStyles.typographyCont}>
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

          <View style={{ opacity: 0.4, justifyContent: 'center' }}>
            <Icon
              size={50}
              color={colors.tertiary}
              source='calendar'
            />
          </View>
        </View>
      </View>
    </Fragment>
  );
};

const MonthlySellStats = memo(_MonthlySellStats);

export default MonthlySellStats;
