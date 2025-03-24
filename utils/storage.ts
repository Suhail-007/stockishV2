import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallbackWithResult } from '@react-native-async-storage/async-storage/lib/typescript/types';

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
 * Retrieve a token from SecureStore.
 *
 * @param key The key of the item to retrieve.
 * @param options An optional options object.
 * @returns The value of the item.
 */
export const getTokenAsync = async (
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
export const deleteTokenAsync = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
};
