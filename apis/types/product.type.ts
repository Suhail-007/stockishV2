import { ProductAddForm } from '../../components/pages/AddProduct/addProduct.type';
import { PRODUCT_STATUS } from '../../enums/Product.enum';
import { BASE_RESPONSE } from './apis.type';

export type AddProductPayload = ProductAddForm;

export type AddProductRes = BASE_RESPONSE<AddProductData>;

export type AddProductData = {
  id: number;
  itemName: number;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  status: PRODUCT_STATUS;
  tenantId: number;
  updatedAt: string;
  createdAt: string;
};
