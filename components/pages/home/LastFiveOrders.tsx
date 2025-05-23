import React from 'react';
import { DataTable } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Order } from '../../../apis/types/order.type';
import useThemeColors from '../../../hooks/useThemeColors';
import CustomText from '../../ui/CustomText';
import PageWrapper from '../../ui/PageWrapper';

import { homeStyles } from './home.styles';

const LastFiveOrders = ({ items }: { items: Order[] }) => {
  const [page, setPage] = React.useState<number>(0);
  const { colors } = useThemeColors();
  const [numberOfItemsPerPageList] = React.useState([2, 3, 8]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  return (
    <PageWrapper.Section
      title={'Last Five Orders'}
      icon={
        <MaterialCommunityIcons
          name='history'
          size={24}
        />
      }>
      <LinearGradient
        colors={[colors.background, colors.grey100]}
        style={homeStyles.heroGradient}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title onPress={() => console.log('Pressed')}>Date</DataTable.Title>
            <DataTable.Title numeric>From</DataTable.Title>
            <DataTable.Title numeric>To</DataTable.Title>
            <DataTable.Title numeric>Total</DataTable.Title>
          </DataTable.Header>

          {items.length === 0 && (
            <CustomText
              variant='bodyLarge'
              style={{ textAlign: 'center', marginTop: 20, width: '70%', marginInline: 'auto' }}>
              No last five orders found for this
            </CustomText>
          )}

          {items.slice(from, to).map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.date}</DataTable.Cell>
              <DataTable.Cell numeric>{item.from}</DataTable.Cell>
              <DataTable.Cell numeric>{item.to}</DataTable.Cell>
              <DataTable.Cell numeric>{item?.total || 0}</DataTable.Cell>
            </DataTable.Row>
          ))}

          {items.length > 0 && (
            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${items.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              selectPageDropdownLabel={'Rows per page'}
            />
          )}
        </DataTable>
      </LinearGradient>
    </PageWrapper.Section>
  );
};

export default LastFiveOrders;
