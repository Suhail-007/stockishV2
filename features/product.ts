import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddActiveInActiveProducts, AddProductPayload, Product, ProductSliceInitialState } from './types/product.type';

const initialState: ProductSliceInitialState = {
  id: 'productsSlice',
  products: null,
  activeProduct: 0,
  inActiveProduct: 0
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Add a product to the list of products in the state.
     * If the list of products already exists, it will be updated by adding the new product to the end.
     * If the list of products does not exist, it will be created with the new product as the first element.
     * @param {AddProductPayload} action - The payload containing the product to be added.
     */
    addProduct: (state, action: AddProductPayload) => {
      console.log('🚀 ~ action:', action);
      if (state.products) {
        state.products = [...(state.products as Product[]), action.payload];

        state.activeProduct += 1;

        console.log('🚀 ~ addProduct ~ state.products:', state.products);
      } else {
        state.products = [action.payload];
        state.activeProduct += 1;
      }
    },

    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    addActiveInActiveProducts: (state, action: PayloadAction<AddActiveInActiveProducts>) => {
      state.activeProduct = action.payload.active;
      state.inActiveProduct = action.payload.inactive;
    }
  }
});

export const { addProduct, addActiveInActiveProducts, setProducts } = productsSlice.actions;
export default productsSlice.reducer;
