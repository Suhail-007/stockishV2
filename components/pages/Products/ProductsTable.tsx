import { Fragment, memo, useEffect, useRef, useState } from 'react';
import { Pressable } from 'react-native';
import { DataTable } from 'react-native-paper';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

import { Product } from '../../../features/types/product.type';
import CustomText from '../../ui/CustomText';

import ProductBottomSheet from './ProductBottomSheet';
import ProductDetailsModal from './ProductDetailsModal';
import productsTableStyles from './productsTable.styles';
import { ProductsTableProps } from './productsTable.type';

const _ProductsTable = ({ products, totalItems, totalPages, currentPage }: ProductsTableProps) => {
  const [page, setPage] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [numberOfItemsPerPageList] = useState([10, 15, 20]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, totalItems);

  const selectProductNShowBottomSheet = (product: Product | null) => {
    setProductDetails(product);
    bottomSheetRef.current?.expand();
  };

  const toggleShowProductDetailsModal = (modalState: boolean) => {
    setShowModal(modalState);
  };

  useEffect(() => {
    if (productDetails) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [productDetails]);

  return (
    <Fragment>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={productsTableStyles.idColumn}>ID</DataTable.Title>
          <DataTable.Title>Product name</DataTable.Title>
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
            onPress={selectProductNShowBottomSheet.bind(null, item)}
            key={item.id}>
            <DataTable.Cell style={productsTableStyles.idColumn}>{item.id}</DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.buyPrice}</DataTable.Cell>
            <DataTable.Cell numeric>{item.sellPrice}</DataTable.Cell>
            <DataTable.Cell numeric>{item?.quantity || 0}</DataTable.Cell>
          </DataTable.Row>
        ))}

        {products.length > 0 && (
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(totalItems / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${totalItems}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            selectPageDropdownLabel={'Rows per page'}
          />
        )}
      </DataTable>

      <BottomSheet
        ref={bottomSheetRef}
        onClose={() => setProductDetails(null)}
        enableHandlePanningGesture={true}
        index={-1}
        snapPoints={['50%']}
        enablePanDownToClose={true}
        containerHeight={400}>
        <BottomSheetView style={{ backgroundColor: 'white' }}>
          <ProductBottomSheet openDetailsModal={toggleShowProductDetailsModal} />
        </BottomSheetView>
      </BottomSheet>

      {/* Rendered in the root */}
      <ProductDetailsModal
        product={productDetails}
        showModal={showModal}
        toggleShowProductDetailsModal={toggleShowProductDetailsModal}
      />
    </Fragment>
  );
};

const ProductsTable = memo(_ProductsTable);
export default ProductsTable;
