import { Product } from '../../../features/types/product.type';

export type ProductDetailsModalProps = {
  toggleShowProductDetailsModal: (modalState: boolean) => void;
  showModal: boolean;
  product: Product | null;
};
