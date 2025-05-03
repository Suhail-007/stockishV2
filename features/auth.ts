import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthInitialState, SetAuthAction, SetUserApiStateAction } from './types/authSlice.type';

const initialState: AuthInitialState = {
  id: 'authState',
  isAuth: false,
  user: null,
  tenantDetails: null,
  loading: true,
  errorMessage: null,
  isRefreshTokenRotating: false
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: SetAuthAction) => {
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.user;
    },
    setUserApiState: (state, action: SetUserApiStateAction) => {
      state.loading = action.payload.loading;
      state.errorMessage = action.payload.errorMessage;
    },

    /**
     * Toggles the flag indicating if the refresh token is currently rotating.
     *
     * This flag is used to prevent multiple requests to the server for a new access token when the current one expires.
     * @param {{ payload: boolean }} action - The action object containing the new value for the flag.
     */
    toggleRefreshTokenRotating: (state, action: PayloadAction<boolean>) => {
      state.isRefreshTokenRotating = action.payload;
    }
  }
});

export const { setAuth, toggleRefreshTokenRotating } = auth.actions;
export default auth.reducer;
