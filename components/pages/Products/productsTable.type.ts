import { GetAllProductsPayload } from '../../../apis/types/product.type';
import { Product } from '../../../features/types/product.type';

export type ProductsTableProps = {
  products: Product[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (filters: Partial<GetAllProductsPayload>) => void;
  filters: Partial<GetAllProductsPayload>;
};

export type ProductHeaderProps = {
  isNewlyAddedProduct: boolean;
  hideHelperText: boolean;
  hasAppliedFilters: boolean;
  onChangeSearch: (filters: Partial<GetAllProductsPayload>) => void;
  onPressFilter: () => void;
  clearNewlyAddedProduct: () => void;
  clearFilters: () => void;
};
