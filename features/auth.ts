import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { GetUserPayload } from '../apis/types/userApi.type';
import { getUserDetails } from '../apis/user.api';
import { STATUS_CODES } from '../constants/statusCodes';
import { StorageKeys } from '../constants/variables';
import { USER_ROLE } from '../enums/User.enum';
import { getItemStorageAsync } from '../utils/storage';

import { AuthInitialState, SetAuthAction, SetUserApiStateAction } from './types/authSlice.type';
import { BaseAction } from './types/baseSlice.type';

const initialState: AuthInitialState = {
  id: 'authState',
  isAuth: false,
  user: null,
  tenantDetails: null,
  loading: true,
  errorMessage: null,
  isRefreshTokenRotating: false
};

// Thunk to fetch user details
export const fetchUserDetails = createAsyncThunk('auth/fetchUserDetails', async (_, { rejectWithValue }) => {
  try {
    const userInfoString = await getItemStorageAsync(StorageKeys.USER_INFO);

    if (!userInfoString) {
      return rejectWithValue('User info not found in storage');
    }

    const userInfoData = JSON.parse(userInfoString) as {
      userId: string;
      userRole: USER_ROLE;
      tenantId: string;
    };

    const getUserDetailsPayload: GetUserPayload = {
      userId: +userInfoData.userId,
      isActive: true,
      userRole: userInfoData.userRole
    };

    const { data } = await getUserDetails(getUserDetailsPayload);

    if (data.status === STATUS_CODES.success) {
      return data.data;
    } else {
      return rejectWithValue('Failed to fetch user details');
    }
  } catch (error) {
    console.log('Error fetching user details:', error);
    return rejectWithValue('An error occurred while fetching user details');
  }
});

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
    toggleRefreshTokenRotating: (state, action: BaseAction<boolean>) => {
      state.isRefreshTokenRotating = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
        state.errorMessage = action.payload as string;
      });
  }
});

export const { setAuth, toggleRefreshTokenRotating } = auth.actions;
export default auth.reducer;
