import { Fragment, memo } from 'react';
import { View } from 'react-native';

import { Icon } from 'react-native-paper';

import useThemeColors from '../../../hooks/useThemeColors';
import { homeStyles } from './home.styles';

import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../ui/Card/Card';

const _MonthlySellStats = ({
  totalAmount,
  totalProfit,
  isLoading
}: {
  totalAmount: number;
  totalProfit: number;
  isLoading: boolean;
}) => {
  const { colors } = useThemeColors();

  return (
    <Fragment>
      <View style={homeStyles.monthlyStatsCont}>
        <Card
          masked
          isLoading={isLoading}
          title='Monthly Sales'
          linearGradientColors={[colors.monthlySalesLgBlue, colors.monthlySalesLgBlue, colors.lgBlueLight]}
          textColor={colors.textWhite}
          amount={totalAmount}
          icon={
            <Icon
              size={24}
              color={colors.monthlySalesLgBlue}
              source={'trending-up'}
            />
          }
        />

        <Card
          masked
          isLoading={isLoading}
          title='Monthly Profit'
          linearGradientColors={[
            colors.monthlyProfitLgGreen,
            colors.monthlyProfitLgGreen,
            colors.monthlyProfitLgGreenLight
          ]}
          textColor={colors.textWhite}
          amount={totalProfit}
          icon={
            <MaterialIcons
              name='currency-rupee'
              size={24}
              color={colors.monthlyProfitLgGreen}
            />
          }
        />
      </View>
    </Fragment>
  );
};

const MonthlySellStats = memo(_MonthlySellStats);

export default MonthlySellStats;
