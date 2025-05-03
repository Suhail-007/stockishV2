import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AddActiveInActiveProducts,
  AddProductPayload,
  EditProductPayload,
  ProductSliceInitialState
} from './types/product.type';

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
    addProducts: (state, action: AddProductPayload) => {
      state.products = action.payload;
    },

    updateProducts: (state, action: EditProductPayload) => {
      //every time we add a product we increment active product
      state.activeProduct += 1;

      if (state.products && state.products?.length > 0) {
        //when adding new product only one product will be added
        state.products = [...state.products, action.payload];
      } else {
        state.products = [action.payload];
      }
    },

    editProducts: (state, action: EditProductPayload) => {
      //NOTE - No of active product stays the same
      if (state.products) {
        const updatedProducts = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
        state.products = updatedProducts;
      } else {
        //else is not possible because we are editing the product
        state.products = [action.payload];
      }
    },

    // incrementActiveProduct: (state, action: PayloadAction<Product>) => {
    //   state.activeProduct += 1;

    //   if (state.products && state.products?.length > 0) {
    //     state.products = [...(state.products || []), action.payload];
    //   } else {
    //     state.products = [action.payload];
    //   }
    // },

    addActiveInActiveProducts: (state, action: PayloadAction<AddActiveInActiveProducts>) => {
      state.activeProduct = action.payload.active;
      state.inActiveProduct = action.payload.inactive;
    }
  }
});

export const { addProducts, addActiveInActiveProducts, editProducts, updateProducts } = productsSlice.actions;
export default productsSlice.reducer;
