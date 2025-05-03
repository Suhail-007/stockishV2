import { useEffect, useCallback, useReducer } from 'react';
import { Platform } from 'react-native';

import * as SecureStore from 'expo-secure-store';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

/**
 * A React hook that returns an async state value. The state value is of type `[boolean, T | null]`, where the first element is a boolean indicating whether the value is loading, and the second element is the actual value.
 *
 * It is similar to `useState`, but the initial value is always `[true, null]`, and the state value is always `[false, T | null]` when the value is not loading.
 *
 * It is used to handle the case where the state value is initially unknown, and will be set in the future.
 *
 * @param initialValue The initial state value.
 * @returns An array with two elements, where the first element is a function to update the state, and the second element is the state value.
 */
function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

/**
 * Stores or removes a key-value pair in the storage based on the platform.
 *
 * On web platforms, it uses `localStorage` to store or remove the value associated with the given key.
 * On other platforms, it uses `SecureStore` to handle the storage operations.
 *
 * @param key The key under which the value is stored.
 * @param value The value to store. If null, the key is removed from the storage.
 */

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

/**
 * A React hook that manages a string state value with persistence in storage.
 *
 * This hook synchronizes the state with storage, using `localStorage` on web
 * platforms and `SecureStore` on other platforms.
 *
 * @param key The key under which the state value is stored in the storage.
 * @returns A tuple: the first element is the current state value and the second is a function to update the state.
 */

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value);
      });
    }
  }, [key, setState]);

  // Set
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key, setState]
  );

  return [state, setValue];
}
