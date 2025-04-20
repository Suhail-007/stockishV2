import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { DataTable } from 'react-native-paper';
import { Product } from '../../../features/types/product.type';
import CustomText from '../../ui/CustomText';
import { router } from 'expo-router';

export type Props = {
  products: Product[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
};

const ProductsTable = ({ products, totalItems, totalPages, currentPage }: Props) => {
  const [page, setPage] = React.useState<number>(currentPage);
  const [numberOfItemsPerPageList] = React.useState([10, 15, 20]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, products.length);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title onPress={() => console.log('Pressed')}>Product name</DataTable.Title>
        <DataTable.Title numeric>Buy price</DataTable.Title>
        <DataTable.Title numeric>Sell price</DataTable.Title>
        <DataTable.Title numeric>Quantity</DataTable.Title>
      </DataTable.Header>

      {products.length === 0 && (
        <CustomText
          variant='bodyLarge'
          style={{ textAlign: 'center', marginTop: 20, width: '70%', marginInline: 'auto' }}>
          No products added yet,{' '}
          <Pressable onPress={() => router.push('/(app)/addProduct')}>
            <CustomText
              variant='bodyLarge'
              style={{ color: 'blue' }}>
              Add Product
            </CustomText>
          </Pressable>
        </CustomText>
      )}

      {products.slice(from, to).map((item) => (
        <DataTable.Row
          onPress={() => console.log('Pressed')}
          key={item.id}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.buyPrice}</DataTable.Cell>
          <DataTable.Cell numeric>{item.sellPrice}</DataTable.Cell>
          <DataTable.Cell numeric>{item?.quantity || 0}</DataTable.Cell>
        </DataTable.Row>
      ))}

      {products.length > 0 && (
        <DataTable.Pagination
          page={page}
          style={{
            flexDirection: 'row'
          }}
          numberOfPages={totalPages}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${products.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={'No. of rows'}
        />
      )}
    </DataTable>
  );
};

export default ProductsTable;

const styles = StyleSheet.create({});
