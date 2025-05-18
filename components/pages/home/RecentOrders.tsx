import React from 'react';
import { StyleProp, View } from 'react-native';
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useThemeColors from '../../../hooks/useThemeColors';
import CustomText from '../../ui/CustomText';
import PageWrapper from '../../ui/PageWrapper';

import { Order } from '../../../apis/types/order.type';
import { homeStyles } from './home.styles';
import { RECENT_ORDERS_COLUMNS } from '../../../utils/tableColumns';
import { getStatusStyle } from '../../../libs';
import { format } from 'date-fns';
import { TextStyle } from 'react-native';

const RecentOrders = ({ items, isLoading }: { items: Order[]; isLoading: boolean }) => {
  const { colors } = useThemeColors();

  return (
    <PageWrapper.Section
      style={{
        borderRadius: 16,
        borderColor: colors.grey50,
        borderWidth: 1
      }}
      heading={
        <RecentOrdersHeading
          subHeadColor={colors.tertiary100}
          contBg={colors.blue100}
          iconColor={colors.tertiary}
        />
      }>
      <DataTable style={homeStyles.recentOrdersTable}>
        <Columns />

        {isLoading && <LoadingData color={colors.tertiary100} />}

        {!isLoading && items.length === 0 && <NoRecentOrdersFound />}

        {!isLoading &&
          items.length !== 0 &&
          items.map((order, index) => {
            const statusStyle = getStatusStyle(order.orderStatus);
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell>{order.id}</DataTable.Cell>
                <DataTable.Cell>
                  <View>
                    <CustomText>{order.from}</CustomText>
                    <CustomText
                      variant='bodySmall'
                      style={{ color: colors.textSecondary }}>
                      {format(order.createdAt, 'dd MMM yy')}
                    </CustomText>
                  </View>
                </DataTable.Cell>

                <DataTable.Cell>{order.to}</DataTable.Cell>
                <DataTable.Cell>₹ {order.total}</DataTable.Cell>
                <DataTable.Cell>
                  <View style={[homeStyles.recentOrdersStatusCol, { backgroundColor: statusStyle.bg }]}>
                    <MaterialCommunityIcons
                      name={statusStyle.icon}
                      size={12}
                      color='white'
                      style={{ marginRight: 5 }}
                    />
                    <CustomText
                      style={{ color: 'white', fontSize: 11 }}
                      fontVariant='quicksandBold'>
                      {statusStyle.text}
                    </CustomText>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
      </DataTable>
    </PageWrapper.Section>
  );
};

export default RecentOrders;

const RecentOrdersHeading = ({
  iconColor,
  contBg,
  subHeadColor
}: {
  iconColor: string;
  contBg: string;
  subHeadColor: string;
}) => {
  return (
    <View style={[homeStyles.recentOrdersHeadingRootCont, { backgroundColor: contBg }]}>
      <View style={homeStyles.recentOrdersHeadingCont}>
        <MaterialCommunityIcons
          name='calendar'
          size={24}
          color={iconColor}
        />
        <CustomText
          weight={'700'}
          variant='titleLarge'
          fontVariant='quicksandBold'>
          Recent Orders
        </CustomText>
      </View>

      <View
        style={{
          backgroundColor: subHeadColor,
          paddingHorizontal: 15,
          paddingBlock: 5,
          borderRadius: 30
        }}>
        <CustomText
          fontVariant='quicksandSemiBold'
          weight={'600'}
          variant='labelMedium'>
          Last 5
        </CustomText>
      </View>
    </View>
  );
};

const NoRecentOrdersFound = () => {
  const { colors } = useThemeColors();
  return (
    <View style={homeStyles.noRecentOrdersFoundCont}>
      <MaterialCommunityIcons
        name='cube-outline'
        size={48}
        color='#D1D5DB'
        style={{ marginBottom: 10 }}
      />
      <CustomText
        variant='titleMedium'
        fontVariant='quicksandBold'
        style={colors.textTertiary as StyleProp<TextStyle>}>
        No recent orders found
      </CustomText>
      <CustomText
        variant='bodySmall'
        style={{ color: '#9CA3AF' }}>
        New orders will appear here
      </CustomText>
    </View>
  );
};

const LoadingData = ({ color }: { color: string }) => {
  return (
    <View style={homeStyles.noRecentOrdersFoundCont}>
      <ActivityIndicator
        color={color}
        size='small'
      />

      <CustomText
        variant='bodySmall'
        style={{ color: '#9CA3AF' }}>
        Loading Data...
      </CustomText>
    </View>
  );
};

const Columns = () => {
  return (
    <DataTable.Header>
      {RECENT_ORDERS_COLUMNS.map((column) => {
        return (
          <DataTable.Title
            numeric={column.numeric}
            key={column.id}>
            {column.label}
          </DataTable.Title>
        );
      })}
    </DataTable.Header>
  );
};
