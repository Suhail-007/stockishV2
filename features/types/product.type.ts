import { PayloadAction } from '@reduxjs/toolkit';

import { PRODUCT_STATUS } from '../../enums/Product.enum';

import { BaseState } from './baseSlice.type';

export type ProductSliceInitialState = BaseState & {
  products: Product[] | ProductUser[] | null;
  activeProduct: number;
  inActiveProduct: number;
};

export type AddActiveInActiveProducts = Record<keyof typeof PRODUCT_STATUS, number>;

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

export type AddProductPayload = PayloadAction<Product>;
