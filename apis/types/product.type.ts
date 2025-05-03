import { ProductAddForm } from '../../components/pages/ProductForm/productForm.type';
import { Product, ProductUser } from '../../features/types/product.type';
import { Filters } from '../../utils/global.type';

import { API_BASE_RESPONSE, API_BASE_RESPONSE_WITH_PAGINATION, PAGINATION_PAYLOAD } from './apis.type';

export type AddProductPayload = ProductAddForm;

export type AddProductRes = API_BASE_RESPONSE<AddProductData>;

export type EditProductRes = API_BASE_RESPONSE<Product>;

export type AddProductData = Product | ProductUser;

export type GetAllProductsPayload = PAGINATION_PAYLOAD & Filters;

export type GetAllProductsRes = API_BASE_RESPONSE_WITH_PAGINATION<GetAllProductsData>;

export type GetAllProductsData = {
  products: Product[];
};

export type GetProductDetailsByIdRes = API_BASE_RESPONSE<Product>;

export type DeleteProductByIdRes = API_BASE_RESPONSE<string>;
