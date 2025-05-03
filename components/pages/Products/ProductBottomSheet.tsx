import { memo } from 'react';
import { View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import useThemeColors from '../../../hooks/useThemeColors';
import { productBottomSheetMenu } from '../../../utils/bottomSheetsMenu';
import Button from '../../ui/Button';
import CustomText from '../../ui/CustomText';

import productsTableStyles from './productsTable.styles';

/**
 * ProductBottomSheet component renders a list of action buttons for a product.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.openDetailsModal - A function to toggle the visibility of the details modal.
 *
 * The component maps over the `productBottomSheetMenu` array to create a button for each menu item.
 * Each button displays an icon and title, and executes an action when pressed.
 * If the "View Details" button is pressed, it triggers the `openDetailsModal` function to display the product details.
 * The "Delete" button has a distinct red color styling.
 */
const _ProductBottomSheet = ({
  openDetailsModal,
  deleteProduct,
  editProductDetails,
  productName
}: {
  openDetailsModal: (modalState: boolean) => void;
  deleteProduct: () => void;
  editProductDetails: () => void;
  productName: string;
}) => {
  const { colors } = useThemeColors();

  const assignOnPressHandler = (title: string) => {
    if (title === 'View Details') {
      return openDetailsModal(true);
    }

    if (title === 'Edit') {
      return editProductDetails();
    }

    if (title === 'Delete') {
      return deleteProduct();
    }
  };

  return (
    <View>
      <View
        style={{
          padding: 8,
          marginBottom: 8,
          backgroundColor: colors.secondaryBg,
          borderRadius: 8
        }}>
        <CustomText
          variant='labelSmall'
          weight={'600'}
          fontVariant={'quicksandSemiBold'}
          color={colors.textSecondary}>
          Selected Product: {productName}
        </CustomText>
      </View>

      {productBottomSheetMenu?.map((item) => (
        <Button.Transparent
          style={productsTableStyles.menuItem}
          textColor={item.title === 'Delete' ? colors.redText900 : colors.primary}
          key={item.id}
          onPress={assignOnPressHandler.bind(null, item.title)}>
          <View style={productsTableStyles.menuItemCont}>
            {item.title === 'Delete' ? (
              <MaterialCommunityIcons
                name='delete'
                size={24}
                color={colors.redText900}
              />
            ) : (
              item.icon
            )}
            <CustomText
              variant='bodyMedium'
              style={{ marginLeft: 8, color: item.title === 'Delete' ? colors.redText900 : colors.text }}>
              {item.title}
            </CustomText>
          </View>
        </Button.Transparent>
      ))}
    </View>
  );
};

const ProductBottomSheet = memo(_ProductBottomSheet);

export default ProductBottomSheet;
