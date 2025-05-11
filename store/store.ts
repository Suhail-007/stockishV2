import { useDispatch, useSelector } from 'react-redux';

import LogRocket from '@logrocket/react-native';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

//Reducers
import authReducer from '../features/auth';
import productReducer from '../features/product';

const combinedReducers = combineReducers({
  auth: authReducer,
  products: productReducer
});

// Create LogRocket Redux middleware
// @ts-ignore - The types for LogRocket are incomplete
const logRocketMiddleware = __DEV__ ? [] : [LogRocket.reduxMiddleware()];

const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST']
      }
    }).concat(logRocketMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
