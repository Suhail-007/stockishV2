import { AxiosResponse } from 'axios';
import configuredInstance from '../axios/interceptor';
import { AddProductPayload, AddProductRes, GetAllProductsPayload, GetAllProductsRes } from './types/product.type';
import { createFiltersQuery } from '../libs';

const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/product`;

const endpoints = {
  addProduct: BASE_URL,
  getAllProductsGlobal: (props: GetAllProductsPayload) => `${BASE_URL}/all?${createFiltersQuery(props)}`
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

/**
 * Retrieves all products in the system.
 * To Fetch all products in the system for tenant no need to pass the userId
 * To Fetch all products in the system for user need to pass the userId
 *
 * @param {GetAllProductsPayload} payload - The get all products payload.
 *
 * @returns {Promise<AxiosResponse<GetAllProductsRes>>} A promise that resolves to an axios response containing the products.
 */
export const getAllProductsGlobal = async (
  payload: GetAllProductsPayload
): Promise<AxiosResponse<GetAllProductsRes>> => {
  const res: AxiosResponse<GetAllProductsRes> = await configuredInstance.get(endpoints.getAllProductsGlobal(payload));

  return res;
};
