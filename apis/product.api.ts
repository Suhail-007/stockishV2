import { AxiosResponse } from 'axios';

import configuredInstance from '../axios/interceptor';
import { createFiltersQuery } from '../libs';

import {
  AddProductPayload,
  AddProductRes,
  DeleteProductByIdRes,
  EditProductRes,
  GetAllProductsPayload,
  GetAllProductsRes,
  GetProductDetailsByIdRes
} from './types/product.type';

const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/product`;

const endpoints = {
  addProduct: BASE_URL,
  getProductDetailsById: (id: string, isActive: boolean) => `${BASE_URL}/${id}?isActive=${isActive}`,
  getAllProductsGlobal: (props: GetAllProductsPayload) => `${BASE_URL}/all?${createFiltersQuery(props)}`,
  deleteProductById: (ids: string[]) => `${BASE_URL}?productIds=${ids.toString()}`,
  editProductDetails: (id: string) => `${BASE_URL}/${id}`
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
 * Edits an existing product in the system.
 *
 * @param {Partial<AddProductPayload> & {id:string}} data - The edited product data.
 *
 * @returns {Promise<AxiosResponse<EditProductRes>>} A promise that resolves to an axios response containing the edited product.
 */
export const editProductDetails = async (
  data: Partial<AddProductPayload> & { id: string }
): Promise<AxiosResponse<EditProductRes>> => {
  const res: AxiosResponse<EditProductRes> = await configuredInstance.patch(
    endpoints.editProductDetails(data.id),
    data
  );

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

/**
 * Retrieves the details of a product by its ID.
 *
 * @param {string} id - The ID of the product to retrieve details for.
 * @returns {Promise<AxiosResponse<GetProductDetailsByIdRes>>} A promise that resolves to an axios response containing the product details.
 */
export const getProductDetailsById = async (
  id: string,
  isActive: boolean
): Promise<AxiosResponse<GetProductDetailsByIdRes>> => {
  const res: AxiosResponse<GetProductDetailsByIdRes> = await configuredInstance.get(
    endpoints.getProductDetailsById(id, isActive)
  );
  return res;
};

/**
 * Deletes multiple products by their IDs.
 *
 * @param {string[]} ids - The IDs of the products to delete.
 *
 * @returns {Promise<AxiosResponse<GetProductDetailsByIdRes>>} A promise that resolves to an axios response containing the deleted products.
 */
export const deleteProductsById = async (ids: string[]): Promise<AxiosResponse<DeleteProductByIdRes>> => {
  const res: AxiosResponse<DeleteProductByIdRes> = await configuredInstance.delete(endpoints.deleteProductById(ids));
  return res;
};
