import { createSlice } from '@reduxjs/toolkit';
import { AuthInitialState, SetAuthAction } from './types/authSlice.type';

const initialState: AuthInitialState = {
  id: 'authState',
  isAuth: false,
  user: null,
  tenantDetails: null
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Set the authentication state
     * @param {SetAuthAction} action - setAuth action
     * @param {boolean} action.payload.isAuth - is the user authenticated
     * @param {User | null} action.payload.user - the user object if authenticated
     */
    setAuth: (state, action: SetAuthAction) => {
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.user;
    }
  }
});

export const { setAuth } = auth.actions;
export default auth.reducer;
