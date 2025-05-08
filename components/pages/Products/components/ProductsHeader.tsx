import { memo, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Icon, Searchbar } from 'react-native-paper';

import useThemeColors from '../../../../hooks/useThemeColors';
import CustomText from '../../../ui/CustomText';
import { ProductHeaderProps } from '../productsTable.type';

import productHeaderStyles from './productsHeader.styles';

let timeout: any;

const _ProductsHeader = ({
  onChangeSearch,
  onPressFilter,
  clearNewlyAddedProduct,
  isNewlyAddedProduct,
  hideHelperText,
  clearFilters,
  hasAppliedFilters
}: ProductHeaderProps) => {
  //For UI update only
  const [searchQuery, setSearchQuery] = useState('');

  const { colors } = useThemeColors();

  const dynamicStyles = useMemo(() => {
    return {
      bg: {
        backgroundColor: colors.grey100
      },
      primaryColor: {
        color: colors.primary
      }
    };
  }, [colors.grey100, colors.primary]);

  const onChangeSearchHandler = (query: string) => {
    setSearchQuery(query);

    timeout && clearTimeout(timeout);

    //delay the API calls
    timeout = setTimeout(() => {
      onChangeSearch({ searchKey: query });
    }, 500);
  };

  const clearFilterHandler = () => {
    setSearchQuery('');
    clearFilters();
  };

  return (
    <View style={productHeaderStyles.cont}>
      <View style={{ flex: 1 }}>
        <Searchbar
          inputMode='search'
          inputStyle={productHeaderStyles.input}
          style={[productHeaderStyles.inputCont, dynamicStyles.bg]}
          onChangeText={onChangeSearchHandler}
          placeholder='For a quick lookup, search here...'
          placeholderTextColor={colors.text}
          value={searchQuery ? searchQuery : ''}
        />

        {!hideHelperText && (
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <CustomText variant='labelSmall'>
              Clear {isNewlyAddedProduct ? 'newly added' : 'updated'} product
            </CustomText>
            <Pressable onPress={clearNewlyAddedProduct}>
              <CustomText
                variant='labelSmall'
                style={dynamicStyles.primaryColor}>
                Clear?
              </CustomText>
            </Pressable>
          </View>
        )}

        {hasAppliedFilters && hideHelperText && (
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <CustomText variant='labelSmall'>Applied filters</CustomText>
            <Pressable onPress={clearFilterHandler}>
              <CustomText
                variant='labelSmall'
                style={dynamicStyles.primaryColor}>
                Clear filters?
              </CustomText>
            </Pressable>
          </View>
        )}
      </View>

      <View style={productHeaderStyles.filterCont}>
        <Pressable
          onPress={onPressFilter}
          android_ripple={{ color: colors.grey200 }}
          style={[productHeaderStyles.filterBtn, dynamicStyles.bg]}>
          <Icon
            source='filter'
            size={24}
          />
        </Pressable>
      </View>
    </View>
  );
};

const ProductsHeader = memo(_ProductsHeader);

export default ProductsHeader;
