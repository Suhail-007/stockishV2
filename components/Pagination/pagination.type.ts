import { StyleProp, ViewStyle } from 'react-native';

export interface PaginationProps {
  page: number;
  numberOfPages: number;
  onPageChange: (page: number) => void;
  numberOfItemsPerPageList?: number[];
  numberOfItemsPerPage?: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  showItemsPerPage?: boolean;
  fromItem: number;
  toItem: number;
  totalItems: number;
  containerStyle?: StyleProp<ViewStyle>;
}
