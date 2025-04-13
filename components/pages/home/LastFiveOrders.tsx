import React from 'react';
import { DataTable } from 'react-native-paper';
import PageWrapper from '../../ui/PageWrapper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useThemeColors from '../../../hooks/useThemeColors';

const LastFiveOrders = () => {
  const { colors } = useThemeColors();
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 8]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);

  const [items] = React.useState([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7
    },
    {
      key: 5,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7
    },
    {
      key: 6,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7
    },
    {
      key: 7,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7
    },
    {
      key: 8,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7
    }
  ]);

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
      <DataTable>
        <DataTable.Header>
          <DataTable.Title
            onPress={() => console.log('Pressed')}
            sortDirection='ascending'>
            Dessert
          </DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
          <DataTable.Title numeric>Fat</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
            <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
          </DataTable.Row>
        ))}

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
      </DataTable>
    </PageWrapper.Section>
  );
};

export default LastFiveOrders;
