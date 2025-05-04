import { Fragment, memo, useMemo } from 'react';
import { View } from 'react-native';
import { ImageBackground } from 'react-native';

import { globalStyles } from '../../../constants/globalStyles';
import useThemeColors from '../../../hooks/useThemeColors';
import CustomText from '../../ui/CustomText';

import CalendarFilter from './CalendarFilter';
import { homeStyles } from './home.styles';

const totalBalanceImage = require('../../../assets/images/home/balanceAmount.png');

const _TotalBalance = ({
  amount = 0,
  selectedMonth = new Date().getMonth() + 1,
  selectedYear = new Date().getFullYear(),
  onMonthChange,
  onYearChange
}: {
  amount: number;
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
              Balance Amount
            </CustomText>
          </View>

          <CustomText
            fontVariant='quicksandBold'
            weight={'700'}
            style={[homeStyles.orderStatisticsContSubHeading, dynamicStyles.textColor]}>
            ₹ {amount}
          </CustomText>
        </View>
        <ImageBackground
          resizeMode='contain'
          imageStyle={homeStyles.totalBalanceBgImage}
          source={totalBalanceImage}></ImageBackground>
      </View>
    </Fragment>
  );
};

const TotalBalance = memo(_TotalBalance);

export default TotalBalance;
