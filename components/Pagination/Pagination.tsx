import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { IconButton, Menu, Text } from 'react-native-paper';

import useThemeColors from '../../hooks/useThemeColors';
import Button from '../ui/Button';

import paginationStyles from './pagination.styles';
import { PaginationProps } from './pagination.type';

const _Pagination = ({
  page,
  numberOfPages,
  onPageChange,
  numberOfItemsPerPageList = [10, 15, 20],
  numberOfItemsPerPage = 10,
  onItemsPerPageChange,
  showItemsPerPage = true,
  fromItem,
  toItem,
  totalItems,
  containerStyle
}: PaginationProps) => {
  const [visible, setVisible] = React.useState(false);
  const { colors } = useThemeColors();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selectPageSize = (size: number) => {
    onItemsPerPageChange?.(size);
    closeMenu();
  };

  const dynamicStyles = useMemo(() => {
    return {
      menuContent: {
        backgroundColor: colors.background
      }
    };
  }, [colors.background]);

  return (
    <View style={[paginationStyles.container, containerStyle]}>
      <View style={paginationStyles.contentContainer}>
        {showItemsPerPage && (
          <View style={paginationStyles.rowsPerPage}>
            <Text style={paginationStyles.rowsPerPageText}>Rows per page:</Text>
            <Menu
              style={dynamicStyles.menuContent}
              contentStyle={[paginationStyles.menuContent, dynamicStyles.menuContent]}
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Button.Transparent
                  onPress={openMenu}
                  mode='text'
                  icon='menu-down'>
                  {numberOfItemsPerPage}
                </Button.Transparent>
              }>
              {numberOfItemsPerPageList.map((item) => (
                <Menu.Item
                  style={{
                    backgroundColor:
                      item === numberOfItemsPerPage ? colors.primary100 : dynamicStyles.menuContent.backgroundColor
                  }}
                  key={item}
                  onPress={() => selectPageSize(item)}
                  title={item.toString()}
                />
              ))}
            </Menu>
          </View>
        )}

        <Text style={paginationStyles.label}>
          {fromItem + 1}-{toItem} of {totalItems}
        </Text>

        <View style={paginationStyles.actions}>
          <IconButton
            icon='chevron-left'
            disabled={page === 0}
            onPress={() => onPageChange(Math.max(0, page - 1))}
          />
          <IconButton
            icon='chevron-right'
            disabled={page >= numberOfPages - 1}
            onPress={() => onPageChange(Math.min(numberOfPages - 1, page + 1))}
          />
        </View>
      </View>
    </View>
  );
};

const Pagination = memo(_Pagination);

export default Pagination;
