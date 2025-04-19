import { useDispatch, useSelector } from 'react-redux';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

//Reducers
import authReducer from '../features/auth';

const combinedReducers = combineReducers({
  auth: authReducer
});

const store = configureStore({
  reducer: combinedReducers
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
