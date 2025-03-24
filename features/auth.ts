import { createSlice } from '@reduxjs/toolkit';
import { AuthInitialState } from './types/auth.type';

const initialState: AuthInitialState = {
  id: 'authState',
  isAuth: false,
  user: null,
  token: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setAuth } = auth.actions;
export default auth.reducer;
