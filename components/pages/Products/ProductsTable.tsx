import { Fragment, useEffect, useRef, useState } from 'react';
import { Pressable } from 'react-native';
import { DataTable } from 'react-native-paper';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

import { deleteProductsById } from '../../../apis/product.api';
import { GetAllProductsPayload } from '../../../apis/types/product.type';
import { MUTATION_KEYS } from '../../../constants/queries';
import { STATUS_CODES } from '../../../constants/statusCodes';
import { addProducts } from '../../../features/product';
import { Product } from '../../../features/types/product.type';
import useThemeColors from '../../../hooks/useThemeColors';
import { useAppDispatch } from '../../../store/store';
import ConditionalRender from '../../ConditionalRender';
import ErrorMessage from '../../ErrorMessage';
import ConfirmationModal from '../../Modal/ConfirmationModal';
import Pagination from '../../Pagination/Pagination';
import CustomText from '../../ui/CustomText';

import ProductBottomSheet from './ProductBottomSheet';
import ProductDetailsModal from './ProductDetailsModal';
import ProductsSkeleton from './Products.Skeleton';
import productsTableStyles from './productsTable.styles';
import { ProductsTableProps } from './productsTable.type';
import ProductTableColumns from './ProductTableColumns';

const ProductsTable = ({
  isLoading,
  products,
  totalItems,
  totalPages,
  currentPage,
  onPageChange,
  filters
}: ProductsTableProps) => {
  const dispatch = useAppDispatch();
  const [numberOfItemsPerPageList] = useState([20, 10, 15]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { colors } = useThemeColors();

  // Calculate from/to based on currentPage
  const from = (currentPage - 1) * itemsPerPage;
  const to = Math.min(currentPage * itemsPerPage, totalItems);

  const {
    mutateAsync: deleteProductMutation,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError
  } = useMutation({
    mutationKey: [MUTATION_KEYS.PRODUCTS_DELETE_BY_ID],
    mutationFn: deleteProductsById
  });

  useEffect(() => {
    if (productDetails) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [productDetails]);

  const selectProductNShowBottomSheet = (product: Product | null) => {
    setProductDetails(product);
    bottomSheetRef.current?.expand();
  };

  const toggleShowProductDetailsModal = (modalState: boolean) => {
    setShowModal(modalState);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    const modifiedProducts = products.filter((item) => item.id !== productDetails?.id);

    // Optimistic update
    dispatch(addProducts(modifiedProducts));

    setShowDeleteConfirmation(false);
    bottomSheetRef?.current?.close();

    try {
      const { data } = await deleteProductMutation([productDetails?.id + '']);

      if (data.status === STATUS_CODES.success) {
        setProductDetails(null);
        return;
      }
    } catch (error) {
      console.log('🚀 ~ handleDeleteConfirm ~ error:', error);
      // Revert optimistic update on error
      dispatch(addProducts(products));
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
    setProductDetails(null);
  };

  const editProduct = () => {
    router.push({
      pathname: '/(app)/productForm',
      params: {
        ...(productDetails as Product),
        isEdit: 'true'
      }
    });
  };

  // Update page change handler to use 1-based indexing for API
  const onPageChangeHandler = (page: number) => {
    const filters: Partial<GetAllProductsPayload> = {
      // Add 1 since DataTable uses 0-based indexing but API uses 1-based
      page: page + 1
    };
    onPageChange(filters);
  };

  const onItemsPerPageChangeHandler = (itemsPerPage: number) => {
    onItemsPerPageChange(itemsPerPage);

    const filters: Partial<GetAllProductsPayload> = {
      pageSize: itemsPerPage
    };
    onPageChange(filters);
  };

  return (
    <Fragment>
      {isDeleteError && deleteError && <ErrorMessage error={deleteError} />}

      <DataTable>
        <ProductTableColumns />

        {products.length === 0 && filters.searchKey && !isLoading && (
          <CustomText
            variant='bodyLarge'
            style={{ textAlign: 'center', marginTop: 20, width: '70%', marginInline: 'auto' }}>
            No products found with this search query.
          </CustomText>
        )}

        {products.length === 0 && !filters.searchKey && !isLoading && (
          <CustomText
            variant='bodyLarge'
            style={{ textAlign: 'center', marginTop: 20, width: '70%', marginInline: 'auto' }}>
            No products added yet,{' '}
            <Pressable onPress={() => router.push('/(app)/productForm')}>
              <CustomText
                variant='bodyLarge'
                style={{ color: 'blue' }}>
                Add Product
              </CustomText>
            </Pressable>
          </CustomText>
        )}

        <ConditionalRender
          condition={isLoading}
          isTrueComponent={<ProductsSkeleton isLoading={isLoading} />}
          isFalseComponent={
            <Fragment>
              {products.map((item) => (
                <DataTable.Row
                  onPress={selectProductNShowBottomSheet.bind(null, item)}
                  key={item.id}>
                  <DataTable.Cell
                    numeric
                    style={productsTableStyles.idColumn}>
                    {item.id}
                  </DataTable.Cell>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{item?.quantity || 0}</DataTable.Cell>
                  <DataTable.Cell numeric>&#x20B9; {item.sellPrice}</DataTable.Cell>
                  <DataTable.Cell numeric>&#x20B9; {item.buyPrice}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </Fragment>
          }
        />

        {products.length > 0 && !isLoading && (
          <Pagination
            // Convert 1-based to 0-based for DataTable
            page={currentPage - 1}
            numberOfPages={totalPages}
            onPageChange={onPageChangeHandler}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChangeHandler}
            fromItem={from}
            toItem={to}
            totalItems={totalItems}
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
          <ProductBottomSheet
            productName={productDetails?.name || ''}
            editProductDetails={editProduct}
            deleteProduct={handleDeleteClick}
            openDetailsModal={toggleShowProductDetailsModal}
          />
        </BottomSheetView>
      </BottomSheet>

      <ConfirmationModal
        visible={showDeleteConfirmation}
        title='Delete Product'
        message={`Are you sure you want to delete ${productDetails?.name ? productDetails.name : ''}? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={isDeletePending}
        confirmText='Delete'
        confirmButtonColor={colors.errorText}
      />

      {/* Rendered in the root */}
      <ProductDetailsModal
        product={productDetails}
        showModal={showModal}
        toggleShowProductDetailsModal={toggleShowProductDetailsModal}
      />
    </Fragment>
  );
};

// const ProductsTable = memo(_ProductsTable);
export default ProductsTable;
