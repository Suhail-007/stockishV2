import { PRODUCT_STATUS } from '../../enums/Product.enum';

export type Product = {
  id: number;
  name: string;
  quantity: number;
  status: PRODUCT_STATUS;
  sellPrice: number;
  buyPrice: number;
  createdAt: string;
  updatedAt: string;
  tenantId: number;
};

export type ProductUser = Product & {
  userPrices: UserPrices[];
  price: number;
};

export type UserPrices = {
  price: number;
};
