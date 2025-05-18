import { memo } from 'react';

import useThemeColors from '../../../hooks/useThemeColors';

import Card from '../../ui/Card/Card';
import { MaterialIcons } from '@expo/vector-icons';

const _TotalBalance = ({ amount = 0, isLoading }: { amount: number; isLoading: boolean }) => {
  const { colors } = useThemeColors();
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return (
    <Card
      masked
      isLoading={isLoading}
      icon={
        <MaterialIcons
          name='currency-rupee'
          size={24}
          color={colors.textWhite}
        />
      }
      textColor={colors.textWhite}
      linearGradientColors={[colors.homeHeaderColor1, colors.homeHeaderColor1, colors.homeHeaderColor2]}
      amount={amount}
      title={`${month} ${year}`}
      subText='Balance Amount'
    />
  );
};

const TotalBalance = memo(_TotalBalance);

export default TotalBalance;
