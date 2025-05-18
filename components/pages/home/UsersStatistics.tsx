import { View } from 'react-native';

import useThemeColors from '../../../hooks/useThemeColors';

import { homeStyles } from './home.styles';
import Card from '../../ui/Card/Card';
import { AntDesign } from '@expo/vector-icons';
import PageWrapper from '@/components/ui/PageWrapper';
import { Icon } from 'react-native-paper';

const UsersStatistics = ({ users, isLoading }: { users: Record<string, number>; isLoading: boolean }) => {
  const { colors } = useThemeColors();
  return (
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
        <Icon
          size={24}
          color={colors.tertiary}
          source={'account-group-outline'}
        />
      }
      title={'Users Overview'}>
      <View style={[homeStyles.ordersStatisticsCont]}>
        <Card
          title='Active Users'
          icon={
            <AntDesign
              name='user'
              size={24}
              color={colors.green}
            />
          }
          isLoading={isLoading}
          value={users?.['1'] || '0'}
          textColor={colors.textWhite}
          linearGradientColors={[colors.green, colors.green300]}
        />

        <Card
          title='Inactive Users'
          icon={
            <AntDesign
              name='user'
              size={24}
              color={colors.red}
            />
          }
          isLoading={isLoading}
          value={users?.['0'] || '0'}
          textColor={colors.textWhite}
          linearGradientColors={[colors.red, colors.red, colors.red300]}
        />
      </View>
    </PageWrapper.Section>
  );
};

export default UsersStatistics;
