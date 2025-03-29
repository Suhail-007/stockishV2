import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallbackWithResult } from '@react-native-async-storage/async-storage/lib/typescript/types';

/**
 * Stores a key-value pair in AsyncStorage.
 *
 * @param key The key under which the value is stored.
 * @param value The value to store.
 * @param callback An optional callback invoked with the result of the operation.
 */
export const setItemAsync = async (key: string, value: string, callback?: CallbackWithResult<string>) => {
  try {
    await AsyncStorage.setItem(key, value, callback);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Retrieve an item from AsyncStorage.
 *
 * @param key The key of the item to retrieve.
 * @param callback An optional callback invoked with the value of the item.
 * @returns The value of the item.
 */
export const getItemAsync = async (key: string, callback?: CallbackWithResult<string>) => {
  try {
    const value = await AsyncStorage.getItem(key, callback);
    return value;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Stores a key-value pair in SecureStore.
 *
 * @param key The key under which the value is stored.
 * @param value The value to store.
 * @param options An optional options object.
 */
export const setTokenSecureAsync = async (key: string, value: string, options?: SecureStore.SecureStoreOptions) => {
  try {
    await SecureStore.setItemAsync(key, value, options);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Retrieve a token from SecureStore.
 *
 * @param key The key of the item to retrieve.
 * @param options An optional options object.
 * @returns The value of the item.
 */
export const getTokenSecureAsync = async (
  key: string,
  options?: SecureStore.SecureStoreOptions
): Promise<string | null | undefined> => {
  try {
    const item = await SecureStore.getItemAsync(key, options);

    return item;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Deletes an item from SecureStore.
 *
 * @param key The key of the item to delete.
 */
export const deleteTokenSecureAsync = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
};
