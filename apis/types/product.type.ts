import { ProductAddForm } from '../../components/pages/AddProduct/addProduct.type';
import { Product, ProductUser } from '../../features/types/product.type';
import { Filters } from '../../utils/global.type';
import { API_BASE_RESPONSE, API_BASE_RESPONSE_WITH_PAGINATION, PAGINATION_PAYLOAD } from './apis.type';

export type AddProductPayload = ProductAddForm;

export type AddProductRes = API_BASE_RESPONSE<AddProductData>;

export type AddProductData = Product | ProductUser;

export type GetAllProductsPayload = PAGINATION_PAYLOAD & Partial<Filters>;

export type GetAllProductsRes = API_BASE_RESPONSE_WITH_PAGINATION<GetAllProductsData>;

export type GetAllProductsData = {
  products: Product[];
};
