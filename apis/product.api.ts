import { AxiosResponse } from 'axios';
import configuredInstance from '../axios/interceptor';
import { AddProductPayload, AddProductRes } from './types/product.type';

const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/product`;

const endpoints = {
  addProduct: BASE_URL
};

/**
 * Adds a new product to the system.
 *
 * @param {AddProductPayload} data - The new product data.
 *
 * @returns {Promise<AxiosResponse<AddProductRes>>} A promise that resolves to an axios response containing the newly created product.
 */
export const addProduct = async (data: AddProductPayload): Promise<AxiosResponse<AddProductRes>> => {
  const res: AxiosResponse<AddProductRes> = await configuredInstance.post(endpoints.addProduct, data);

  return res;
};
