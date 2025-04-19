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

const _TotalBalance = ({ amount = 0 }: { amount: number }) => {
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
    </PageWrapper.Section>
  );
};

const TotalBalance = memo(_TotalBalance);

export default TotalBalance;
