import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthInitialState, SetAuthAction, SetUserApiStateAction } from './types/authSlice.type';
import { getUserDetails } from '../apis/user.api';
import { getItemStorageAsync } from '../utils/storage';
import { StorageKeys } from '../constants/variables';
import { USER_ROLE } from '../enums/User.enum';
import { GetUserPayload } from '../apis/types/userApi.type';
import { STATUS_CODES } from '../constants/statusCodes';

const initialState: AuthInitialState = {
  id: 'authState',
  isAuth: false,
  user: null,
  tenantDetails: null,
  loading: true,
  errorMessage: null
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
    console.error('Error fetching user details:', error);
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

export const { setAuth } = auth.actions;
export default auth.reducer;
