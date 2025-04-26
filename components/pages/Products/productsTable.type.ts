import { Product } from '../../../features/types/product.type';

export type ProductsTableProps = {
  products: Product[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
};
