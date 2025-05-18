import { FC, Fragment, useMemo } from 'react';
import { ImageBackground, View } from 'react-native';

import { globalStyles } from '../../../constants/globalStyles';
import { PRODUCT_STATUS } from '../../../enums/Product.enum';
import useThemeColors from '../../../hooks/useThemeColors';
import CustomText from '../../ui/CustomText';

import { homeStyles } from './home.styles';
import PageWrapper from '../../ui/PageWrapper';
import { Icon } from 'react-native-paper';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Card from '../../ui/Card/Card';

const activeUserImg = require('../../../assets/images/home/activeUsers.png');
const inActiveUserImg = require('../../../assets/images/home/inActiveUsers.png');

const ProductStatistics: FC<{ data: Record<PRODUCT_STATUS, number>; isLoading: boolean }> = (props) => {
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
      <PageWrapper.Section
        titleContStyle={{
          marginTop: 10,
          marginBottom: 0
        }}
        titleProps={{
          fontVariant: 'quicksandBold',
          weight: '700'
        }}
        icon={
          <MaterialIcons
            size={24}
            color={colors.tertiary}
            name='inventory'
          />
        }
        title={'Products Statistics'}>
        <View style={homeStyles.ordersStatisticsCont}>
          <Card
            title='Active Products'
            icon={
              <MaterialIcons
                size={24}
                color={colors.green}
                name='inventory'
              />
            }
            isLoading={props.isLoading}
            value={props.data?.['1'] || '0'}
            textColor={colors.textWhite}
            linearGradientColors={[colors.green, colors.green300]}
          />

          <Card
            title='Inactive Products'
            icon={
              <MaterialIcons
                size={24}
                color={colors.red}
                name='inventory'
              />
            }
            isLoading={props.isLoading}
            value={props.data?.['0'] || '0'}
            textColor={colors.textWhite}
            linearGradientColors={[colors.red, colors.red, colors.red300]}
          />
        </View>
      </PageWrapper.Section>
    </Fragment>
  );
};

export default ProductStatistics;
