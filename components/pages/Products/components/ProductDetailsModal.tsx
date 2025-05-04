import { Fragment, memo, useMemo } from 'react';
import { View } from 'react-native';

import { format } from 'date-fns';

import useThemeColors from '../../../../hooks/useThemeColors';
import CustomModal from '../../../Modal/Modal';
import ModalProvider from '../../../Modal/ModalProvider';
import CustomText from '../../../ui/CustomText';
import { ProductDetailsModalProps } from '../productDetailsModal.type';

import styles from './productDetailsModal.styles';

const _ProductDetailsModal = ({ product, toggleShowProductDetailsModal, showModal }: ProductDetailsModalProps) => {
  const { colors } = useThemeColors();

  const dynamicStyles = useMemo(() => {
    return {
      container: {
        backgroundColor: colors.secondaryBg
      }
    };
  }, [colors.secondaryBg]);

  return (
    <ModalProvider>
      <CustomModal
        visible={showModal}
        onDismiss={toggleShowProductDetailsModal.bind(null, false)}>
        <CustomModal.Title title='Product Details' />
        {!product && <CustomText>No Product Selected</CustomText>}
        {product && (
          <Fragment>
            <CustomModal.Content>
              {product && (
                <View style={styles.detailsContainer}>
                  <View style={[styles.detailRow, dynamicStyles.container]}>
                    <CustomText
                      variant='titleMedium'
                      weight={'500'}
                      fontVariant='quicksandMedium'
                      style={styles.label}>
                      Product ID
                    </CustomText>
                    <CustomText
                      variant='titleMedium'
                      weight={'600'}
                      fontVariant='quicksandSemiBold'
                      style={styles.value}>
                      {product.id}
                    </CustomText>
                  </View>

                  <View style={[styles.detailRow, dynamicStyles.container]}>
                    <CustomText
                      variant='titleMedium'
                      weight={'500'}
                      fontVariant='quicksandMedium'
                      style={styles.label}>
                      Name
                    </CustomText>
                    <CustomText
                      variant='titleMedium'
                      weight={'600'}
                      fontVariant='quicksandSemiBold'
                      style={styles.value}>
                      {product.name}
                    </CustomText>
                  </View>

                  <View style={[styles.detailRow, dynamicStyles.container]}>
                    <CustomText
                      variant='titleMedium'
                      weight={'500'}
                      fontVariant='quicksandMedium'
                      style={styles.label}>
                      &#x20B9; Buy Price
                    </CustomText>
                    <CustomText
                      variant='titleMedium'
                      weight={'600'}
                      fontVariant='quicksandSemiBold'
                      style={styles.value}>
                      {/* Rupee Sign */}
                      &#x20B9; ${product.buyPrice.toFixed(2).replace('$', '')}
                    </CustomText>
                  </View>

                  <View style={[styles.detailRow, dynamicStyles.container]}>
                    <CustomText
                      variant='titleMedium'
                      weight={'500'}
                      fontVariant='quicksandMedium'
                      style={styles.label}>
                      &#x20B9; Sell Price
                    </CustomText>
                    <CustomText
                      variant='titleMedium'
                      weight={'600'}
                      fontVariant='quicksandSemiBold'
                      style={styles.value}>
                      &#x20B9; ${product.sellPrice.toFixed(2).replace('$', '')}
                    </CustomText>
                  </View>

                  <View style={[styles.detailRow, dynamicStyles.container]}>
                    <CustomText
                      variant='titleMedium'
                      weight={'500'}
                      fontVariant='quicksandMedium'
                      style={styles.label}>
                      Quantity
                    </CustomText>
                    <CustomText
                      variant='titleMedium'
                      weight={'600'}
                      fontVariant='quicksandSemiBold'
                      style={styles.value}>
                      {product.quantity || 0}
                    </CustomText>
                  </View>
                  <View style={[styles.detailRow, dynamicStyles.container]}>
                    <CustomText
                      variant='titleMedium'
                      weight={'500'}
                      fontVariant='quicksandMedium'
                      style={styles.label}>
                      Created At
                    </CustomText>
                    <CustomText
                      variant='titleMedium'
                      weight={'600'}
                      fontVariant='quicksandSemiBold'
                      style={styles.value}>
                      {format(new Date(product?.createdAt), 'iii LLL, dd-MM-yyyy')}
                    </CustomText>
                  </View>
                </View>
              )}
            </CustomModal.Content>

            <CustomModal.Footer>
              <CustomModal.FooterActions
                actions={[
                  {
                    label: 'Close',
                    onPress: toggleShowProductDetailsModal.bind(null, false)
                  }
                ]}
              />
            </CustomModal.Footer>
          </Fragment>
        )}
      </CustomModal>
    </ModalProvider>
  );
};

const ProductDetailsModal = memo(_ProductDetailsModal);

export default ProductDetailsModal;
